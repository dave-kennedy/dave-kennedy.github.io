---
title: Best Practices for Python Unit Testing
date: 2022-05-23T09:25:27-0600
description: A few simple tips to make unit testing Python code easier.
tags:
    - Programming
    - Python
    - Unit Testing
---

First of all, let's distinguish unit testing from integration testing:

* A unit test verifies a unit of code in isolation.
* An integration test verifies several units of code in conjunction.

Crucially, unit tests should not make network requests, modify database tables, or alter files on disk unless there's an obvious reason for doing so. Unit tests use mocked or stubbed dependencies, optionally verifying that they are called correctly, and make assertions on the results of a single function or module. Integration tests, on the other hand, use concrete dependencies and make assertions on the results of a larger system.

You might disagree on the finer points, but this distinction works well for me.

I won't go over unit testing basics, like how to run pytest or how to use the `@patch` decorator, assuming you're familiar already.

## Avoid module-level globals

Imagine we have a class defined in validator.py:

```
import os

import fastjsonschema
import requests

schema_url = os.environ['SCHEMA_URL']

class Validator:
    def __init__(self):
        schema = requests.get(schema_url).json()
        self.validator = fastjsonschema.compile(schema)

    def validate(self, event: dict) -> dict:
        return self.validator(event)
```

And we have a module named my_lambda.py that uses the class:

```
from validator import Validator

validator = Validator()

def handle_event(event: dict, context: object) -> dict:
    validator.validate(event)
    return {'body': 'Goodbye!', 'status': 200}
```

And we want to test the module:

```
from unittest.mock import Mock, patch

from my_lambda import handle_event

@patch('my_lambda.Validator', autospec=True)
def test_handle_event(mock_validator: Mock):
    result = handle_event({'message': 'Hello!'}, None)
    assert result == {'body': 'Goodbye!', 'status': 200}
```

We're patching the `Validator` class and not the `validator` property because the former will allow us to prevent the network request when `Validator()` is called, whereas the latter would only allow us to act afterwards.

As it's written, this test will fail during collection when my_lambda.py is imported, before the patch is even applied:

```
test_my_lambda.py:3: in <module>
    from my_lambda import handle_event
my_lambda.py:1: in <module>
    from validator import Validator
validator.py:6: in <module>
    schema_url = os.environ['SCHEMA_URL']
/usr/local/Cellar/python@3.9/3.9.12/Frameworks/Python.framework/Versions/3.9/lib/python3.9/os.py:679: in __getitem__
    raise KeyError(key) from None
E   KeyError: 'SCHEMA_URL'
```

We could set `SCHEMA_URL` in our .env file, but that's an extra step that would be required for every developer to run the test. Instead, let's try setting it right before the import:

```
import os

from unittest.mock import Mock, patch

os.environ['SCHEMA_URL'] = 'foo'

from my_lambda import handle_event
```

This will also fail during collection:

```
test_my_lambda.py:7: in <module>
    from my_lambda import handle_event
my_lambda.py:3: in <module>
    validator = Validator()
validator.py:10: in __init__
    schema = requests.get(schema_url).json()
...
E   requests.exceptions.MissingSchema: Invalid URL 'foo': No scheme supplied. Perhaps you meant http://foo?
```

Even though we're patching the `Validator` class, it's still trying to make a network request because `Validator()` is called when my_lambda.py is imported, before the patch is even applied. If I sound like a broken record, it's because this can be confusing:

> Module-level globals are assigned when the module is imported, which makes them difficult to patch.

The correct way to fix this problem is to eliminate the global from my_lambda.py:

```
from validator import Validator

def handle_event(event: dict, context: object):
    validator = Validator()
    validator.validate(event)
```

Now the test passes, but it's kind of ugly. Let's remove another global, this time from validator.py:

```
import os

import fastjsonschema
import requests

class Validator:
    def __init__(self):
        schema_url = os.environ['SCHEMA_URL']
        schema = requests.get(schema_url).json()
        self.validator = fastjsonschema.compile(schema)

    def validate(self, event: dict) -> dict:
        return self.validator(event)
```

This allows us to simplify the test, restoring it to its original form:

```
from unittest.mock import Mock, patch

from my_lambda import handle_event

@patch('my_lambda.Validator', autospec=True)
def test_handle_event(mock_validator: Mock):
    result = handle_event({'message': 'Hello!'}, None)
    assert result == {'body': 'Goodbye!', 'status': 200}
```

### Globals aren't always bad

