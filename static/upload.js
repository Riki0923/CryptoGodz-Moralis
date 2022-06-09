Moralis.initialize("WEnQ8Jwbf2BUYrEyHjojwr16z5HlG7F1ldh6wYY1"); // Application id from moralis.io
Moralis.serverURL = "https://c5wwdbkka83e.usemoralis.com:2053/server"; //Server url from moralis.io
Moralis.authenticate()

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