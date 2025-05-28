// hooks/useSocket.js
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SOCKET_URL = "http://192.168.1.3:3000";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectSocket = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        
        if (token) {
          const parsedToken = JSON.parse(token);

          const newSocket = io(SOCKET_URL, {
            auth: {
              token: parsedToken,
            },
          });

          newSocket.on("connect", () => {
            console.log("Connected to Socket");
          });

          newSocket.on("connect_error", (err) => {
            console.error("Socket Connection Error:", err.message);
          });

          setSocket(newSocket);
        }
      } catch (error) {
        console.error("Error connecting to socket:", error.message);
      }
    };

    connectSocket();

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
