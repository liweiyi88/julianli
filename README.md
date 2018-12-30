# My website, experiments and knowledge sharing
[![CircleCI](https://circleci.com/gh/liweiyi88/julianli/tree/master.svg?style=svg)](https://circleci.com/gh/liweiyi88/julianli/tree/master)

## How to run it locally
1. Install docker.
2. Run `make start`.

## Access the admin locally
http://localhost:8888/admin/posts with username `julian` and password `abcd`

## Framework, tools and features
* It is a Symfony 4 application.
* Docker for local development.
* Ansible for server provisioning.
* [CircleCI](https://circleci.com/) + [Ansistrano](https://github.com/ansistrano/deploy) for CI/CD pipeline.
* Contact me email is done by AWS SQS + Symfony Messenger.
* Supervisord is used for managing worker commands.
* Rest api is built with [api-platform](https://api-platform.com/).
* Admin is built with [React js](https://reactjs.org/) and [Tailwind css](https://tailwindcss.com/).
## Articles and ideas
* [Using Symfony Messenger With AWS SQS (2018)](http://julianli.co/posts/symfony-messenger-with-sqs)
* [Asynchronous messaging (2017)](https://medium.com/@weiyi.li713/integrate-web-application-with-external-systems-by-using-message-queue-ac201469c02d) 
