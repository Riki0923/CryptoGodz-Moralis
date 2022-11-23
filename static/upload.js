const appId = "59Ly5P8lU4zEIccGbR9wS1V7k6GU5vmWizxPmTCW"; // This is testnet
const serverUrl = "https://detbyyesfssy.usemoralis.com:2053/server"; //This is testnet

initMoralis();

async function initMoralis() {
    await Moralis.start({ serverUrl, appId });
    await Moralis.enableWeb3();
}


async function upload() {
    const fileInput = document.getElementById("files");
    const ipfsUris = {};
    for (i = 0; i < fileInput.files.length; i++) {
        console.log(fileInput.files[i].name);
        let data = fileInput.files[i];
        let imageFile = new Moralis.File(data.name, data);
        await imageFile.saveIPFS();
        console.log(imageFile.ipfs(), imageFile.hash());
        ipfsUris[i + 1] = imageFile.ipfs();
    }
    console.log(ipfsUris);
}
