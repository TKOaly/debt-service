# debt-service

## Automatic restart

For automatic restart after reboot, configure systemctl.

1. Clone the repo to a directory
2. Create a system user to run the server as
    - `$ adduser -r -s /bin/false USERNAME`
    - `-r` makes a system user without a home dir and locks the user
    - `-s /bin/false` sets the shell of the user to /bin/false so nobody can log in as the user
3. chown the repos contents to the user:
    - `$ chown -R USERNAME:USERNAME ./debt-service`
    - this step is important as express-react-views uses `@babel/register` which caches the compiled templates into `node_modules/.cache/@babel/register/<something>.json`, so if the directory is not owned by the user running the server, this will explode the server
4. Add following systemd unit file as, for example, /lib/systemd/system/velat.service :
   - ```
     [Unit]
     Description=velat-palvelu
 
     [Service]
     ExecStart=/usr/bin/node /srv/debt-service/src/server.js
     Restart=always
     User=USERNAME
     Group=USERNAME
     Environment=PATH=/usr/bin:/usr/local/bin
     Environment=NODE_ENV=production
     WorkingDirectory=/srv/debt-service/
 
     [Install]
     WantedBy=multi-user.target
     ```
   - replace USERNAME with the correct user name
5. Run `$ systemctl daemon-reload`
   - This makes systemd notice the new unit file
6. Run `$ systemctl enable velat && systemctl start velat`
7. ???
8. Profit on port 4201

## Upgrading

Pull the repo as the user you previously created, or make sure you `chown` the updated files and node_modules afterwards.
