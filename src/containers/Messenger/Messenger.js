import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Messenger.module.css";
import * as authActionCreators from "../../store/action-creators/authentication";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRef } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCe1DfCRnQlDSoOVOeRE1O9Ck-9tOra4Fg",
  authDomain: "e-med-records.firebaseapp.com",
  databaseURL:
    "https://e-med-records-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "e-med-records",
  storageBucket: "e-med-records.appspot.com",
  messagingSenderId: "144026144493",
  appId: "1:144026144493:web:34e4aa1e9715f4807b06e4",
  measurementId: "G-D20RF0J9RF",
};

// If there is an existing firebase app, use it. Else, initialize a new firebase app
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const firestore = firebase.firestore();

const ChatMessage = (props) => {
  const { text, uid } = props.message;
  const messageClass =
    uid === localStorage.getItem("userId") ? styles.Sent : styles.Received;

  return (
    <div className={`${styles.Message} ${messageClass}`}>
      <p>{text}</p>
    </div>
  );
};

const ChatRoom = () => {
  const dummy = useRef();

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const uid = localStorage.getItem("userId");

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <main className={styles.Main}>
        {messages &&
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

        <div ref={dummy}></div>
      </main>
      <form className={styles.Form} onSubmit={sendMessage}>
        <input
          className={styles.Input}
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit" className={styles.FormButton}>
          <i
            className={`fas fa-chevron-circle-right ${styles.FormButtonIcon}`}
          ></i>
        </button>
      </form>
    </React.Fragment>
  );
};

const Messenger = (props) => {
  let redirectToLogin = null;
  const expirationDate = new Date(localStorage.getItem("expirationDate"));
  const now = new Date();
  if (now >= expirationDate) {
    redirectToLogin = <Redirect to="/login" />;
    props.onLogout();
  }

  return (
    <React.Fragment>
      {redirectToLogin}
      <div className={styles.App}>
        <section className={styles.AppSection}>
          <ChatRoom />
        </section>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(authActionCreators.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Messenger);
