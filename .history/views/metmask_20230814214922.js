import { ethers } from 'ethers';
const ethers = require(eth)
async function requestAccount() {

    console.log('Requesting account')

    if (window.ethereum) {
        console.log("MetaMask detected")

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const walletAddress = accounts[0];
            document.getElementById("address").innerHTML = walletAddress;
            console.log(walletAddress)

        } catch (error) {
            console.log("Error connecting", error);
        }

    } else {
        console.log("MetaMask not detected");
    }
}

async function ConnectWallet() {
    if (typeof window.ethereum !== "undefined") {
        await requestAccount();

        const provider = new ethers.providers.Web3Provider(window.ethereum)
    }
}