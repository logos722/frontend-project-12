import { useTranslation } from 'react-i18next';

const NF = () => {
  const { t } = useTranslation();
  return (
    <>
      <h1>{t('notFound.header')}</h1>
      <p>{t('notFound.message')}</p>
    </>
  );
};

export default NF;
