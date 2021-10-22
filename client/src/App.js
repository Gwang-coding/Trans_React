import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('결과값');
  const [input, setInput] = useState('');
  const callApi = async () => {
    axios.get("/api").then((res) => {
      setText(res.data.host);
    });
  };

  useEffect(() => {
    callApi();
  }, []);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const onTranslate = () => {
    fetch('http://localhost:3001/api', {
      method: 'post', // 통신방법
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ post: input }),
    });
  };
  
  return (
    <>
      <textarea onChange={onChange}></textarea>
      <button onClick={onTranslate}>번역하기</button>
      <h3>{text}</h3>
    </>
  );
}




export default App;