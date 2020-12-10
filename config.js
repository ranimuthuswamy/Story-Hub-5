import * as firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyARSKe7JaO7hwY51dXngJM1jAlsUvgeBPc",
  authDomain: "story-hub-a5a7c.firebaseapp.com",
  databaseURL: "https://story-hub-a5a7c.firebaseio.com",
  projectId: "story-hub-a5a7c",
  storageBucket: "story-hub-a5a7c.appspot.com",
  messagingSenderId: "716906616283",
  appId: "1:716906616283:web:5ac31d383b580c0d61c3fe",
};

// Initialize Firebase
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
