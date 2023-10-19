import React, { useEffect, useRef } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Channels from './Channels.jsx';
import Messages from './Messages/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import { actions } from '../slices/index.js';

const MainPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const messagesInfo = useSelector((s) => s.messagesInfo);

  useEffect(() => {
    const getData = async () => {
      const header = { Authorization: `Bearer ${auth.user.token}` };
      dispatch(actions.getData(header)).catch((err) => {
        console.log('err', err);
        auth.logOut();
      });
    };

    getData();
    console.log('useSelector', channelsInfo, messagesInfo);
  }, [auth, dispatch]);

  if (channelsInfo.loading) {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <h1>loading</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
