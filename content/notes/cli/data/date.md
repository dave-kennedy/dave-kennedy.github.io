---
title: date
keywords:
    - time
---

## date

### Usage

```sh
date [options]
```

### Options

* `-I[FORMAT]`: Output date/time in ISO 8601 format (e.g. YYYY-MM-DDThh:mm:ss±hhmm) where `FORMAT` is one of:
    * `d`: date only (default)
    * `h`: date and hours
    * `m`: date, hours, and minutes
    * `s`: date, hours, minutes, and seconds
    * `ns`: date, hours, minutes, seconds, and nanoseconds
* `-u`, `--utc`, `--univeral`: Use Coordinated Universal Time (UTC) instead of local time zone
* `+[FORMAT]`: Output date/time in format, where `FORMAT` is any combination of:
    * `%%`: a literal %
    * `%a`: locale's abbreviated weekday name (e.g. Sun)
    * `%A`: locale's full weekday name (e.g. Sunday)
    * `%b`: locale's abbreviated month name (e.g. Jan)
    * `%B`: locale's full month name (e.g. January)
    * `%c`: locale's date and time (e.g. Thu Mar  3 23:05:25 2005)
    * `%C`: century; like `%Y`, except omit last two digits (e.g. 20)
    * `%d`: day of month (e.g. 01)
    * `%D`: date; same as `%m/%d/%y`
    * `%e`: day of month, space padded; same as `%_d`
    * `%F`: full date; like `%+4Y-%m-%d`
    * `%g`: last two digits of year of ISO week number (see `%G`)
    * `%G`: year of ISO week number (see `%V`); normally useful only with `%V`
    * `%h`: same as `%b`
    * `%H`: hour (00..23)
    * `%I`: hour (01..12)
    * `%j`: day of year (001..366)
    * `%k`: hour, space padded ( 0..23); same as `%_H`
    * `%l`: hour, space padded ( 1..12); same as `%_I`
    * `%m`: month (01..12)
    * `%M`: minute (00..59)
    * `%n`: a newline
    * `%N`: nanoseconds (000000000..999999999)
    * `%p`: locale's equivalent of either AM or PM; blank if not known
    * `%P`: like `%p`, but lower case
    * `%q`: quarter of year (1..4)
    * `%r`: locale's 12-hour clock time (e.g. 11:11:04 PM)
    * `%R`: 24-hour hour and minute; same as `%H:%M`
    * `%s`: seconds since the Epoch (1970-01-01 00:00 UTC)
    * `%S`: second (00..60)
    * `%t`: a tab
    * `%T`: time; same as `%H:%M:%S`
    * `%u`: day of week (1..7); 1 is Monday
    * `%U`: week number of year, with Sunday as first day of week (00..53)
    * `%V`: ISO week number, with Monday as first day of week (01..53)
    * `%w`: day of week (0..6); 0 is Sunday
    * `%W`: week number of year, with Monday as first day of week (00..53)
    * `%x`: locale's date representation (e.g. 12/31/99)
    * `%X`: locale's time representation (e.g. 23:13:48)
    * `%y`: last two digits of year (00..99)
    * `%Y`: year
    * `%z`: ±hhmm numeric time zone (e.g. -0400)
    * `%:z`: ±hh:mm numeric time zone (e.g. -04:00)
    * `%::z`: ±hh:mm:ss numeric time zone (e.g. -04:00:00)
    * `%:::z`: numeric time zone with : to necessary precision (e.g. -04, +05:30)
    * `%Z`: alphabetic time zone abbreviation (e.g. EDT)

### Examples

1. Print current date/time in default format:

   ```sh
   date  # Mon Nov 10 10:30:00 AM MST 2025
   ```

1. Print current date/time in ISO 8601 format:

   ```sh
   date -Is  # 2025-11-10T10:30:00-07:00
   ```

1. Print current date/time in UTC time zone in ISO 8601 format:

   ```sh
   date -Is -u  # 2025-11-10T17:30:00+00:00
   ```

1. Print current date/time in US Pacific time zone in ISO 8601 format
   (Use `tzselect` to lookup value):

   ```sh
   TZ=America/Los_Angeles date -Is  # 2025-11-10T09:30:00-08:00
   ```

1. Print current date/time in ISO 8601 format; omit time zone from output:

   ```sh
   date +%FT%T  # 2025-11-10T10:30:00
   ```

1. Print current date/time in ISO 8601 format; omit time zone, dashes, and colons from output:

   ```sh
   date +%Y%m%dT%H%M%S  # 20251110T103000
   ```

1. Convert date/time to local time zone:

   ```sh
   date -d '2025-11-10T17:30:00Z'  # Mon Nov 10 10:30:00 AM MST 2025
   ```

1. Convert date/time to US Pacific time zone
   (Use `tzselect` to lookup value):

   ```sh
   TZ=America/Los_Angeles date -d '2025-11-10 10:30:00 MST'  # Mon Nov 10 09:30:00 AM PST 2025
   ```

1. Print date/time 100 days from now:

   ```sh
   date -d '+100 days'  # Wed Feb 18 10:30:00 AM MST 2026
   ```

1. Print current Unix Epoch time (seconds since 1970-01-01 00:00:00 UTC):

   ```sh
   date +%s  # 1762795800
   ```

1. Convert Unix Epoch time to date/time in local time zone:

   ```sh
   date -d @1762795800  # Mon Nov 10 10:30:00 AM MST 2025
   ```

1. Convert date/time to Unix Epoch time:

   ```sh
   date -d '2025-11-10 10:30:00 MST' +%s  # 1762795800
   ```

