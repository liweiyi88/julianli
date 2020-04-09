# My website, experiments and knowledge sharing
[![CircleCI](https://circleci.com/gh/liweiyi88/julianli/tree/master.svg?style=svg)](https://circleci.com/gh/liweiyi88/julianli/tree/master)

## How to run
### prerequisite
* PHP >= 7.4

1. Install docker.
2. Put your `ALGOLIA_APP_ID` and `ALGOLIA_API_KEY` values in the `.env.local` file to make Algolia Search data sync up and running.
3. In `webpack.config.js` file, put your own `ALGOLIA_SEARCH_ONLY_API_KEY` and `ALGOLIA_APP_ID` to make the Algolia search bar up and running. 
3. Run `make start`.

## Access the admin locally
http://localhost:8888/admin/posts with username `julian` and password `abcd`

## Framework, tools and features
* It is a Symfony 4.4 application.
* Admin is built with [React js](https://reactjs.org/) and [Tailwind css](https://tailwindcss.com/).
* Admin search bar is built with [Algolia Search](https://www.algolia.com/).
* Ansible for server provisioning.
* [Bugsnag](https://www.bugsnag.com/) for application stability monitoring.
* [CircleCI](https://circleci.com/) + [Ansistrano](https://github.com/ansistrano/deploy) for CI/CD pipeline.
* Contact me email is done by AWS SQS + Symfony Messenger.
* Docker for local development.
* Rest api is built with [api-platform](https://api-platform.com/).
* Supervisord is used for managing worker commands.
## Articles and ideas
* [Using Symfony Messenger With AWS SQS (2018)](http://julianli.co/posts/symfony-messenger-with-sqs)
* [Asynchronous messaging (2017)](https://medium.com/@weiyi.li713/integrate-web-application-with-external-systems-by-using-message-queue-ac201469c02d) 
