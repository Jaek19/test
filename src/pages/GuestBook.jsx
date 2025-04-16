import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import './GuestBook.css';

const GuestBook = () => {
  const [apiMessage, setApiMessage] = useState([]);
  const [postData, setPostData] = useState({name: "", message: ""});

  const showMessage = async () => {
    try {
      const res = await axios.get('https://guest3-1007621736298.us-central1.run.app/guest');
      setApiMessage(res.data);
    } catch(e) {
      console.error("data loading failed:", e);
    }
  }

  useEffect(() => {
    showMessage();
  },[apiMessage]);

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://guest3-1007621736298.us-central1.run.app/guest', postData);
      setPostData({name : "", message: ""});
      showMessage();
    } catch(err) {
      console.error("data posting failed:", err);
    }
    console.log("submitPost");
  }

  return (
    <div className='guest-container'>
      <h1> 방명록 </h1>
      <form onSubmit={submitPost}>
        <input type="text" value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} required  placeholder='name'/>
        <textarea value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} required placeholder='msg'></textarea>
        <button type='submit'>등록하기</button>
      </form>

      <div className='message-list'>
        {
          apiMessage.map((msg) => (
             <div className='message-item' key={msg.id}>
              <p>{msg.name}</p>
              <p>{msg.message}</p>
              <p>{new Date(msg.created_at).toLocaleString()}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default GuestBook