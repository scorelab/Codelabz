# Table of Content
1. [CodeLabz](#codelabz)
2. [Deployment](#deployment)
3. [Community](#community)
4. [Environment Setup](#environment-setup)
    1. [Prerequisites](#prerequisites)
    2. [Project Setup](#project-setup)
    3. [Firebase Setup](#firebase-setup)
5. [Set-up-Firebase](#set-up-firebase)
    1. [How to Deploy Firebase Cloud Functions](#how-to-deploy-firebase-cloud-functions)
6. [Firebase Emulator Flow](#firebase-emulator-flow)
7. [Install, Configure and Integrate Firebase Emulator Suite](#install-configure-and-integrate-firebase-emulator-suite)
   1. [<strong>How to install</strong>](#how-to-install)
   2. [<strong>How to Configure</strong>](#how-to-configure)
8. [Integrate With your CI System.](#integrate-with-your-ci-system)
    1. [To Start the Emulators:-](#to-start-the-emulators-)
    2. [Import and Export:-](#import-and-export-)
9. [FAQs(Frequently Asked Questions)](#faqs)    
    1. Login/Signup is not working.

# CodeLabz
**CodeLabz** is a platform where the users can engage with online tutorials and the organizations can create tutorials for the users. The platform will be developed using ReactJS frontend library and the backend will be developed using the Google Cloud Firestore and Google Firebase Real-Time database.

# Deployment
You can see the app live at [https://dev.codelabz.io/](https://dev.codelabz.io/)

# Community
Join and communicate with other members on our community. We communicate on gitter.

[![Gitter](https://badges.gitter.im/scorelab/CodeLabz.svg)](https://gitter.im/scorelab/CodeLabz?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

# Environment Setup

### Prerequisites
- Node.js version 14.
- Java JDK version 11 or higher. (For running emulators)

### Project Setup
> **NOTE**: Make sure that you are using version 14 of node.
1. Fork the repo as your own copy.
2. Click on `Code` button and then copy HTTPs link.
3. Clone the repo by running `git clone https://github.com/<YOUR_USERNAME>/Codelabz.git`
4. Go to the folder `cd Codelabz`.
5. Run `npm install` ( this will install all the dependencies in your project)
6. Create a `.env` file in root of directory. 
7. Setup firebase and get your own set of keys. ( Follow steps in [Firebase Setup](#firebase-setup) section to setup firebase )
8. Copy all the key fields from `.env.sample` and place your own set of keys there.
9. Run `npm run dev`.
10. Visit  [http://127.0.0.1:5173/](http://127.0.0.1:5173/)  in your preferred browser.

>**NOTE** : Above steps are enough for you to get started with the Codelabz app. If you want to access the database you need to start the emulators.

### Firebase Setup

1. Sign in to https://console.firebase.google.com/.
2. Click **Add Project** and necessary information about the project.(Below mentioned the Steps to add project to firebase) 
    - To add Firebase resources to an existing Google Cloud project, enter its project name or select it from the dropdown menu.
    - To create a new project, enter the desired project name. You can also optionally edit the project ID displayed below the project name
    - Firebase generates a unique ID for your Firebase project based upon the name you give it. If you want to edit this project ID, you must do it now as it cannot be       altered after Firebase provisions resources for your project. Visit Understand Firebase Projects to learn about how Firebase uses the project ID.
3. Agree to the terms and click **Create Project**.
4. After creating the project, click **Add Firebase to your web app**.
    - In the center of the Firebase console's project overview page, click the Web icon  to launch the setup workflow.
    - If you've already added an app to your Firebase project, click Add app to display the platform options.
    - Enter your app's nickname.
    - This nickname is an internal, convenience identifier and is only visible to you in the Firebase console.
    - Click Register app.
5. Copy the firebase configuration.
6. Paste the configuration in `.env` file.
7. You can find your **<FIREBASE_DATABASE_URL>** in the Realtime Database section of the Firebase console. Depending on the location of the database, the database URL  will be in one of the following forms:
    - https://DATABASE_NAME.firebaseio.com (for databases in us-central1)
    - https://DATABASE_NAME.REGION.firebasedatabase.app (for databases in all other locations)
8. You can get your <FIREBASE_VAPID_KEY> from Cloud-Messaging tab
    - navigate to the setting of your project Open the Cloud Messaging tab.
    - scroll to the Web configuration section.
    - In the Web Push certificates tab, click Generate Key Pair. The console displays a notice that the key pair was generated. You get your Vapid key form there.
  
## Contribute

Contributions are always welcome!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [code of conduct](./code_of_conduct.md).

# FAQs
### 1. Login/Signup is not working ?
<img src="https://files.gitter.im/5eb21f15d73408ce4fe2cb37/Jl4t/image.png" width="600">

### Solution :-
This problem generally arises when you have not setuped/started the Firebase emulators.

1. [Setup firebase emulator](#how-to-install). 
2. [Start the Emulators](#to-start-the-emulators-)
3. Run the app using `npm start`.

>**NOTE** : Remember to start the emulators before running the app. 

- To start emulators - `firebase emulators:start --import=firebase.json --project <your-project-id>`. <br/>
- In some case all the emulator will not start. So you can execute a separate command for a particular emulator<br/>
  For example if auth emulator is not starting you can use this command - <br/> `firebase emulators:start --import=firebase.json --project <your-project-id> --only auth`.
