# debt-service

## Introduction

This repository contains source code for the TKO-äly Debt service that runs on https://velat.tko-aly.fi.

## Environment variables

```
PORT=5000
DB_FILE=""
USER_SERVICE_URL=https://users.tko-aly.fi
SERVICE_ID=""
```

## Systemd

For automatic restart after reboot and when using systemctl, add following unit file as, for example, `/lib/systemd/system/velat.service` :

```[Unit]
Description=velat-palvelu

[Service]
ExecStart=/srv/debt-service/src/server.js
Restart=always
User=nobody
# Note Debian/Ubuntu uses 'nogroup', RHEL/Fedora uses 'nobody'
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/srv/debt-service/

[Install]
WantedBy=multi-user.target
```

Then, run `systemctl enable velat` and `systemctl start velat`.
