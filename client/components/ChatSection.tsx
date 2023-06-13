import { useEffect, useRef, useState } from "react";
import { Button, Col, FormGroup, Input, InputGroup } from "reactstrap";
import EVENTS from "../constants/events";
import { useSockets } from "../context/socket";
import { Message } from "./Message";

export const ChatSection = () => {
  const { socket, messages, roomId, username, setMessages } = useSockets();
  const [newMessage, setNewMessage] = useState("");
  let enterKeyCount = 0;
  const messageEndRef = useRef(null);

  function handleSendMessage() {
    if (!String(newMessage).trim()) {
      return;
    }

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { roomId, message: newMessage, username });

    const date = new Date();
    const currentMessages = messages[roomId];
    currentMessages.push({
      username: "You",
      message: newMessage,
      time: `${date.toLocaleTimeString()}`,
    });
    setMessages({ ...messages, [roomId]: currentMessages });
    setNewMessage("");
    enterKeyCount = 0;
  }

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //it triggers by pressing the enter key
    const { key } = e as React.KeyboardEvent<HTMLInputElement>;
    if (key === "Enter" && !e.shiftKey && enterKeyCount == 0) {
      enterKeyCount = 1;
      handleSendMessage();
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!roomId) {
    return <Col sm="10" className="bg-light text-dark" />;
  }

  return (
    <Col sm="10" className="bg-light text-dark">
      {messages[roomId]?.map(({ message, username, time }, index) => (
        <Message key={index} message={message} username={username} time={time} />
      ))}
      <div ref={messageEndRef} style={{marginBottom:"80px"}}/>

      <FormGroup className="position-fixed bottom-0" style={{ width: "80%" }}>
        <InputGroup>
          <Input
            type="textarea"
            rows={1}
            placeholder="Tell us what you are thinking"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e)=>handleKeydown(e)}
          />
          <Button onClick={handleSendMessage}>SEND</Button>
        </InputGroup>
      </FormGroup>
    </Col>
  );
};
