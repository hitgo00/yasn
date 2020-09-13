import React, { useEffect, useCallback, useState } from 'react';
import './styles.scss';
import openSocket from 'socket.io-client';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import queryString from 'query-string';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { serverUrl } from '../../utils/constants';

const Starter = () => {
  const url = 'Da-Connect';
  const [loading, setLoading] = useState(false);
  const { setChat, setMessageData, setSocket, setNickname } = useStoreActions(
    (actions) => actions
  );
  const nickname = useStoreState((state) => state.nickname);
  const login = useCallback((username) => {
    let socket = openSocket(serverUrl);

    if (socket) {
      setSocket(socket);
      socket.on('connection');
      socket.emit('add_user', {
        username,
        website: url,
      });
      setNickname(username);

      axios
        .get(
          `${serverUrl}/login?` +
            queryString.stringify({ website: 'Da-Connect' })
        )
        .then((res) => {
          setMessageData(res.data);
          setChat(true);
        })
        .catch((err) => console.log('Error:\n', err));
    }

    // return <p>loading..</p>;
  });

  useEffect(() => {
    if (nickname !== undefined) {
      login(nickname);
    }
  }, [login, nickname, setChat, setMessageData, setSocket, url]);

  return (
    <div className="Starter-wrapper">
      <div>
        <span className="title">ChatApp </span> <br />
        <sub>
          powered by{' '}
          <a
            target="_blank"
            href="https://github.com/darkraichat"
            rel="noopener noreferrer"
          >
            Darkrai
          </a>
        </sub>
      </div>
      <br />
      <br />
      <h2>Hey !</h2>
      <span>Start with what you want to be called</span>
      <br />

      <Formik
        onSubmit={async (values) => {
          setLoading(true);
          login(values.name);
        }}
        initialValues={{ name: '' }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="name"
              type="text"
              value={values.name}
              placeholder="Enter your name here!"
              onChange={handleChange}
              required
              className="darkrai-input"
            />
            <br />
            <br />
            <button className="darkrai-button" type="submit">
              Start
            </button>
          </Form>
        )}
      </Formik>
      <br />
      {loading ? <span>Darkrai Server down temporarily 😔</span> : null}
    </div>
  );
};

export default Starter;
