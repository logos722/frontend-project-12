import React from 'react';

const ChatBox = () => {
    const eblo = 1;
    return (
        <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                    <b>
                        {`# ${channel?.name}`}
                    </b>
                </p>
                <span className="text-muted">
                    {`${messages.length} ${t('chat.messageCount', { count: messages.length })}`}
                </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5 ">
                {messages.map(({ id, username, body }) => (
                    <Message
                        key={id}
                        username={username}
                        body={body}
                    />
                ))}
            </div>
            <div className="mt-auto px-5 py-3">
                <NewMessageForm channel={channel} />
            </div>
        </div>
    );
};

export default ChatBox;
