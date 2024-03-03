# TypeFast
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Cloud Functions](https://img.shields.io/badge/react_beautiful_dnd-13.0.0-0baf7c)
![Firebase](https://img.shields.io/badge/Firebase-10.5.2-ffa611)
![Material UI](https://img.shields.io/badge/Material_UI-11.11.1-06b6d4)
![Zustand](https://img.shields.io/badge/Zustand-^4.4.6-333383)

## About
TypeFast is a open-source minimalistic typing test inspired by [@monkeytypegame](https://github.com/monkeytypegame/monkeytype). It features several test types, an account system to save your typing history and user-customizable options such as fonts, color themes and carets. TypeFast aims to be an unobtrusive and simple typing experience while providing real-time feedback about your typing.

## Features
- Live feedback about your errors made, WPM and accuracy
- Preset color themes, you can create your own themes too!
- Many test modes and test options
- Multiplayer games

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JS0Nwong/TypeFast.git
cd TypeFast
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration and update the `src/configs/firebase.js` file with your configuration details.

4. Run the application:

```bash
npm start
```

Visit `http://localhost:3000` in your browser to see the Kanban board app in action.

## Deployment

To deploy the app, build the project and deploy it to a hosting service of your choice. For Firebase hosting, you can use:

```bash
firebase deploy
```

