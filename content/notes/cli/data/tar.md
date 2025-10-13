---
title: tar
keywords:
    - archive
    - compress
    - decompress
    - extract
    - unarchive
    - untar
---

## tar

### Usage

```sh
tar [OPERATION_MODE] -f [ARCHIVE_NAME] [option ...] [FILE ...]
```

* `OPERATION_MODE`:
    * `-c`: Create archive
    * `-d`: Delete files from archive
    * `-r`: Append files to archive
    * `-t`: List files in archive
    * `-x`: Extract files from archive
* `ARCHIVE_NAME`: Name of archive
* `FILE ...`: One or more files to add to/delete from/extract from/list in archive

### Options

* `-C`: Directory to add files from/extract files to
* `-j`: Use bzip2 compression
* `-J`: Use xz compression
* `-z`: Use gzip compression
* `--exclude [PATTERN]`: Exclude file names matching pattern

### Examples

1. Create gzip compressed archive containing files a, b, and c:

   ```sh
   tar -czf files.tar.gz a b c
   ```

1. Add file x to uncompressed archive:

   ```sh
   tar -rf files.tar x
   ```

1. List contents of bzip2 compressed archive:

   ```sh
   tar -tjf files.tar.bzip2
   ```

1. Extract files a, b, and d from xz compressed archive to data directory:

   ```sh
   tar -xJf files.tar.xz -C data a b c
   ```

