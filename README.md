# DOSOCS2-UI
Web interface for DoSOCSv2

[![Build Status](https://travis-ci.org/UShan89/dosocs2-ui.svg?branch=master)](https://travis-ci.org/UShan89/dosocs2-ui)


## First and Foremost: You're smart. So please read this carefully

  * If DOSOCS2-UI is in development mode i.e. `meteor run` or `meteor` is being used and the server is just localhost:3000, then all is well.

  * When moving to production, it is imperative that the operations below are performed

    * `meteor remove msavin:mongol`
    * `meteor --production` or `meteor --run production` be used to set the production flags. See more in `nginx configuration` below
    * `msavin:mongol` + `development mode meteor for production` === disasterwaiting to happen. Client can own the database with ease.
    * `Smart developers` would explore the collections directory and set collection-hooks `matb33:collection-hooks`.
    * NoSQL databases have    [`nosqlinjection`](https://www.owasp.org/index.php/Testing_for_NoSQL_injection)
    * To ensure client does not have direct access to database and rather just minimongo (per user client side storage), please make collection changes in the collection directory only.

## Configuring development environment

  1. Install and configure `dosocs2`
    * Step-by-step instructions are available at https://github.com/DoSOCSv2/DoSOCSv2.git
    * Perform database initialization with `dosocs2 dbinit` from console

  2. Install meteor `curl https://install.meteor.com/ | sh` on OS X or Linux
    * DoSOCS-UI will run on `windows` but `dosocs2` does not run natively on `windows` unless a Linux container is used.

  3. Clone this project
    * `git clone https://github.com/UShan89/DOSOCS2-UI.git`
    * `cd DOSOCS2-UI`
    * type `meteor` to start the meteor development server
    * `mongodb` is available through meteor. However, Using a mongodb production server is a better choice.
       `export MONGO_URL=mongodb://localhost:27017/meteor` or instead of `meteor` use a database name of choice. At this point, meteor is the name of database created by mongodb.

  4. Resetting `mongodb`
    * Type `meteor reset` from the project directory to reset mongo database
    * If you delete uploaded packages from `../uploads/` directory, UI will not be able to render SPDX document
      * There will be a server side error message (not logged)
      * `meteor reset` is your friend (for a development environment)
      * By the first release of DOSOCS2-UI, SPDX documents generated will be stored in database and should not be a cause for concern if uploads are deleted

## Uploads

  1. Sign-In or create an Account

  2. Select a `package` with the browse button. Instance: time-1.7 from http://ftp.gnu.org/gnu/time/

  3. Click on the upload button to upload package.

  4. Hit on the View SPDX button `gently` and wait for SPDX document generation. This may take time as dosocs2 scanner is run on the package.

  5. As soon as you see a notification message `scan is done, navigate down` Scroll down to see the viewer.

  6. There is no upload manager at this point i.e. to organize uploads. This will be avaialbe soon. #13 will fix this.


## Configuring nginx server - minimal setup.

  1. Install and start nginx on ubuntu or centOS

    * `sudo apt-get update && sudo apt-get install nginx` to install nginx on ubuntu
    * `sudo yum install epel-release && sudo yum install nginx` to install nginx on centOS
    * `sudo /etc/init.d/nginx start` to start nginx server

  2. (Optional) `ifconfig eth0 | grep inet | awk '{ print $2 }'` to get the IP Address of the sever.Change eth0 to correspond NIC. Place the IP address as server_name if there is no domain name being used.

  3. Configure nginx

    * `sudo rm /etc/nginx/sites-enabled/default` removes default configuration if this is a new instance or if default is not being used.
    * `sudo vi /etc/nginx/sites-enabled/socs.conf` to create a new configuration file and paste the below. Rename to any file.  
		  
		```Configruation-file
		        server {  
		                   listen                *:80;
		                   server_name           <dosocs2app.organization.com>;
		
		                   access_log            /var/log/nginx/app.dev.access.log;
		                   error_log             /var/log/nginx/app.dev.error.log;
		
		                   location / {
		                                proxy_pass http://127.0.0.1:3000;
		                                proxy_http_version 1.1;
		                                proxy_set_header Upgrade $http_upgrade;
		                                proxy_set_header Connection 'upgrade';
		                                proxy_set_header X-Forwarded-For $remote_addr;
		                              }
		                }
		```
    * Change the server_name to the domain name require

  4. Reload nginx with `nginx -s reload` or `/usr/sbin/nginx -s reload`. This will reload configuration just created as <socs.conf>.

    * More information on controlling nginx is at http://nginx.org/en/docs/control.html

  5. Meteor server will run on localhost but proxy_pass will redirect users to Meteor application. However, do not run meteor in development mode.

    * run `meteor --production` from the directory where DOSOCS2-UI was cloned.

  6. Navigate to the field provided in the server_name in the configuration <dosocs2app.organization.com> to start using DOSOCS2-UI

  7. While this is a minimum setup, Meteor applications can be bundled and run as a nodejs application.
     * Detailed instruction are at https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx

  8. Adjusting file uploads (size):
    * `vim /etc/nginx/nginx.conf` and add `client_max_body_size xxM` where xx is a number, M represents MegaBytes in either http or server or location context.


## User-Accounts

   * Customizing user-accounts
     `useraccounts:core` and `meteor add useraccounts:bootstrap` being used alongside `accounts-password`. If useraccounts and passwords customization is required, these packages should be removed or changed. `vanilla packages` exist for Facebook, Twitter, Google Accounts and GitHub Login. Check `https://atmoshpherejs.com` for packages.

   * Rolling your own authentication.
      To save documentation size and to limit duplication, here is the source for performing your own authentication with Meteor.
      `https://themeteorchef.com/recipes/roll-your-own-authentication/`


## CONTRIBUTING

  * Contributing guidelines will be updated in CONTRIBUTING.MD file.
    * The contribution rules for DOSOCS-UI are currently being rewritten. You are welcome to create issues, but we can't accept pull requests from the community at this time.

## LICENSING

Copyright © 2015 University of Nebraska at Omaha

DOSOCS2-UI is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 2 of the License, or (at your option) any later version. See the file LICENSE for more details.

All associated documentation is licensed under the terms of the Creative Commons Attribution Share-Alike 3.0 license. See the file CC-BY-SA-3.0 for more details.

## Security weakness and disclosures

Please report security weakness as issues on GitHub. Before reporting, please confirm a security weakness on a local server instead of testing on a live environment. The only difference in development and production will be in using `meteor run` vs `meteor --production` to change flags.


## Maintainers

[DoSOCSv2 organization](https://github.com/DoSOCSv2)

(This work has been funded through the National Science Foundation VOSS-IOS Grant: 1122642.
