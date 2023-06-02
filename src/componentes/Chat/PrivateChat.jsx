import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

export const PrivateChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [connectedServer, setConnectedServer] = useState(false)
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/messages', (message) => {
        console.log(message)
        const receivedMessage = JSON.parse(message.body);
        console.log(receivedMessage)
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    });

    setStompClient(client);
      setConnectedServer(true);
   /* return () => {
      client.disconnect();
    };*/
  }, []);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim() && stompClient.connected) {
      const chatMessage = {
        nickname,
        content: message
      };
      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };


  return (
    <div>
      <h1>hola?</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.content}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={handleMessageChange}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};
