/* eslint-disable react/jsx-key */
import { useState } from "react";
import { Button, Col, Input, ListGroup } from "reactstrap";
import EVENTS from "../constants/events";
import { useSockets } from "../context/socket";

export const Sidebar = () => {
  const { socket, roomId, rooms } = useSockets();
  const [roomName, setRoomName] = useState("");

  function handleCreateRoom() {
    if (!String(roomName).trim()) return;
    // emit event - room created
    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName });
    setRoomName("");
  }

  function handleJoinRoom(key) {
    if (key === roomId) return;

    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <Col sm="2" className="bg-dark text-light">
      <div className="p-4 bg-dark text-light">
        <Input placeholder="Room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
        <Button color="success" block className="my-2" onClick={handleCreateRoom}>
          CREATE ROOM
        </Button>
        <ListGroup>
          {Object.keys(rooms).map((key) => {
            return (
              <Button
                color={key === roomId ? "primary" : "secondary"}
                className="m-2"
                onClick={() => handleJoinRoom(key)}>
                {rooms[key].name}
              </Button>
            );
          })}
        </ListGroup>
      </div>
    </Col>
  );
};
