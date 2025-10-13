---
title: curl
keywords:
    - download
    - fetch
    - http
    - https
    - network
    - request
    - send
---

## curl

### Usage

```sh
curl [option ...] [URL]
```

### Options

* `-d [DATA]`: Add data to request body
    * This option implies `-X POST` and `-H "Content-Type: application/x-www-form-urlencoded"`
* `-H [HEADER]`: Add header to request
* `-i`: Show response headers
* `-L`: Follow redirects
* `-o [FILE]`: Save output to file
* `-O`: Save output to file, use remote file name
* `-s`: Hide progress meter and errors
* `-S`: With `-s`, hide progress meter but show errors
* `-v`: Show request and response headers
* `-X [METHOD]`: Set request method

### Examples

1. Download file, follow redirects, hide progress meter, show errors:

   ```sh
   curl -LOsS 'https://example.com/hello.txt'
   ```

1. Send HTTP POST request with HTML form data:

   ```sh
   curl -d 'name=James%20Kirk&age=32' 'https://example.com/register'
   ```

1. Send HTTP PUT request with JSON data:

   ```sh
   curl -d '{"name": "James Kirk", "age": 32}' \
       -H 'Content-Type: application/json' \
       -X PUT \
       'https://example.com/users/123'
   ```

