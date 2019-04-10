import Firebase from 'firebase';  
let config = {  
    apiKey: "AIzaSyDHT8s4yKhr6P3wT4AWGE5jks2MuWuj3Gw",
    authDomain: "surewash-27021.firebaseapp.com",
    databaseURL: "https://surewash-27021.firebaseio.com",
    projectId: "surewash-27021",
    storageBucket: "surewash-27021.appspot.com",
    messagingSenderId: "759660716043"
};
let app = Firebase.initializeApp(config);  
export const db = app.database();  