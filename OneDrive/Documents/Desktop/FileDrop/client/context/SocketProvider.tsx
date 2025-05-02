"use client";
import { customAlphabet, nanoid } from "nanoid";
import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useEffect
} from "react";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client/debug";

const SocketContext = createContext<any>({});

export const useSocket = () => {
  const socket: {
    socket: Socket;
    userId: any;
    SocketId: any;
    setSocketId: any;
    peerState: any;
    setpeerState: any;
  } = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [peerState, setpeerState] = useState<any>();
  const [SocketId, setSocketId] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");
  
  // Initialize socket and userId only on client-side to avoid hydration mismatch
  useEffect(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "http://localhost:8000";
    console.log("Connecting to socket server:", serverUrl);
    const socketInstance = io(serverUrl);
    setSocket(socketInstance);
    
    // Generate userId on client-side only
    const id = nanoid(10);
    setUserId(id);
    setSocketId(socketInstance);
  }, []);
  
  const contextValue = useMemo(() => {
    return { socket, userId, SocketId, setSocketId, peerState, setpeerState };
  }, [socket, userId, SocketId, peerState]);
  
  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
