# Personal assistant (Manul) for my needs.
![this is cool Manul](./assets/manul-logo-with-white-stroke.png)
Originally, I thought to make it in go, but since I need it asap, I decided to make it in node.

# What it does
1. Bunch of CLI commands which goes like:
```
manul *name of the command*
```
2. Telegram integration for useful stuff (for example, reminders)


# TODO

1. ~~Create telegram script which sends wiki potd every morning~~
1. Start test coverage.
1. ~~Make cli work with typescript~~
1. ~~Write script for tracking pressure in google sheets TODO: Maybe, get rid of google sheets and use local instead. Their api is horrible. Just store the table on serverside~~
1. Create db structure
1. Migrate all jobs and tasks to db and automate everything that can be automated


# Models definition

## User
- id: number
- name: string
- tg_id: number

## Invite
- user_id: number
- code: string


Data can be received from everywhere - no mattar it's tg bot or just get request.

First thing that appears to me is to separate it to services, and then use services as I do usually in rest server apps.