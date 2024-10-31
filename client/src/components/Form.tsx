import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRoomId } from '../utils/roomIdGenerator';

const Form = () => {
	const [error, setError] = useState('');
	const [roomId, setRoomId] = useState<string | undefined>(undefined);
	const defaultIdLength = 36;
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (roomId?.length !== defaultIdLength) {
			setError('Please enter a valid room ID');
			return;
		}
		navigate(`/room?id=${roomId}`);
	};

	const handleNewRoomClick = () => {
		const newRoomId = generateRoomId();
		if (newRoomId) {
			navigate(`/room?id=${newRoomId}`);
		}
	};

	return (
		<div className="mx-auto mt-12 flex flex-col w-[300px] md:w-[550px] h-full px-8 py-6 bg-white shadow-2xl rounded-xl">
			<h2 className="text-xl font-medium text-center mb-2">Join a Room </h2>
			<form onSubmit={handleSubmit} className="bg-white space-y-4">
				<input
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					id="username"
					placeholder="Enter Room ID"
					type="text"
					value={roomId || ''}
					onChange={(e) => setRoomId(e.target.value || undefined)}
				/>

				{error && <p className="text-red-500 text-sm">{error}</p>}
				<input
					type="submit"
					disabled={!roomId || roomId.length !== defaultIdLength}
					value={'Join Room'}
					className={` w-full ${
						roomId?.length === defaultIdLength
							? 'bg-[#7752FE] hover:bg-[#5438b8] cursor-pointer'
							: 'bg-[#b3a9d6] cursor-not-allowed'
					}  placeholder:font-poppins placeholder:font-normal placeholder:text-sm text-white font-medium text-base p-2 rounded-md font-poppins`}
				/>
			</form>
			<h3 className="text-xl font-medium text-center my-3">OR</h3>
			<button
				onClick={handleNewRoomClick}
				className={` w-full bg-[#7752FE] hover:bg-[#5438b8] placeholder:font-poppins placeholder:font-normal placeholder:text-sm text-white font-medium text-base p-2 rounded-md font-poppins`}
			>
				Create a new room
			</button>
		</div>
	);
};

export default Form;
