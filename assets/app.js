// AICON — wallet connect only (Reown AppKit, vanilla JS via ESM CDN, no bundler required)
//
// SETUP REQUIRED BEFORE THIS WORKS:
// 1. Create a free project at https://dashboard.reown.com
// 2. Add this site's domain (and localhost for testing) to that project's allowed origins
// 3. Paste the Project ID below, replacing 'YOUR_REOWN_PROJECT_ID'
//
// Without a real Project ID the modal will render but connections will fail —
// Reown's demo IDs only work on localhost.

import { createAppKit } from 'https://esm.sh/@reown/appkit@1.7.0?bundle';
import { EthersAdapter } from 'https://esm.sh/@reown/appkit-adapter-ethers@1.7.0?bundle';

const PROJECT_ID = '9294a4f6c6b5683cb27499c339368964';

const robinhoodChain = {
  id: 4663,
  caipNetworkId: 'eip155:4663',
  chainNamespace: 'eip155',
  name: 'Robinhood Chain',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.mainnet.chain.robinhood.com'] }
  },
  blockExplorers: {
    default: { name: 'Blockscout', url: 'https://robinhoodchain.blockscout.com' }
  }
};

const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [robinhoodChain],
  defaultNetwork: robinhoodChain,
  projectId: PROJECT_ID,
  metadata: {
    name: 'AICON',
    description: 'Non-custodial swap router on Robinhood Chain',
    url: window.location.origin,
    icons: [new URL('logo.svg', window.location.href).href]
  },
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#CCFF00',
    '--w3m-border-radius-master': '0px',
    '--w3m-font-family': "'Space Grotesk', sans-serif"
  },
  features: {
    analytics: false,
    swaps: false,
    onramp: false,
    email: false,
    socials: false
  }
});

const networkRow = document.getElementById('network-row');
const wrongNetworkNotice = document.getElementById('wrong-network');

function renderAccountState(account) {
  const connected = !!account?.isConnected;
  networkRow.hidden = !connected;
  if (!connected) {
    wrongNetworkNotice.hidden = true;
  }
}

function renderNetworkState(state) {
  if (!state?.caipNetwork) return;
  const onRobinhood = state.caipNetwork.id === robinhoodChain.caipNetworkId
    || state.caipNetwork.id === robinhoodChain.id;
  wrongNetworkNotice.hidden = onRobinhood;
}

if (PROJECT_ID === 'YOUR_REOWN_PROJECT_ID') {
  const slot = document.getElementById('connect-slot');
  const notice = document.createElement('p');
  notice.className = 'setup-notice';
  notice.textContent = 'Wallet connect needs a Reown Project ID — add yours in assets/app.js to activate this button.';
  slot.appendChild(notice);
}

modal.subscribeAccount(renderAccountState);
modal.subscribeNetwork(renderNetworkState);
