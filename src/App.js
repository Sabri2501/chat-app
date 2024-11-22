import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  LoadingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "./App.css";


const apikey = "vk6r3e6wk63f";

// Liste des utilisateurs avec des images et noms personnalisés
const users = [
  {
    id: "john",
    name: "Khadija",
    image: "https://getstream.imgix.net/images/random_svg/FS.png",
  },
  {
    id: "jane",
    name: "sara",
    image: "https://getstream.imgix.net/images/random_svg/FS.png",
  },
];

export default function App() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [selectedUser, setSelectedUser] = useState(users[0]);

  useEffect(() => {
    async function init() {
      // Créez une instance du client Stream Chat
      const chatClient = StreamChat.getInstance(apikey);

      // Connectez l'utilisateur sélectionné au client Stream Chat
      await chatClient.connectUser(
        selectedUser,
        chatClient.devToken(selectedUser.id)
      );

      // Créez un nouveau canal avec un nom personnalisé
      const newChannel = chatClient.channel("messaging", "chat-room", {
        image: "https://www.example.com/chat-room-image.png", // Image de votre canal
        name: "Chat Room - Discussion générale",
        members: [selectedUser.id], // Ajoutez l'utilisateur actuel au canal
      });

      // Rejoindre le canal
      await newChannel.watch();
      setChannel(newChannel);
      setClient(chatClient);
    }

    init();

    // Déconnecter l'utilisateur lors du changement d'utilisateur
    if (client) return () => client.disconnectUser();
  }, [selectedUser, client]);

  // Afficher un indicateur de chargement jusqu'à ce que le client et le canal soient chargés
  if (!channel || !client) return <LoadingIndicator />;

  return (
    <div>
      {/* Sélecteur pour changer d'utilisateur */}
    

      {/* Affichage du chat avec le canal sélectionné */}
      <Chat client={client} theme="messaging light">
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            {/* Message de bienvenue personnalisé */}
            <div className="welcome-message">
              <p>Bienvenue {selectedUser.name} dans le canal {channel.data.name}!</p>
            </div>
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
}