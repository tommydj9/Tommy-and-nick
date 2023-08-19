import detectEthereumProvider from '@metamask/detect-provider';

// This returns the provider, or null if it wasn't detected.
const provider = await detectEthereumProvider();

if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    startApp(provider); // initialize your app
} else {
    console.log('Please install MetaMask!');
}

function startApp(provider) {
    // If the provider returned by detectEthereumProvider isn't the same as
    // window.ethereum, something is overwriting it – perhaps another wallet.
    if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
    }
    // Access the decentralized web!
}

const chainId = await window.ethereum.request({ method: 'eth_chainId' });

window.ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(chainId) {
    // We recommend reloading the page, unless you must do otherwise.
    window.location.reload();
}

const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
    getAccount();
});

// While awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can select to initiate the request.
// MetaMask rejects any additional requests while the first is still
// pending.
async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
    const account = accounts[0];
    showAccount.innerHTML = account;
}


let currentAccount = null;
window.ethereum.request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts returns an empty array.
        console.error(err);
    });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
window.ethereum.on('accountsChanged', handleAccountsChanged);

// eth_accounts always returns an array.
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts.
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        // Reload your interface with accounts[0].
        currentAccount = accounts[0];
        // Update the account displayed (see the HTML for the connect button)
        showAccount.innerHTML = currentAccount;
    }
}