import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCMxv1_dvBMwUXUc0napMddqkYnRqtJ5wU",
    authDomain: "school-attendence-app-b75a8.firebaseapp.com",
    databaseURL: "https://school-attendence-app-b75a8-default-rtdb.firebaseio.com",
    projectId: "school-attendence-app-b75a8",
    storageBucket: "school-attendence-app-b75a8.appspot.com",
    messagingSenderId: "893160557740",
    appId: "1:893160557740:web:cd779f13340e3c1bb26309"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.database();