/**
 * Socket.io client instance
 *
 * The socket is created once and does NOT connect automatically.
 * Call `socket.connect()` after the user logs in (see hooks/useSocket.js).
 */
import { io } from 'socket.io-client';

import { SOCKET_URL } from '../constants/api.constants';

const socket = io(SOCKET_URL, { autoConnect: false });

export default socket;
