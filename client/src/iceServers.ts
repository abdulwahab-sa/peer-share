const username = import.meta.env.VITE_ICE_SERVER_USERNAME;
const credential = import.meta.env.VITE_ICE_SERVER_CREDENTIAL;

export const iceServer = {
	iceServers: [
		{
			urls: 'stun:stun.relay.metered.ca:80',
		},
		{
			urls: 'turn:global.relay.metered.ca:80',
			username,
			credential,
		},
		{
			urls: 'turn:global.relay.metered.ca:80?transport=tcp',
			username,
			credential,
		},
		{
			urls: 'turn:global.relay.metered.ca:443',
			username,
			credential,
		},
		{
			urls: 'turns:global.relay.metered.ca:443?transport=tcp',
			username,
			credential,
		},
	],
};
