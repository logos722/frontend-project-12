import { loremIpsum } from 'lorem-ipsum';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка наличия токена в localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      // Если токена нет, перенаправляем пользователя на страницу входа
      navigate('/login');
    }
  }, []);

  return (
    <>
      <h3>Home page</h3>
      <div>
        Page content: {loremIpsum({ count: 5 })}
      </div>
    </>
  );
};

export default Home;
