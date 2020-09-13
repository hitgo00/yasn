import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import './styles.css';
import NavAppBar from '../components/NavAppBar/NavAppBar';

import { Router } from '@reach/router';
import HomePage from '../Pages/Home';
import { StoreProvider } from 'easy-peasy';

import ProfilePage from '../Pages/Profile';
import AddPostPage from '../Pages/AddPost';
import SignIn from '../Pages/SignIn';
import AddProfile from '../Pages/AddProfile';

import ChatApp from '../Pages/ChatApp';
import { store } from '../store';
import { ConnectServerUrl } from '../utils/constants';
import queryString from 'query-string';
import { Cookies, useCookies } from 'react-cookie';
import ProfileContext from '../components/ProfileContext';

const cookies = new Cookies();
function App() {
  const userCookie = cookies.get('userCookie');
  const userEmail = userCookie.Email;

  const [profile, setProfile] = useContext(ProfileContext);

  useEffect(() => {
    axios
      .get(
        `${ConnectServerUrl}/checkprofile?` +
          queryString.stringify({ email: userEmail }, { withCredentials: true })
      )
      .then((res) => {
        cookies.set('userDetails', res.data[0]);
        if (!res.data) setProfile(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {profile ? (
          <>
            <NavAppBar>
              <StoreProvider store={store}>
                <Router>
                  <HomePage path="/" />
                  <HomePage path="/home/:tag" />
                  <ChatApp path="/chat" />
                  <ProfilePage path="/profile" />
                  <ProfilePage path="/:username" />
                  <AddPostPage path="/add" />
                  <SignIn path="/signin" />
                </Router>
              </StoreProvider>
            </NavAppBar>
          </>
        ) : (
          <AddProfile />
        )}
      </header>
    </div>
  );
}

export default App;
