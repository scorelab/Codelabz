# Table of Content

- [Table of Content](#table-of-content)
- [User Guide](#user-guide)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
    - [Using Docker-Compose](#using-docker-compose)
  - [Firebase Setup](#firebase-setup)
    - [Run Firebase Emulator](#run-firebase-emulator)
  - [Run the Project](#run-the-project)
  - [Run the Storybook](#run-the-storybook)
  - [Run the tests](#run-the-tests)

# User Guide

## Prerequisites

- Node.js version 14.
- Java JDK version 11 or higher. (For running emulators)
- make command line tool. ( optional )
  > 📝**NOTE** : `make` is optional here. You can open `Makefile` and type the associated command manually also, but it is recommended to use `make` so you don't need to run multiple commands.

## Project Setup

> 📝**NOTE**: Make sure that you are using version 14 of node.

> ⚡**Tip**: You can use nvm (node version manager) tool to install multiple node versions and can switch between them easily.

1. Fork the repo as your own copy.
2. Click on `Code` button and then copy HTTPs link. ( it will look like this `https://github.com/<YOUR_USERNAME>/Codelabz.git`)
3. Clone the repo by running `git clone https://github.com/<YOUR_USERNAME>/Codelabz.git`
4. Go to the folder `cd Codelabz`.
5. Run `npm install` or `make install`( this will install all the dependencies in your project)
6. Create a `.env` file in root of directory.
7. Setup firebase and get your own set of keys. ( follow steps in [Firebase Setup](#firebase-setup) section to setup firebase )
8. Copy all the key fields from `.env.sample` and place your own set of values there.
9. Run `npm run dev`.
10. Visit [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your preferred browser.

> 📝**NOTE** : Above steps are enough for you to get started with the Codelabz app. If you want to access the database you need to start the emulators.For setup husky follow [Husky Setup](#husky-setup)

### Using Docker-Compose

You can also use docker-compose to setup your project. Simply create your `.env` file and run

```
docker-compose up
```

This will setup your project along with firebase emulator in a docker environment.

---

## Firebase Setup

1. Sign in to https://console.firebase.google.com/.
2. Click **Add Project** and necessary information about the project.(Below mentioned the Steps to add project to firebase)
   - To add Firebase resources to an existing Google Cloud project, enter its project name or select it from the dropdown menu.
   - To create a new project, enter the desired project name. You can also optionally edit the project ID displayed below the project name
   - Firebase generates a unique ID for your Firebase project based upon the name you give it. If you want to edit this project ID, you must do it now as it cannot be altered after Firebase provisions resources for your project. Visit Understand Firebase Projects to learn about how Firebase uses the project ID.
3. Agree to the terms and click **Create Project**.
4. After creating the project, click **Add Firebase to your web app**.
   - In the center of the Firebase console's project overview page, click the Web icon to launch the setup workflow.
   - If you've already added an app to your Firebase project, click Add app to display the platform options.
   - Enter your app's nickname.
   - This nickname is an internal, convenience identifier and is only visible to you in the Firebase console.
   - Click Register app.
5. Copy the firebase configuration.
6. Follow the below steps to setup firebase functions
   - Go to functions directory (`cd functions`) and install dependencies (`npm install`)
   - Create a folder `private` inside functions directory
   - Then you have to generate a private key file for your service account. Follow the below steps to get private key:
     1. In the Firebase console, open Settings > Service Accounts.
     2. Click Generate New Private Key, then confirm by clicking Generate Key.
     3. Securely store the JSON file containing the key and rename it to `cl-dev-pk.json`
     4. Move the `cl-dev-pk.json` to `Codelabz/functions/private`
7. Paste the configuration `.env` file. **(this will be found in the project settings section of firebase cloud)**
8. You can find your `<FIREBASE_DATABASE_URL>` in the Realtime Database section of the Firebase console. Depending on the location of the database, the database URL will be in one of the following forms:
   - `https://DATABASE_NAME.firebaseio.com` **(for databases in us-central1)**
   - `https://DATABASE_NAME.REGION.firebasedatabase.app`**(for databases in all other locations)**
9. You can get your `<FIREBASE_VAPID_KEY>` from Cloud-Messaging tab
   - navigate to the setting of your project Open the Cloud Messaging tab.
   - scroll to the Web configuration section.
   - In the Web Push certificates tab, click Generate Key Pair. The console displays a notice that the key pair was generated. You get your Vapid key form there.
10. As you're using emulator, set `<USE_EMULATOR>` to "true"
11. You can get your `<CYPRESS_PROJECT_ID>` as cypress project id from [cypress cloud](https://cloud.cypress.io)

You should fill in these values in their relevant fields in the `.env` file.

### Firebase Emulator Setup

1. Refer this site [https://firebase.google.com/docs/emulator-suite/install_and_configure]
2. Make sure you have the correct jdk version installed
3. Make sure you are in the parent directory
4. Now lets connect your local firebase to cloud by running command (`firebase login`)
5. Then authenticate your firebase using browser and set the selected web app for codelabz
6. Then run the command (`firebase init`)
7. Select all the emulator necessitites by pressing a or selecting them manually and pressing space
8. Answer the commands
9. Lets set up your credentials of test data
10. Run your firebase emulator by running the following command.

```shell
make emulator

```

11. If make command isn't installed then run command

```shell
firebase emulators:start --import=testdata

```

12. If you want to start without any testdata , use the following command

```shell
make emulator

```

14.If make command isn't installed then run

```shell
 firebase emulator:start
```

You will observe 3 terminals opening

### Run Firebase Emulator

Run your firebase emulator by running the following command.

```shell
make emulator-import
```

This will run the emulator with the `testdata`. Check out [TESTDATA.md](./TESTDATA.md) for more info.

if you don't want to import testdata, run

```
make emulator
```

If you want to export the emulator, run

```
make emulator-export
```

---

## Run the Project

To run the project
`npm run dev`

If you failed to run the project do the following steps :

- delete node modules
- delete package-lock.json
- re run `npm install `
  If error still exists add `SKIP_PREFLIGHT_CHECK=true` in your .env file

## Run the Storybook

To run storybook :
` npm run storybook`
It will redirect to 6006 port. Find detailed information [here](https://storybook.js.org/docs/react/get-started/introduction)

---

## Run the tests

To run cypress tests:
`npm run cy:run`
It will open a prompt displaying all the tests. You can find detailed information [here](https://docs.cypress.io/guides/guides/command-line#How-to-run-commands)

**Instead, if you want to open the cypress app**. You can run,

`npm run cy:open`
