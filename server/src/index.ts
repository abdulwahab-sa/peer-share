import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server, Socket } from 'socket.io';
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());

const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

type KeyValueMap<T> = Record<string, T>;

type Users = KeyValueMap<string[]>;
type SocketToRoom = KeyValueMap<string>;

const users: Users = {};
const socketToRoom: SocketToRoom = {};

const PORT = process.env.PORT || 3005;

app.get('/', (req, res) => {
	res.send('Running');
});

io.on('connection', (socket: Socket) => {
	socket.on('join room', (roomID) => {
		if (users[roomID]) {
			users[roomID].push(socket.id);
		} else {
			users[roomID] = [socket.id];
		}
		socketToRoom[socket.id] = roomID;
		const otherUser = users[roomID].find((id) => id !== socket.id);
		if (otherUser) {
			socket.emit('other user', otherUser);
			socket.to(otherUser).emit('user joined', socket.id);
		}
		console.log('users', users);
	});

	socket.on('my-details', (payload) => {
		console.log('my-details ran', payload);
		const roomID = socketToRoom[socket.id];
		const otherUser = users[roomID].find((id) => id !== socket.id);
		if (otherUser) {
			socket.to(otherUser).emit('other-details', payload);
		}
	});

	socket.on('offer', (payload) => {
		io.to(payload.target).emit('offer', payload);
		console.log('offer made', payload);
	});

	socket.on('answer', (payload) => {
		io.to(payload.target).emit('answer', payload);
		console.log('answered', payload);
	});

	socket.on('ice-candidate', (incoming) => {
		io.to(incoming.target).emit('ice-candidate', incoming.candidate);
		console.log('ice');
	});

	socket.on('disconnect', () => {
		const roomID = socketToRoom[socket.id];
		let room = users[roomID];
		if (room) {
			room = room.filter((id) => id !== socket.id);
			users[roomID] = room;
			socket.broadcast.emit('user-left', socket.id);
		}
		console.log('user left' + socket.id);
		console.log('users', users);
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
