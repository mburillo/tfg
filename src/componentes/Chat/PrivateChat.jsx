import React, { useEffect, useState } from 'react';
import { Navegacion } from '../Navegacion';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { OtherUserMessage } from './OtherUserMessage';
import { CurrentUserMessage } from './CurrentUserMessage';
export const PrivateChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [connectedServer, setConnectedServer] = useState(false)
  const [img, setImg] = useState([])
  useEffect(() => {
    const socket = new SockJS("https://codingtogetherspring-production.up.railway.app/ws");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      if (!connectedServer) {
        client.subscribe('/topic/messages', (message) => {
          setConnectedServer(true)
          console.log(message)
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage)
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      }

    });
    setStompClient(client);

    return () => {
    };
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        content: message,
        id: localStorage.getItem("login")
      };
      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };

  const fetchMessages = () => {
    fetch('https://codingtogetherspring-production.up.railway.app/getChatMessages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchMessages();
    return () => {
    };
  }, []);

  useEffect(() => {
    const imagePath = localStorage.getItem('image');
    setImg(imagePath);
  }, []);

  return (
    <><Navegacion />
      <section>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-6">
              <div className="card" id="chat2">
                <div className="card-header d-flex justify-content-between align-items-center p-3">
                  <h5 className="mb-0">Chat</h5>
                </div>
                <div className="card-body overflow-auto" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '400px' }}>
                  {messages.map(message => (
                    message.sender.id == localStorage.getItem("login") ? (
                      <CurrentUserMessage
                        key={message.id}
                        content={message.content}
                        timestamp={message.timestamp}
                        user_id={message.sender.id}
                        username={message.sender.username}
                        profileImage={message.sender.profileImage}
                      />
                    ) : (
                      <OtherUserMessage
                        key={message.id}
                        content={message.content}
                        timestamp={message.timestamp}
                        user_id={message.sender.id}
                        username={message.sender.username}
                        profileImage={message.sender.profileImage}
                      />
                    )
                  ))}
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                  <img src={img} className="rounded-circle" alt="avatar 3" style={{ width: '50px', height: '50px' }} />
                  <input type="text" className="form-control form-control-lg" id="exampleFormControlInput1" placeholder="Escribe tu mensaje"
                    value={message}
                    onChange={handleMessageChange} />
                  <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                  <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                  <a className="ms-3" href="#!"><i className="fas fa-paper-plane"></i></a>
                  <button type="button" className="btn btn-primary" onClick={sendMessage}>
                    <i className="fas fa-plus">Enviar</i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
