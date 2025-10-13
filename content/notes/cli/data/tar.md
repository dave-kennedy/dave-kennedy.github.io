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

```shell
tar [OPERATION_MODE] -f [ARCHIVE_NAME] [options] [FILE_NAMES]
```

* `OPERATION_MODE`:
    * `-c`: Create archive
    * `-d`: Delete files from archive
    * `-r`: Append files to archive
    * `-t`: List files in archive
    * `-x`: Extract files from archive
* `ARCHIVE_NAME`: Name of archive
* `FILE_NAMES`: One or more files to add to/delete from/extract from/list in archive

### Options

#### Compression

* `-j`: Use bzip2 compression
* `-J`: Use xz compression
* `-z`: Use gzip compression

### Examples

Create gzip compressed archive containing files a, b, and c:

```shell
tar -czf files.tar.gz a b c
```

Add file x to uncompressed archive:

```shell
tar -rf files.tar x
```

List contents of bzip2 compressed archive:

```shell
tar -tjf files.tar.bzip2
```

Extract files a, b, and d from xz compressed archive to data directory:

```shell
tar -xJf files.tar.xz -C data a b c
```

