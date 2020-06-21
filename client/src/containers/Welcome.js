import React, { useState } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import "./Welcome.css";

function Welcome() {
  const [participants, setParticipants] = useState([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [timer, setTimer] = useState(60);

  const addParticipant = (event) => {
    event.preventDefault();
    if (!participants.includes(email)) {
      const cloneParticipants = participants.concat(email);
      setParticipants(cloneParticipants);
      setEmail("");
      setEmailError(null);
      setEmailInvalid(false);
    } else {
      // Same email twice
      setEmailError(
        <Form.Control.Feedback type="invalid">
          Email already included in participants.
        </Form.Control.Feedback>
      );
      setEmailInvalid(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmailInvalid(false);
    setEmail(event.target.value);
  };

  const handleTimerChange = (event) => {
    setTimer(event.target.value);
  };

  const handleRemoveEmail = (email) => {
    if (participants.includes(email.value)) {
      const cloneParticipants = participants.filter(
        (value) => value !== email.value
      );
      setParticipants(cloneParticipants);
    }
  };

  const displayParticipantList = () => {
    return participants.map((value, index) => {
      return (
        <React.Fragment key={index}>
          <InputGroup key={value}>
            <FormControl
              readOnly
              type="email"
              name="removeEmail"
              value={value}
            />
            <InputGroup.Append>
              <Button
                variant="outline-secondary"
                type="submit"
                onClick={() => handleRemoveEmail({ value })}
              >
                Remove
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <p></p>
        </React.Fragment>
      );
    });
  };

  return (
    <>
      <Jumbotron>
        <Container>
          <Row>
            <Col md="auto">
              <Image src="PlanningPoker.png" />
            </Col>
            <Col md="auto">
              <h1>Welcome to Planning Poker</h1>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col xs={5}>
            <Button variant="primary" size="lg" block>
              START!
            </Button>
            <p />
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Timer: </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                aria-label="timer"
                value={timer}
                onChange={handleTimerChange}
              />
              <InputGroup.Append>
                <InputGroup.Text>in seconds</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs={2}></Col>
          <Col xs={5}>
            Participants:
            <p />
            <Form onSubmit={addParticipant}>
              <Form.Group controlId="formParticipantsEmail">
                <InputGroup>
                  <InputGroup.Prepend>
                    <Button variant="outline-primary" type="submit">
                      Add
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Participant's email"
                    onChange={handleEmailChange}
                    isInvalid={emailInvalid}
                  />
                  {emailError}
                </InputGroup>
              </Form.Group>
            </Form>
            {displayParticipantList()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Welcome;
