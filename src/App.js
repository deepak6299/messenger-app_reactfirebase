import { useEffect, useState } from 'react';
import { getDatabase, push, ref, set, onChildAdded, off } from 'firebase/database';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

import './App.css';

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser({ name: user.displayName, email: user.email });
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  };

  const [user, setUser] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    const handleNewChat = (data) => {
      setChats((prevChats) => [...prevChats, data.val()]);
      setTimeout(updateHeight, 100);
    };

    onChildAdded(chatListRef, handleNewChat);

    return () => {
      off(chatListRef, 'child_added', handleNewChat);
    };
  }, []);

  const sendChat = () => {
    if (!msg.trim()) return;

    const chatRef = push(chatListRef);
    set(chatRef, {
      user,
      message: msg.trim(),
    });
    setMsg('');
  };

  return (
    <div>
      {user.email ? null : (
        <div className='authentication'>
          <h3>Sign in with Google</h3>
          <button onClick={googleLogin}>Google SignIn</button>
        </div>
      )}
      {user.email ? (
        <div className='main-container'>
          <h3>User: {user.name}</h3>
          <div id="chat" className="chat-container">
            {chats.map((c, i) => (
              <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
                <p className="chatbox">
                  <strong>{c.user.name}: </strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btm">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              value={msg}
              placeholder="enter your chat"
            />
            <button onClick={sendChat}>Send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
