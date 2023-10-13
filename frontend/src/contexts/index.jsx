import { createContext } from 'react';

const AuthContext = createContext({});
const SocketContext = createContext(null);

export { AuthContext, SocketContext };
