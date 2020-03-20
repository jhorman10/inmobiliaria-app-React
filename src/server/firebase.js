import app from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
  }
}
export default Firebase;
