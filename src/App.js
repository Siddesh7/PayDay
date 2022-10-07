import { WagmiConfig, createClient, useAccount } from "wagmi";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";

const alchemyId = process.env.REACT_APP_ALCHEMY;

const client = createClient(
  getDefaultClient({
    appName: "PayDay",
    alchemyId,
  })
);

// Make sure that this component is wrapped with ConnectKitProvider
const MyComponent = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>Connected Wallet: {address}</div>;
};
const App = () => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="retro">
        <ConnectKitButton />
        <MyComponent />
      </ConnectKitProvider>
    </WagmiConfig>
  );
};
export default App;
