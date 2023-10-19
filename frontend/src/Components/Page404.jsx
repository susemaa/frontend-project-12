import React from 'react';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();
  return (
    <>
      404
      {' '}
      {t('errors.404')}
    </>
  );
};

export default Page404;
