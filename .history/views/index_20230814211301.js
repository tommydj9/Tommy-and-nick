async function requestAccount() {
    console.log('Requesting account')

    if (window.ethereum) {
        console.log("detected")
    } else {
        console.log("metamask not detected")
    }

}