import { SignalData } from 'simple-peer';
import { io, Socket } from 'socket.io-client';

export interface ClientToServerEvents {
	'join-room': (roomId: string) => void;
	'transmit-signal': (payload: {
		userToSignal: string | number;
		socketId: string;
		signal: SignalData;
	}) => Promise<void>;
	'returning-signal': (payload: { signal: SignalData; socketId: string }) => Promise<void>;
}

export interface ServerToClientEvents {
	'all-users': (users: string[]) => void;
	'user-joined': (userId: string | number) => void;
	'user-disconnected': (userId: string | number) => void;
	'peer-connected': (payload: { signal: SignalData; socketId: string }) => void;
	'receiving-returned-signal': (payload: { signal: SignalData; id: string }) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
	import.meta.env.VITE_API_URL,
	{
		autoConnect: false,
	}
);
