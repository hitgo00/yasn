import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { useStoreState, useStoreActions } from 'easy-peasy';

import './Chat.scss';

const Message = ({ by, content, user }) => (
  <span
    style={{
      padding: 4,
      color: user ? 'cyan' : 'white',
    }}
  >
    <b>{by}:</b> {content}
  </span>
);

Message.propTypes = {
  by: PropTypes.string,
  content: PropTypes.string,
  user: PropTypes.bool,
};

const Chat = () => {
  const [height, setHeight] = useState(window.innerHeight - 200);
  const { messageData, socket, nickname } = useStoreState((state) => state);
  const setMessageData = useStoreActions((actions) => actions.setMessageData);
  const messages = messageData || [];
  const messageList = useRef(null);

  const scrollToBottom = () => {
    messageList.current.scrollIntoView(false);
  };

  //Scroll to bottom on initial load
  useEffect(() => {
    scrollToBottom();
  }, []);

  // Recieve effect
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageData([...messages, data]);
    });
  }, [messageData, messages, setMessageData, socket]);

  // Delete effect
  useEffect(() => {
    socket.on('delete_message', (data) => {
      const temp = messages.filter((item) => item.message !== data.message);
      setMessageData(temp);
    });
  }, [messageData, messages, setMessageData, socket]);

  return (
    <div className="Chat-wrapper">
      <div>
        <span className="title">ChatApp </span>
        <br />
        <sub>powered by Darkrai</sub>
      </div>
      <br />
      <div ref={messageList} className="message-list">
        {messages.map((c, i) => {
          if (nickname === c.username)
            return <Message key={i} by={c.username} content={c.message} user />;
          return <Message key={i} by={c.username} content={c.message} />;
        })}
      </div>
      <div className="send-form">
        <Formik
          initialValues={{
            message: '',
          }}
          onSubmit={(values, actions) => {
            socket.emit('send_message', {
              message: values.message,
            });
            actions.resetForm();
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                type="text"
                name="message"
                onChange={handleChange}
                value={values.message}
                style={{ marginRight: 10 }}
                placeholder="Type here"
                required
                className="darkrai-input"
              />
              <button className="darkrai-button" type="submit">
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Chat;
