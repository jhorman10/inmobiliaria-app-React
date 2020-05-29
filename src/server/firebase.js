import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyB6GoMUnLzjQ9f8gdRP6K6ovQvF4RlEzfw",
  authDomain: "home-1d95f.firebaseapp.com",
  databaseURL: "https://home-1d95f.firebaseio.com",
  projectId: "home-1d95f",
  storageBucket: "home-1d95f.appspot.com",
  messagingSenderId: "298487454569",
  appId: "1:298487454569:web:479f8288ba1a8466b2bbf8",
  measurementId: "G-3NM9YH94ZJ",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.db = app.firestore();
    this.auth = app.auth();
    this.storage = app.storage();

    this.storage.ref().constructor.prototype.saveNewDocs = function (docs) {
      let ref = this;
      return Promise.all(
        docs.map(function (file) {
          return ref
            .child(file.alias)
            .put(file)
            .then((snapshot) => {
              return ref.child(file.alias).getDownloadURL();
            });
        })
      );
    };
  }

  isInit() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  saveDocs = (documentName, document) => {
    return this.storage.ref().child(documentName).put(document);
  };

  returnDoc = (documentUrl) => {
    return this.storage.ref().child(documentUrl).getDownloadURL();
  };

  saveAllDocs = (docs) => this.storage.ref().saveNewDocs(docs);

  deleteDocs = (doc) => this.storage.ref().child(doc).delete();
}
export default Firebase;
