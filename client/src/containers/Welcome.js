import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import Alert, { AlertHeading } from "react-bootstrap/Alert";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import useDataApi from "../hooks/useDataApi";
import ErrorContainer from "../components/error/ErrorContainer";
import "./Welcome.css";

function Welcome() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [timer, setTimer] = useState(60);
  const [user, setUser] = useState("");
  const [isCurrentUserSet, setIsCurrentUserSet] = useState(false);
  const [{ data, isLoading, isError }, doFetch] = useDataApi(null, []);

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

  const handleStart = () => {
    /*
     * Check that we have a current user logged in
     * Check that we have atleast one participant
     * If these pass we can start the session.
     * Add current user to the participant list
     * if not already on it.   Then start the session
     * and redirect to the session returned
     */
    if (!isCurrentUserSet) {
      setErrorMessage("First add your email address.");
      return;
    } else if (participants.length < 1) {
      setErrorMessage("Add at least one participant.");
      return;
    }

    let cloneParticipants = [...participants];
    if (!cloneParticipants.includes(user)) {
      cloneParticipants.push(user);
    }
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

  const addCurrentUser = () => {
    return (
      <Form onSubmit={submitCurrentUser}>
        <Form.Group controlId="formUsersEmail">
          <InputGroup>
            <InputGroup.Prepend>
              <Button variant="outline-primary" type="submit">
                Add
              </Button>
            </InputGroup.Prepend>
            <FormControl
              required
              type="email"
              name="user"
              value={user}
              placeholder="Current user's email"
              onChange={(event) => {
                setUser(event.target.value);
              }}
            />
          </InputGroup>
        </Form.Group>
      </Form>
    );
  };

  const displayCurrentUser = () => {
    return (
      <Alert variant="success">
        <Alert.Heading as="span" bsPrefix="alert-heading h5">
          Current User:{" "}
        </Alert.Heading>
        {user}
      </Alert>
    );
  };

  const submitCurrentUser = (event) => {
    event.preventDefault();
    setIsCurrentUserSet(true);
    doFetch(`/sessions/${user}`);
  };

  const displayActiveSessions = (activeSessions) => {
    return (
      <ListGroup>
        {activeSessions.map((session) => {
          return (
            <ListGroup.Item key={session.id}>
              <Link to={`/session/${session.id}/${session.email}`}>
                {session.id}
              </Link>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
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
      {errorMessage && <ErrorContainer errorMessage={errorMessage} />}
      <Container>
        <Row>
          <Col xs={5}>
            <Button variant="primary" size="lg" block onClick={handleStart}>
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
            Active Sessions:
            <p />
            {isLoading ? null : displayActiveSessions(data)}
          </Col>
          <Col xs={2}></Col>
          <Col xs={5}>
            {isCurrentUserSet ? displayCurrentUser() : addCurrentUser()}
            <p />
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
