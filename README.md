# Workit - Do and make your workout !

Workit is a fitness app that allows you to create your own workout and to share it with the other users.
You can see my version of it directly here : https://app-workit.herokuapp.com/

It's a PWA that was made in mobile first, so you need to check it with mobile resolutions or on your phone.

## Main features (Available Now)

- Create your account
- Connect to your account
- Create your own workouts
- See some workouts on the home page
- Search any workouts
- Update your profile or your workouts
- Launch any workouts and start your fit routine

## Installation & Setup

You first need to execute some commands to install & setup the project for yourself :

```bash
composer install
npm install
```

After that you need to migrate the schema of our database, for that, you need to type :

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

At this point, you need to import some required data in your MySQL database for the app to work
You can find a file **workit.sql** in the root of the project.
It will add the exercises, muscles, levels, goals and training places that needs to be there.

The .env is already configured, feel free to change it to suit your needs.

## Lauching the server (API)

You need to execute that command for the API to work :

```bash
symfony server:start
```

## Launching the Frontend

And final part, you need to execute that command for the React app to work :

```bash
npm run dev-server
```

**Have fun with making your ultimate workout !**
