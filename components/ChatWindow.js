import React from "react";
import { Channel, Window, ChannelHeader, MessageList, MessageInput, Thread } from "stream-chat-react";

export default function ChatWindow({ channel, selectedUser }) {
  return (
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <div className="welcome-message">
          <p>
            Bienvenue <strong>{selectedUser.name}</strong> dans le canal <strong>{channel.data.name}</strong>!
          </p>
        </div>
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  );
}
