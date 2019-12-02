# Enigmo Project

## Requirements

For development, you will only need Node.js installed on your environement.

###
    $ node --version
    v10.16.3

    $ npm --version
    6.9.0

## Install

$ git clone https://github.com/hitzu/enigmo-web-app
$ cd enigmo-web-app
$ npm install

### Configure App

Configure .env.develop with the url where you have setup:

- backend api
- oauth like endpoint for auth
- development

## Start & watch

    Develop
    $ REACT_APP_ENV=develop npm start

    Production
    $ REACT_APP_ENV=production npm start

## Simple build for production

    $ npm run build

