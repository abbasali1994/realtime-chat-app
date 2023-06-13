import { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../constants/default";
import EVENTS from "../constants/events";

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages?: { [roomId: string]: { message: string; time: string; username: string }[] };
  setMessages: Function;
  roomId?: string;
  rooms: object;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<Context>({
  socket,
  setUsername: () => false,
  setMessages: () => false,
  rooms: {},
  messages: {},
});

function SocketsProvider(props: any) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat application";
    };
  }, []);

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
    setRoomId(value);
    if (!messages[value]) setMessages({ ...messages, [value]: [] });
  });

  socket.on(EVENTS.SERVER.ROOMS, (value) => {
    setRooms(value);
    for (const room in value) {
      if (!messages[room]) messages[room] = [];
    }
    setMessages({ ...messages });
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ roomId, message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "Recieved New message...";
      }

      setMessages((messages) => ({ ...messages, [roomId]: [...messages[roomId], { message, username, time }] }));
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        username,
        setUsername,
        rooms,
        roomId,
        messages,
        setMessages,
      }}
      {...props}
    />
  );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
