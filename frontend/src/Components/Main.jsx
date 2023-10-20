import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ImSpinner2 } from 'react-icons/im';
import Channels from './Channels.jsx';
import Messages from './Messages/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import { actions } from '../slices/index.js';

const MainPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const messagesInfo = useSelector((s) => s.messagesInfo);

  useEffect(() => {
    const getData = async () => {
      const header = { Authorization: `Bearer ${auth.user.token}` };
      dispatch(actions.getData(header)).catch((err) => {
        auth.logOut();
        if (err.isAxiosError) {
          toast.error(t('toast.networkError'));
          return;
        }
        toast.error(t('toast.unknownError'));
      });
    };

    getData();
    console.log('useSelector', channelsInfo, messagesInfo);
  }, [auth, dispatch]);

  if (channelsInfo.loading) {
    return (
      <div className="h-100 d-flex justify-content-center align-items-center spin">
        <ImSpinner2 />
        <span className="visually-hidden">{t('lodaing')}</span>
      </div>
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
