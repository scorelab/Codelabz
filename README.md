# CodeLabz

## Table of Contents 📑

- [CodeLabz](#codelabz)
- [Deployment](#deployment)
- [Community](#community)
- [Contribute](#contribute)
- [Getting Started with CodeLabz](#getting-started-with-codelabz)
- [FAQs (Frequently Asked Questions)](#faqs-frequently-asked-questions)
  - [Do I need to purchase Blaze plan to run the app?](#do-i-need-to-purchase-blaze-plan-to-run-the-app)
  - [`npm install` command is not executing successfully in my system](#npm-install-command-is-not-executing-successfully-in-my-system)
  - [Login/Signup is not working](#loginsignup-is-not-working)
  - [I am creating a new account and it says that confirmation mail is sent to my email but I didn't get any mail](#i-am-creating-a-new-account-and-it-says-that-confirmation-mail-is-sent-to-my-email-but-i-didnt-get-any-mail)
  - [I have done the environment setup, but when I start the app it is showing a white/blank screen](#i-have-done-the-environment-setup-but-when-i-start-the-app-it-is-showing-a-whiteblank-screen)
  - [`make` command not found](#make-command-not-found)
  - [I want to contribute but don't know where to start](#i-want-to-contribute-but-dont-know-where-to-start)


## CodeLabz

**CodeLabz** is a platform where users can engage with online tutorials, and organizations can create tutorials for the users. The platform is developed using the ReactJS frontend library and the backend is powered by Google Cloud Firestore and Google Firebase Real-Time database.

## Deployment

The app is live at [https://dev.codelabz.io/](https://dev.codelabz.io/)

## Community

Join our community and communicate with other members. We use Gitter for communication.

- [Gitter](https://gitter.im/scorelab/CodeLabz)

## Contribute

Contributions are always welcome!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [code of conduct](./code_of_conduct.md).
## Getting Started with CodeLabz

### Initial Setup

Before you dive into the world of CodeLabz, here are the initial steps you need to follow to get the project up and running on your local machine for development and testing purposes.

#### Prerequisites

- Node.js (Preferably version 14.x)
- npm (Node Package Manager)
- A Firebase Account for managing backend services

#### Clone the Repository

First, clone the CodeLabz repository to your local machine using Git:


git clone https://github.com/scorelab/Codelabz.git

`cd Codelabz`


Install Dependencies

After cloning the project, you need to install the necessary dependencies:

`npm install`

Setting Up Firebase

Go to the Firebase Console and create a new project. Once your project is created, add a new web app in Firebase project settings. Copy the Firebase config object and replace the placeholders in your .env file with your Firebase project credentials.

Running the Application

Now that you've set up your environment and Firebase, you can run the application locally:

`npm run dev`



## FAQs (Frequently Asked Questions)

### Do I need to purchase Blaze plan to run the app?

No, you don't need to purchase the Blaze plan to run the app. It is only required if you want to deploy Firebase cloud functions.

### `npm install` command is not executing successfully in my system

Make sure you are using version 14 of Node.js. If the problem persists, try `npm install --legacy-peer-deps`.

### Login/Signup is not working

This problem generally arises when you have not set up/started the Firebase emulators. Follow these steps:

1. [Setup Firebase emulator](https://github.com/scorelab/Codelabz/blob/master/CONTRIBUTING.md#firebase-setup).
2. [Start the Emulators](https://github.com/scorelab/Codelabz/blob/master/CONTRIBUTING.md#run-firebase-emulator).
3. Run the app using `npm run dev`.

**NOTE**: Remember to start the emulators before running the app.

### I am creating a new account and it says that confirmation mail is sent to my email but I didn't get any mail

This feature is not fully implemented yet. We are currently working on this. For now, you can use the login/signup with Google option.

### I have done the environment setup, but when I start the app it is showing a white/blank screen

This problem can arise in multiple scenarios:

- Check the browser console for errors and try to fix them.
- Make sure you have created a `.env` file and placed all the values correctly.
- Disable any active ad-blocker extensions in your browser.

### `make` command not found

The "Make Command Not Found" error indicates that the make utility is either not installed on your system or not present in the PATH variable. [Follow this link to fix this issue.](https://www.technewstoday.com/fix-make-command-not-found/)

### I want to contribute but don't know where to start

First, try to make yourself comfortable with the app and explore its functionalities. Look into issues that are already raised and not assigned to anyone, and ask the mentors to get it assigned to you. If you want to work on a new issue, first discuss it in the gitter channel with the mentors and then raise the issue.

❓ Got more questions? Ask them in our [gitter channel](https://matrix.to/#/#scorelab_CodeLabz:gitter.im), and we would love to answer them.
