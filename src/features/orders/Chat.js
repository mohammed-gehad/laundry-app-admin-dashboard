import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ordersSelector, sendMessageToCustomer } from "./ordersSlice";
import { Form, Button } from "react-bootstrap";

export default function Chat({ id }) {
  const messages = useSelector((state) => ordersSelector.selectById(state, id))
    .chat;

  const [message, setMessage] = React.useState("");
  const dispatch = useDispatch();

  const renderMessages = () => {
    return messages.map((message, index) => {
      if (message.sender === "customer") {
        return (
          <p style={{ textAlign: "left" }} key={index.toString()}>
            client:{message.message}
          </p>
        );
      }
      if (message.sender === "admin") {
        return (
          <p style={{ textAlign: "right" }} key={index.toString()}>
            {message.message}:you
          </p>
        );
      }
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(
      sendMessageToCustomer({ id, message: { sender: "admin", message } })
    );
  };
  return (
    <div style={{ height: "500px", overflowY: "scroll" }}>
      <Form onSubmit={submit}>
        <Form.Control
          type="text"
          placeholder="message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <br />
        <Button variant="primary" type="submit">
          send
        </Button>
      </Form>
      {renderMessages()}
    </div>
  );
}
