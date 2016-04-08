# DOSOCS2-UI
Web interface for DoSOCSv2

## Configuring development environment

  1. Install and configure `dosocs2`
    * Step-by-step instructions are available at https://github.com/DoSOCSv2/DoSOCSv2.git
    * Perform database initialization with `dosocs2 dbinit` from console

  2. Install meteor `curl https://install.meteor.com/ | sh` on OS X or Linux
    * The UI will run on `windows` but `dosocs2` does not run natively on `windows` unless Linux container is used.

  3. Clone this project
    * `git clone https://github.com/UShan89/DOSOCS2-UI.git`
    * `cd DOSOCS2-UI`
    * type `meteor` to start the meteor development server
    * `mongodb` is available through meteor

  4. Resetting `mongodb`
    * Type `meteor reset` from the project directory to reset mongo database
    * If you delete uploaded packages from `../uploads/` directory, UI will not be able to render SPDX document
      * There will be a server side error message (not logged)
      * `meteor reset` is your friend (for a development environment)
      * By the first release of DOSOCS2-UI, SPDX documents generated will be stored in database and should not be a cause for concern if uploads are deleted.

## Uploads

  1. Upload a `package`. Instance: time-1.7 from http://ftp.gnu.org/gnu/time/

  2. Reload the page. (This is a bug being pursued for a fix #2 will fix this).

  3. Hit on the SPDX button `gently` and wait for SPDX document generation.


## Configuring nginx server for production

## User-Accounts

## CONTRIBUTING

## LICENSING

## Security weakness and disclosures

## Bug reports
