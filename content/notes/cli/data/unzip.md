---
title: unzip
keywords:
    - archive
    - compress
    - decompress
    - extract
    - unarchive
    - zip
---

## unzip

### Usage

```shell
unzip [optional_params] [ARCHIVE_NAME] [FILE_NAMES]
```

* `ARCHIVE_NAME`: Name of archive
* `FILE_NAMES`: One or more files to extract from/list in archive

### Options

* `-d`: Directory to extract files to
* `-l`: List files in archive instead of extracting them
* `-x PATTERN`: Exclude file names matching pattern

### Examples

List contents of archive:

```shell
unzip -l files.zip
```

Extract files a, b, and c from archive to data directory:

```shell
unzip files.zip -d data a b c
```

