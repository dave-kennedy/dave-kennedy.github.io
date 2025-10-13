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

```sh
unzip [option ...] [ARCHIVE_NAME] [FILE ...]
```

* `ARCHIVE_NAME`: Name of archive
* `FILE ...`: One or more files to extract from/list in archive

### Options

* `-d`: Directory to extract files to
* `-l`: List files in archive instead of extracting them
* `-x [PATTERN]`: Exclude file names matching pattern

### Examples

1. List contents of archive:

   ```sh
   unzip -l files.zip
   ```

1. Extract files a, b, and c from archive to data directory:

   ```sh
   unzip files.zip -d data a b c
   ```

