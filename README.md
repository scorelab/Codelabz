# CodeLabz

CodeLabz is a platform where the users can engage with online tutorials and the organizations can create tutorials for the users. The platform will be developed using ReactJS front end library and the back end will be developed using the Google Cloud Firestore and Google Firebase Real-Time database.

 

## User Guide

#### How to Setup

Clone the repository.

#### How to Use (Web)
Run `npm install` in `CodeLabz` folder.

```
 cd CodeLabz/
 npm install
```
First you need to create a `.env` file in  `CodeLabz` folder following the template provided in the file `env.example`<br/> <br/>

1. Sign in to https://console.firebase.google.com/.
2. Click **Add Project** and necessary information about the project.
3. Agree to the terms and click **Create Project**.
4. After creating the project, click **Add Firebase to your web app**.
5. Add app nick name and click register app.
6. Copy the firebase configuration.
8. Paste the configuration `.env` file.

You should fill in these values in their relevent fields in the `.env` file.

To run the project:  
   `$ npm start`

> **NOTE**: Before starting the server create a file named `.env` same as `.env.example` and add your **Firebase Configurations**  in the file.

Visit [localhost:3000](http://localhost:3000) to browse.


#### How to Deploy Firebase Cloud Functions 

> **NOTE**:To Deploy firebase cloud functions you have to satisfy following requirements

1) Your Firebase project should have Blaze plan or higher version
2) You should have installed Firebase CLI tool in your machine

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



