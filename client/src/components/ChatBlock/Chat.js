import { Avatar, Button, Container, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useAuth } from "../../contexts/AuthContext";
import firebase from "firebase/app";
import { firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SendIcon from "@material-ui/icons/Send";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import "./Chat.css";

const Chat = () => {
  const { currentUser } = useAuth();
  const [value, setValue] = useState("");
  const [textState, setTextState] = useState("");
  const [messages] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
  );

  const sendMessage = async () => {
    firestore.collection("messages").add({
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: Date.now(),
    });
    setValue("");
  };

  const deleteMessage = async (messageId) => {
    const res = await firestore
      .collection("messages")
      .where("id", "==", messageId);
    res.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
    console.log(res);
  };

  const showEditWindow = async (messageId) => {
    let some = document.getElementsByClassName(messageId);
    some[0].style.display = "block";
    let someTwo = document.getElementById(messageId);
    setTextState(someTwo.textContent);
  };

  const handleInputChange = async (e) => {
    await setTextState(e.target.value);
  };

  const saveEditedMessage = async (messageId) => {
    const res = await firestore
      .collection("messages")
      .where("id", "==", messageId);
    let editedMessageText = {
      text: textState,
    };
    res.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update(editedMessageText);
      });
    });
    let some = document.getElementsByClassName(messageId);
    some[0].style.display = "none";
  };

  console.log(firestore.collection("messages"));
  return (
    <>
      <Header />
      <div className="chat__container">
        <Container>
          <h2 style={{ textAlign: "center", color: "#fda90f" }}>
            *Супер-мега-крутой-чат
          </h2>
          <Grid
            container
            justify={"center"}
            style={{ height: window.innerHeight - 50 }}
          >
            <div
              style={{
                width: "80%",
                height: "60vh",
                border: "1px solid gray",
                overflowY: "auto",
                background: "rgba(255, 255, 255, 0.1)",
              }}
            >
              {messages &&
                messages.map((item) => (
                  <div
                    style={{
                      margin: 10,
                      // border: currentUser.uid === item.uid ? '2px solid green' : '2px dashed red',
                      background:
                        currentUser.uid === item.uid
                          ? "rgba(20, 28, 199, 0.5)"
                          : "rgba(40, 3, 75, 0.5)",
                      borderRadius: 10,
                      marginLeft:
                        currentUser.uid === item.uid ? "auto" : "10px",
                      width: "fit-content",
                      minWidth: 150,
                      maxWidth: "60%",
                    }}
                  >
                    <Grid container>
                      <Avatar src={item.photoURL} />
                      <div>{item.displayName}</div>
                      {currentUser.uid === item.uid ||
                      currentUser.uid === "Ti6pFHiMAkdij9f1OlefDNhkwFT2" ? (
                        <>
                          <Button onClick={() => showEditWindow(item.id)}>
                            <EditIcon />
                          </Button>
                          <div className={item.id} style={{ display: "none" }}>
                            <input onChange={(e) => handleInputChange(e)} />
                          </div>
                          <Button onClick={() => saveEditedMessage(item.id)}>
                            <SaveIcon />
                          </Button>
                          <Button onClick={() => deleteMessage(item.id)}>
                            <DeleteForeverIcon />
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </Grid>
                    <div id={item.id} style={{ overflowWrap: "break-word" }}>
                      {item.text}
                    </div>
                  </div>
                ))}
            </div>
            <Grid
              container
              direction={"column"}
              alignItems={"flex-end"}
              style={{ width: "80%" }}
            >
              <TextField
                placeholder="Введите сообщение"
                onChange={(e) => setValue(e.target.value)}
                className="chat__input-field"
                variant={"outlined"}
                fullWidth
                rowsMax={2}
                value={value}
              />
              <Button onClick={sendMessage} className="chat__send-button">
                <SendIcon />
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Chat;
