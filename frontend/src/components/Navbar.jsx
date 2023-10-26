import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import routes from '../routes.js';

const Navbar = () => {
  const { user, logOut } = useAuth();

  const { t } = useTranslation();
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to={routes.chatPagePath()}>{t('hexletChat')}</BootstrapNavbar.Brand>
        {!!user && <Button onClick={logOut}>{t('logout')}</Button>}
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
