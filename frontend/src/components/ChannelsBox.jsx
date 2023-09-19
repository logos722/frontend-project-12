import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
// import { useTranslation } from 'react-i18next';

// import { actions, defaultChannelId } from '../slices/index.js';

const ChannelsBox = () => {
    useEffect(() => { }, []);

    return (
        <>
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('channels.channels')}</b>
                <Button
                    type="button"
                    variant="group-vertical"
                    className="p-0 text-primary"
                    onClick={handleAddChannel}
                >
                    <PlusSquare size={20} />
                    <span className="visually-hidden">+</span>
                </Button>
            </div>
            <ul
                id="channels-box"
                className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
            >
                {channels.map((channel) => (
                    <Channel
                        key={channel.id}
                        channel={channel}
                        isCurrent={channel.id === currentChannelId}
                        handleChoose={handleChooseChannel(channel.id)}
                        handleRemove={handleRemoveChannel}
                        handleRename={handleRenameChannel}
                    />
                ))}
            </ul>
        </>
    );
};

export default ChannelsBox;
