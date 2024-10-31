import { v4 as uuidv4 } from 'uuid';

export const generateRoomId = () => {
	return crypto.randomUUID ? crypto.randomUUID() : uuidv4();
};