If you must use a global for some reason, set it to `None` initially:

```
from typing import Optional

from validator import Validator

validator: Optional[Validator] = None

def handle_event(event: dict, context: object):
    global validator

    if not validator:
        validator = Validator()

    validator.validate(event)
```

The key is to prevent any expensive computation or network requests when the module is imported to facilitate patching.

## Use dependency injection

Next, let's test the class:

```
from validator import Validator

def test_validator_init():
    result = Validator()
    assert result.validator is not None
```

This test will fail unless `SCHEMA_URL` is defined in the environment. As previously mentioned, we could add it to our .env file, or we could set it directly like we did before with `os.environ['SCHEMA_URL'] = 'foo'`. It's better to use the `@patch.dict` decorator because it will restore the original value after the test exits:

```
import os

from unittest.mock import patch

from validator import Validator

@patch.dict(os.environ, {'SCHEMA_URL': 'foo'})
def test_validator_init():
    result = Validator()
    assert result.validator is not None
```

Either way, this test will fail because it's trying to make a network request to an invalid URL:

```
validator.py:9: in __init__
    schema = requests.get(schema_url).json()
...
E   requests.exceptions.MissingSchema: Invalid URL 'foo': No scheme supplied. Perhaps you meant http://foo?
```

Again, we want to prevent the network request. This is where dependency injection, also known as inversion of control, comes in handy. Let's refactor validator.py to accept a few arguments:

```
import os

from typing import Callable, Optional

import fastjsonschema
import requests

class Validator:
    def __init__(
        self,
        validator: Optional[Callable[[dict], dict]] = None,
        schema: Optional[dict] = None,
        schema_url: Optional[str] = None,
    ):
        if validator:
            self.validator = validator
            return

        if schema:
            self.validator = fastjsonschema.compile(schema)
            return

        if not schema_url:
            schema_url = os.environ['SCHEMA_URL']

        schema = requests.get(schema_url).json()
        self.validator = fastjsonschema.compile(schema)

    def validate(self, event: dict) -> dict:
        return self.validator(event)
```

It's worth a moment to understand what's happening here when `Validator()` is called:

1. If called with a `validator` argument, that argument is assigned to `self.validator`. Any other arguments are ignored.
2. If called with a `schema` argument, that argument is used to create `self.validator`.
3. If called with a `schema_url` argument, the schema is requested from the URL, the response is parsed and used to create `self.validator`.
4. If called without any arguments, the schema is requested from the URL specified in the environment.

This allows us to easily prevent the network request when running the unit test:

```
import os

from unittest.mock import Mock, patch

from validator import Validator

def test_validator_init_with_validator():
    mock_validator = Mock()

    result = Validator(validator=mock_validator)
    assert result.validator == mock_validator
```

The downside is we need to cover the additional complexity in the constructor. Fortunately, it can be accomplished with some straightforward patching:

```
@patch('fastjsonschema.compile', autospec=True)
def test_validator_init_with_schema(mock_compile):
    mock_validator = Mock()
    mock_compile.return_value = mock_validator

    result = Validator(schema={'type': 'string'})
    assert result.validator == mock_validator

@patch('fastjsonschema.compile', autospec=True)
@patch('requests.get', autospec=True)
def test_validator_init_with_schema_url(mock_get, mock_compile):
    mock_schema = Mock()
    mock_get.return_value.json.return_value = mock_schema

    mock_validator = Mock()
    mock_compile.return_value = mock_validator

    result = Validator(schema_url='foo')
    assert result.validator == mock_validator

    mock_get.assert_called_once_with('foo')

@patch('fastjsonschema.compile', autospec=True)
@patch('requests.get', autospec=True)
@patch.dict(os.environ, {'SCHEMA_URL': 'bar'})
def test_validator_init_with_no_args(mock_get, mock_compile):
    mock_schema = Mock()
    mock_get.return_value.json.return_value = mock_schema

    mock_validator = Mock()
    mock_compile.return_value = mock_validator

    result = Validator()
    assert result.validator == mock_validator

    mock_get.assert_called_once_with('bar')

def test_validator_validate():
    mock_validator = Mock()
    mock_validator.return_value = 42

    validator = Validator(mock_validator)

    result = validator.validate({})
    assert result == 42
```

This last unit test is dirt simple because we don't really care how fastjsonschema is implemented. It has its own unit tests.

---

This article was cross-posted on [Dice.com](https://insights.dice.com/2022/05/23/python-unit-testing-best-practices-to-follow/).

