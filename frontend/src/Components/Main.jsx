import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';
import { actions } from '../slices/index.js';

const MainPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const channelsInfo = useSelector((s) => s.channelsInfo);

  useEffect(() => {
    const a = async () => {
      const header = { Authorization: `Bearer ${auth.user.token}` };
      dispatch(actions.getData(header)).catch((err) => {
        console.log('err', err);
        auth.logOut();
      });
    };
    a();

    console.log('useSelector', channelsInfo);
  });
  return (
    <>
      ZXC LORD
    </>
  );
};

export default MainPage;
