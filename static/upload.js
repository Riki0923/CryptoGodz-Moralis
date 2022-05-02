Moralis.initialize("ElUr7RZ9LgJNDvnDi02ajnrO49wS4vqi43wEdrPr"); // Application id from moralis.io
Moralis.serverURL = "https://qxsyq5mbz9gk.usemoralis.com:2053/server"; //Server url from moralis.io

//Moralis.authenticate()

async function upload(){
    const fileInput = document.getElementById("files");
    const ipfsUris = {}
    for (i=0;i< fileInput.files.length; i++){
        console.log(fileInput.files[i].name);
        let data = fileInput.files[i];
        let imageFile = new Moralis.File(data.name, data);
        await imageFile.saveIPFS();
        ipfsUris[i+1] = imageFile.ipfs();
    }
    console.log(ipfsUris);
}