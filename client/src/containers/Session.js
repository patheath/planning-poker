import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import axios from "axios";
import "./Session.css";

export default function Session() {
  const numbers = [0, 0.5, 1, 3, 5, 8, 13, 20, 40, 100];
  const { id, email } = useParams();

  const [ticket, setTicket] = useState("PPC-35555");
  const [estimate, setEstimate] = useState(null);
  const [round, setRound] = useState(1);

  console.log(ticket, round);

  const handleEstimate = (estimate) => {
    const urlPath = `/api/session/${id}`;
    const data = {
      email,
      id,
      estimate,
      ticket,
      round,
    };
    console.log(urlPath, data);

    axios.post(urlPath, data).then((response) => {
      // global errors handled elsewhere (e.g. 500) but undefined response comes back
      if (response) {
        console.log(response.data);
        if (response.data.errors.length === 0) {
          console.log("no errors");
        }
      }
      setEstimate(estimate);
    });
  };

  function displayButton(number) {
    return (
      <React.Fragment key={number}>
        <Button
          variant="primary"
          size="lg"
          active={false}
          onClick={() => handleEstimate(number)}
        >
          {number}
        </Button>{" "}
      </React.Fragment>
    );
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>Email: {email}</Col>
          <Col xs={3}></Col>
          <Col>Session ID: {id}</Col>
        </Row>
      </Container>
      <Jumbotron>
        <Container fluid>
          <Row>
            <Col>
              <h4>
                Jira Ticket: <a href="https://jira.wordstream.com">PPC-35555</a>
              </h4>
              <h5>Title: Blah, Blah Blah....</h5>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Results</Card.Title>
                  <Card.Text>Round: 1 Average: 5</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container className="container-center">
        {numbers.map((value) => displayButton(value))}
      </Container>
    </>
  );
}
