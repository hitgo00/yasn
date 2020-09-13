import React from 'react';
import { useStoreState } from 'easy-peasy';

import Starter from '../../components/Starter';
import Chat from '../../components/Chat';
import './styles.scss';

const ChatApp = () => {
  const chat = useStoreState((state) => state.chat);
  const element = chat ? <Chat /> : <Starter />;

  return <div>{element}</div>;
};

export default ChatApp;
