import express from 'express';
import morgan from 'morgan';
import {Server as SocketServer} from 'socket.io'
import http from 'http';
import cors from 'cors'
const app = express();
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});
import {PORT} from './config.js'
app.use(cors())
app.use(morgan('dev'))

io.on("connection", (socket)=>{
    console.log(socket.id);
    console.log('usuario conectado');
    socket.on('mensaje', function (mensaje){
        console.log(mensaje);
        socket.broadcast.emit('mensaje', {
            body: mensaje,
            from: socket.id
        });
    })
} )
server.listen(PORT);
console.log('Servidor iniciado en el puerto', PORT );




