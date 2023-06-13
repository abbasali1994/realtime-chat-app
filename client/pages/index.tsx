import { useState } from "react";
import { Button, Card, CardTitle, Col, Input, InputGroup, Row } from "reactstrap";

export default function Home() {
  const [userName, setUserName] = useState("");

  return !username ? (
    <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Col sm="6">
        <Card body>
          <CardTitle tag="h5">Enter Session</CardTitle>
          <InputGroup>
            <Input placeholder="Username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Button onClick={handleSetUsername}>START</Button>
          </InputGroup>
        </Card>
      </Col>
    </Row>
  ) : (
    <Row className="m-0" style={{ minHeight: "100vh" }}>
    </Row>
  );
}
