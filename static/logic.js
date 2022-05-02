//const appId = "ElUr7RZ9LgJNDvnDi02ajnrO49wS4vqi43wEdrPr"; // Application id from moralis.io
//const serverUrl = "https://qxsyq5mbz9gk.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "nipQFVGTqbv61vQjA7ZjakZIZM2kDbKegtQD7k1d"; // Testnet
const serverUrl = "https://yqiwoaj07xdh.usemoralis.com:2053/server"; // Testnet


//const nft_contract_address = "0xf9e50cF1967A759969b1454c9f99a3E7C45d6c88"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const test_contract_address = "0x111be21B4Cca9bA106c9033F3e19958D51342F11";
/*
Available deployed contracts
Ethereum Rinkeby 0x0Fb6EF3505b9c52Ed39595433a21aF9B5FCc4431
Polygon Mumbai 0x351bbee7C6E9268A1BF741B098448477E08A0a53
BSC Testnet 0x88624DD1c725C6A95E223170fa99ddB22E1C6DDD
*/
//initializeWeb3();


function handleMoralisError(err) {
    switch (err.code) {
      case Moralis.Error.INVALID_SESSION_TOKEN:
        Moralis.User.logOut();
        // If web browser, render a log in screen
        // If Express.js, redirect the user to the log in route
        break;
  
      // Other Moralis API errors that you want to explicitly handle
    }
  }

prtTotalSupply();
document.getElementById("getWallet").onclick = connectWallet;
document.getElementById("logOut").onclick = logOut;

const web3 = new Web3(window.ethereum);




//Step 1 Initialize Web3
async function connectWallet() {
    let user = Moralis.User.current();
    if(!user) {
        user = await Moralis.authenticate({
            signingMessage: "Log in using Moralis"
        })
        .then(function (user){
            console.log("logged in: ", user);
            let ethAddress = user.get("ethAddress");
            document.getElementById("getWallet").textContent = `${ethAddress}`;
        })
        .catch(function (error) {
            console.log(error);
        });
    } else {
        let ethAddress = user.get("ethAddress");
        document.getElementById("getWallet").textContent = `${ethAddress}`;
    }
    Moralis.start({ appId, serverUrl });
}

async function logOut() {
    await Moralis.User.logOut();
    document.getElementById("getWallet").textContent = "Connect Wallet";
    console.log("logged out");
  }

//Step 2 Generate Character
async function getNftPicture() {
    const configId = await prtTotalSupply();
    //  const configArray = getRandomValues(); // Itt lesz egy array amibe van egy random szám, egy nagyobb random szám
    //  const characterIndex = (configArray[0] % 7) + 1; // itt megkapsz egy random számot, maximum akkorát ami a modulo után van, tehát most itt 7-est
    const charIndex = configId;

    if (charIndex == 333) {
        alert("All NFTs minted in the contract!");
    } else {
        try {
            const character = await mapNft(charIndex);
            const metadata = {
                name: character["Names"],
                image: character["URI"],
                seller_fee_basis_points: 750,
                fee_recipient: "0xde152f5fAF03ec67F7e0BC7970A2f6529DB64301",
            };
            const metadataFile = new Moralis.File("metadata.json", {
                base64: btoa(JSON.stringify(metadata)),
            });
            await metadataFile.saveIPFS();
            const metadataURI = metadataFile.ipfs();
            //    displayNFT(metadataURI);
            await mintNft(metadataURI).then(console.log);
        } catch (error) {
            console.log(error);
        }
    }
}

function getRandomValues() {
    let array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    console.log(array);
    return array;
}

async function mapNft(charIndex) {
    const images = await fetch("static/ipfsCollection.json");
    const ipfsUris = await images.json();
    const iNames = {
        1: "Gandalf the Grey",
        2: "Gandalf the Grey",
        3: "Gandalf the Grey",
        4: "Cattie",
        5: "Cattie",
    };
    return { Names: iNames[charIndex], URI: ipfsUris[charIndex] };
}

/*query.find().then(function() {
    // do stuff
    mintNft();
  }, function(err) {
    handleMoralisError(err);
  }); */

async function mintNft(metadataURI) { 

    var ABI = [
        {
            inputs: [
              {
                internalType: "string",
                name: "tokenURI",
                type: "string"
              }
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
          },
    ];
    const options = {
        contractAddress: test_contract_address,
        functionName: "mint",
        abi: ABI,
        params: { uri: metadataURI },
     //  msgValue: Moralis.Units.ETH(0.01),
    };
    let tx = await Moralis.executeFunction(options);
    return tx.wait(); 
}

   /*
  const encodedFunction = web3.eth.abi.encodeFunctionCall({
    name: "mintNft",
    type: "function",
    inputs: [{
      type: 'string',
      name: 'tokenURI',
      }]
  }, [_uri]);

  const transactionParameters = {
    to: nft_contract_address,
    from: ethereum.selectedAddress,
    data: encodedFunction,


  };
  const txt = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],

  });

  return txt */


async function prtTotalSupply() {
    await Moralis.start({
        serverUrl: "https://yqiwoaj07xdh.usemoralis.com:2053/server",
        appId: "nipQFVGTqbv61vQjA7ZjakZIZM2kDbKegtQD7k1d",
    }); 
    const ABI = [
        {
            inputs: [],
            name: "getTotalSupply",
            outputs: [
                {
                    internalType: "uint256",
                    name: "",
                    type: "uint256",
                },
            ],
            stateMutability: "view",
            type: "function",
            constant: true,
        },
    ];

    const options = {
        chain: "rinkeby",
        address: test_contract_address, // Ezt át kell írni minden deployment után
        function_name: "getTotalSupply",
        abi: ABI,
        //   params: { owner: "0x1...2", spender: "0x1...2" },
    };
    const allowance = await Moralis.Web3API.native.runContractFunction(options);
    document.getElementById("totalSupply").innerHTML = `<div>${
        allowance -1 
    } / 333 Nft minted</div>`;
    console.log("Next Id that is going to be minted is: " + allowance);
    return allowance;
} 
