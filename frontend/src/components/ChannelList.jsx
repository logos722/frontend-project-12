import React from 'react';
import { useSelector } from 'react-redux';

import { selectors as ChannelSelectors } from '../slices/channelsSlice.js';

const ChannelList = () => {
  const channels = useSelector(ChannelSelectors.selectAll);

  return (
    <div className="channel-list">
      <h2>Channels</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>{channel.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelList;
