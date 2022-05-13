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
