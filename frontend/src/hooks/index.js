import { useContext } from 'react';

import { SocketContext, AuthContext } from '../context/index.js';

export const useAuth = () => useContext(AuthContext);

export const useApi = () => useContext(SocketContext);
