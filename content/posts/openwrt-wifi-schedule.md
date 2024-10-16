---
title: OpenWrt Wi-Fi Schedule
date: 2023-03-06T19:58:05-0700
description: Automatically toggle wi-fi to certain devices at specified times.
tags:
    - Computering
    - Networking
    - OpenWrt
---

If I let them, my kids will stay up all night watching YouTube or TikTok or whatever. We have a no-devices-in-room policy, but disabling the wi-fi gives me a little more peace of mind.

Of course, I don't want to disable the wi-fi to *all* the devices in the house at bedtime. So I wrote this script:

```
#!/usr/bin/env sh

if [ -z "$1" ]; then
    logger -st 'wifi-schedule' 'Missing argument'
    exit 1
fi

if [ "$1" != 'up' -a "$1" != 'down' ]; then
    logger -st 'wifi-schedule' "Invalid argument: $1"
    exit 1
fi

logger -st 'wifi-schedule' "Toggling wifi schedule $1"

add_mac() {
    if ! echo "$1" | grep -Eiq '^([a-f0-9]{2}:){5}[a-f0-9]{2}$'; then
        logger -st 'wifi-schedule' "Invalid MAC address: $1"
        return 1
    fi

    logger -st 'wifi-schedule' "Adding MAC address: $1"
    uci add_list wireless.@wifi-iface[0].maclist="$1"
    uci add_list wireless.@wifi-iface[1].maclist="$1"
}

# Remove all MAC addresses
sed -i '/list maclist/d' /etc/config/wireless

# Add unscheduled MAC addresses
add_mac 'a1:b2:c3:d4:e5:f6' # Laptop
add_mac 'aa:bb:cc:dd:ee:ff' # Phone

# Add scheduled MAC addresses if argument is "up"
if [ "$1" = 'up' ]; then
    add_mac '11:22:33:44:55:66' # Kids tablet
    add_mac '1a:2b:3c:4d:5e:6f' # Nintendo Switch
fi

uci commit wireless
wifi reload
```

Replace the MAC addresses and save the script at `/root/wifi-schedule.sh`. Then add this to `/etc/crontabs/root`:

```
00 06 * * * /root/wifi-schedule.sh up
00 22 * * * /root/wifi-schedule.sh down
```

Adjust the on/off time as desired. Your kids will hate it.

Just remember to cancel their data plan.

