import "./App.css";
import { useEffect, useState } from "react";
import database from "./firebase";
import firebase from "firebase";
import { Avatar } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const name = window.prompt("Enter a Username");
    setUsername(name);
  }, []);

  useEffect(() => {
    //this code will run ONCE when the App componnt mounts
    database
      .collection("Messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault(); //Do not refresh

    const chatMessage = {
      name: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };

    database.collection("Messages").add(chatMessage);
    //setList([...list, input]);
    setInput("");
  };

  return (
    <div className="app">
      <header className="header">
        <div className="avatar">
          <Avatar src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png"></Avatar>
        </div>
        <div className="roomname">
          <h3>Bat Chat</h3>
        </div>
      </header>
      {list.map(({ id, data: { message, timestamp, name } }) => (
        <h3 key={id} className="chatMessage">
          <div className="name">{name}</div>:{" "}
          <div className="msg">{message}</div>
        </h3>
      ))}

      <form>
        <input
          placeholder="Type a message"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button onClick={sendMessage} type="submit">
          <SendRoundedIcon name="send" font="Entypo" color="white" size={50} />
        </button>
      </form>
    </div>
  );
}

export default App;
