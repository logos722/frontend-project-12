import React from 'react';
// import Spinner from 'react-bootstrap/Spinner';
import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';
// import routes from '../routes.js';

const Home = () => {
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelList />
        </div>
        <div className="col p-0 h-100">
          <MessageList />
        </div>
      </div>
    </div>
  );
};

export default Home;
