import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001');

export default socket;