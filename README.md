# CodeLabz

CodeLabz is a platform where the users can engage with online tutorials and the organizations can create tutorials for the users. The platform will be developed using ReactJS front end library and the back end will be developed using the Google Cloud Firestore and Google Firebase Real-Time database.

# Deployed on

https://dev.codelabz.io/

## User Guide

#### How to Setup

Clone the repository.

#### How to Use

Run `npm install` in `CodeLabz` folder.

```
 cd CodeLabz/
 npm install
```

First you need to create a `.env` file in `CodeLabz` folder following the template provided in the file `env.example`<br/> <br/>

1. Sign in to https://console.firebase.google.com/.
2. Click **Add Project** and necessary information about the project.
3. Agree to the terms and click **Create Project**.
4. After creating the project, click **Add Firebase to your web app**.
5. Add app nick name and click register app.
6. Copy the firebase configuration.
7. Paste the configuration `.env` file.

You should fill in these values in their relevent fields in the `.env` file.

To run the project:  
 `$ npm start`

If you failed to run the project do the following steps :

- delete node modules
- delete package-lock.json
- re run `npm install `
  If error still exists add `SKIP_PREFLIGHT_CHECK=true` in your .env file

> **NOTE**: Before starting the server create a file named `.env` same as `.env.example` and add your **Firebase Configurations** in the file.

Visit [localhost:3000](http://localhost:3000) to browse.

#### How to Deploy Firebase Cloud Functions

> **NOTE**:To Deploy firebase cloud functions you have to satisfy following requirements

1. Your Firebase project should have Blaze plan or higher version
2. You should have installed Firebase CLI tool in your machine

Run `npm install` in `CodeLabz/functions ` folder.

```
 cd CodeLabz/functions
 npm install
```

Then you have to generate a private key file for your service account.To get the key file go to this link and follow the instructions https://firebase.google.com/docs/admin/setup#initialize-sdk.

Once you have obtaions the key create folder name as **'private'** in this folder **'CodeLabz/functions'**.Then copy and paste the key file in private folder.
Rename the key file as **'cl-dev-pk.json'**

After that change the database url to your project database url in **'CodeLabz/functions/auth.js'**

Move to the root directory and open a command prompt and type following commands

```
 npm run-script build
 firebase login
 firebase projects:list
```

Find the project ID form the project list that you want to deploy the cloud functions

```
firebase use <project_id>
firebase deploy
```

To run storybook :
` npm run storybook`
It will redirect to 6006 port.Find detailed information [here](https://storybook.js.org/docs/react/get-started/introduction)

To run cypress tests:
`npx cypress run`
It will open a promt displaying all the tests.You can find detailed information [here](https://docs.cypress.io/guides/guides/command-line#How-to-run-commands)


# Install, Configure and Integrate Firebase Emulator Suite
## **How to install**
#### Before installing the Emulator Suite you will need:-

- Node.js version 8.0 or higher.

- Java JDK version 11 or higher.

#### To install the Emulator Suite:
- Install the Firebase CLI. If you don't already have the Firebase CLI installed, install it (https://firebase.google.com/docs/cli#install-cli-windows). 
  You will need CLI version 8.14.0 or higher to use the Emulator Suite.
- You can install the Firebase CLI using npm (the Node Package Manager). Note that you will need to install Node.js and npm. Installing Node.js should install npm as well.

```
npm install -g firebase-tools
```
  
- You can check which version you have installed using the following command in the terminal.
  
```
firebase --version
```
    
- After Installation, Initialize the firebase Using
  
```
firebase init
```

-  Now Set up the Emulator Suite. The Below Command Provides you the emultors Like, Authentication,Firestore, Realtime Database,Storage DataBase etc.
   Select the emulators you needed
    
```
firebase init emulators
``` 
## **How to Configure** 

#### Configure Emulator Suite:-

- You can optionally configure the emulators network ports and path to Security Rules definitions in the firebase.json file:
    - Change emulator ports by running `firebase init emulators` or by editing `firebase.json` manually.
    
Note:-(***Recommended***)If you don't configure these settings, the emulators will listen on their default ports, and the Cloud Firestore, Realtime Database and Cloud Storage 
        emulators will run with open data security.
#### Port Configuration - These are the Default Ports Provided you can change them while initializing(if needed)

| Emulator             | Ports|
| ---                  | ---  |
| Authentication       | 9099 |
| Emulator Suite UI    | 9099 |
| Cloud Functions      | 9099 |
| Realtime Database    | 9099 |
| Cloud Firestore      | 8080 |
| Cloud Storage        | 8080 |
| Firebase Hosting     | 5000 |
| Pub/Sub              | 8085 |

- The emulators will take Security Rules configuration from the database, firestore and storage configuration keys in `firebase.json`.

## Integrate With your CI System.

- Installation and configuration of the Emulator Suite with containers in a typical CI setup is straightforward.

- To Start the Emulators:-

```
firebase emulators:start
```
- You need to run `firebase emulators:start` first and then run `npm start` inorder to run the codelabz webpage.
- You can check/open Emulator suite by visiting [localhost:4000](http://localhost:4000).
  


