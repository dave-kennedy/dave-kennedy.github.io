---
title: zip
keywords:
    - archive
    - compress
    - decompress
    - extract
    - unarchive
    - unzip
---

## zip

### Usage

```shell
zip [optional_params] [ARCHIVE_NAME] [FILE_NAMES]
```

* `ARCHIVE_NAME`: Name of archive
* `FILE_NAMES`: One or more files to add to/delete from archive

### Options

* `-d`: Delete files from archive
* `-g`: Append files to archive (grow)
* `-i PATTERN`: Include file names matching pattern
* `-r`: Include directories recursively
* `-x PATTERN`: Exclude file names matching pattern

### Examples

Create archive containing files a, b, and c:

```shell
zip files.zip a b c
```

Create archive containing all files in repo directory except those in .git directory:

```shell
zip -r files.zip repo -x 'repo/.git/*'
```

