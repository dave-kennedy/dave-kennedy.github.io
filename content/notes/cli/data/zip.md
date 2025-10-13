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

```sh
zip [option ...] [ARCHIVE_NAME] [FILE ...]
```

* `ARCHIVE_NAME`: Name of archive
* `FILE ...`: One or more files to add to/delete from archive

### Options

* `-d`: Delete files from archive
* `-g`: Append files to archive (grow)
* `-i [PATTERN]`: Include file names matching pattern
* `-r`: Include directories recursively
* `-x [PATTERN]`: Exclude file names matching pattern

### Examples

1. Create archive containing files a, b, and c:

   ```sh
   zip files.zip a b c
   ```

1. Create archive containing all files in repo directory except those in .git directory:

   ```sh
   zip -r files.zip repo -x 'repo/.git/*'
   ```

