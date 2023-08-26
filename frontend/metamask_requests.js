
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

        } catch (error) {
            console.log("Error connecting", error);
        }

    } else {
        console.log("MetaMask not detected");
    }
}

