import { Card, Col, Container, Row } from "reactstrap";

export const Message = ({ message, username, time }) => {
  const isSender = username == "You";
  return (
    <Row className={`m-2 ${isSender ? "justify-content-end" : "justify-content-start"}`}>
      <Col sm="5">
        <Card body>
          <Container>
            <h6 className={`mb-0 ${isSender ? "text-primary" : "text-danger"}`}>{username}</h6>
            {message}
            <p className="w-100 mb-0" style={{ textAlign: "end" }}>
              {time}
            </p>
          </Container>
        </Card>
      </Col>
    </Row>
  );
};
