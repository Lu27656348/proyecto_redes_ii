import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
import { useState,useEffect } from 'react'

const socket = io('http://localhost:4000');

function App() {
  /*
  const [mensaje, setMensaje] = useState();
  const [chat, setChat] = useState([])
  const handleSubmit = (e) => {
    e.preventDefault();
    const mensaje_nuevo = {
      body: mensaje,
      from: "Me",
    };
    socket.emit('mensaje', mensaje_nuevo);
    setChat([...chat,mensaje])
    setMensaje('')
  }
  useEffect( ()=> {
    const recibir = (mensaje) => {
      setChat([mensaje, ...chat]);
    };
    socket.on('mensaje', recibir)
    return ()=>{
      socket.off('mensaje',recibir);
    }
  },[chat])
  */
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const receiveMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, [messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([newMessage, ...messages]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="flex justify-center">Redes II Proyecto</h1>
        <input
          name="message"
          type="text"
          placeholder="Escribe tu mensaje..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          autoFocus
          className="rounded-md text-black"
        />
        <ul className='h-80 overflow-y-auto'>
          {messages.map((message, index) => (
            <li
              key={index} className={`my-2 p-2 table text-sm rounded-md ${(message.from === "Me" ? 'bg-green-700 ml-auto' : 'bg-red-700')}`}
            >
              <b>{message.from}</b>:{message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
