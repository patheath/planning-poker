import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

export default function ErrorContainer(props) {
  return (
    <Container className="container-center">
      <Row>
        <Col xs={12}>
          <Alert variant="danger">{props.errorMessage}</Alert>
        </Col>
      </Row>
    </Container>
  );
}
