# README #

This is the website for KFUM-Spejderne i Hellerup, Kragefolket

CI on [Snap-CI](https://snap-ci.com/jballe/Kragefolket.Website/branch/master)

## Prerequisities ##
* Install [php](http://www.microsoft.com/web/platform/phponwindows.aspx)
* Install [node.js](http://nodejs.org/download/)
* Install [mysql](http://dev.mysql.com/downloads/mysql/)
* Install [composer](https://getcomposer.org/) by running [composer windows installer](https://getcomposer.org/Composer-Setup.exe), 
  during install you might need to specify php.exe, located at something like `C:\Program Files (x86)\PHP\v5.3`
* Install [sed](http://gnuwin32.sourceforge.net/packages/sed.htm) to support downloading of database from remote to local

## To get started ##

You must have a local environments.config file with your configuration (eg. database name and authentication).
You can look at the environment.sample for a skeleton. We have our configuration files in the build system and in a [private configuration repository](https://bitbucket.org/kragefolket/kragefolket-environmentconfig)
With this in place you can start using the scripts and task runner.

The following can be automated by running the powershell script:
```
Set-ExecutionPolicy Restricted -Scope Process
./build restore
```

### To get started manually ###

The similar steps can be done manually instead of using the above powershell script

* Install [grunt](grunt.com) and restore node packages by running 
```
npm install grunt-cli -g
npm install
```
* Restore php packages, download media files and database from test site and build your local deploy folder by running
```
#grunt getup (ok this is currently not working)
```
* Setup a new IIS site running from the deploy folder

## How to work ##
While making your changes to the files you can have grunt running and copy the necessary files to your local deploy folder by running
```
grunt develop
```

When your changes are ready, commit to sourcecontrol and then deploy to test by running
```
grunt deploy
```