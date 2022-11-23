<<<<<<< HEAD
// const appId = "WEnQ8Jwbf2BUYrEyHjojwr16z5HlG7F1ldh6wYY1"; // MAINNET
// const serverUrl = "https://c5wwdbkka83e.usemoralis.com:2053/server"; //MAINNET
const appId = "59Ly5P8lU4zEIccGbR9wS1V7k6GU5vmWizxPmTCW"; // Rinkeby Testnet
const serverUrl = "https://detbyyesfssy.usemoralis.com:2053/server"; // Rinkeby Testnet

const nft_contract_address = "0x4dc0a04196a3b6cE88998e1f592EdaB3b0Ff06e9";

const nft_contract_address = "0x2a84DC0793af04830cc43740965342385e999a79";

// new mainnet contract: 0xad4fe34A032549C0E8C98eFc9B572C7F1b8aA9FE  

// Itt ki van mintelve minden teszten: 0x7418172A8AA0587cF20bBF38CE18eCcd7401cBcd

initMoralis();
// prtTotalSupply();

// const web3 = new Web3(window.ethereum);

=======
//const appId = "ElUr7RZ9LgJNDvnDi02ajnrO49wS4vqi43wEdrPr"; // Application id from moralis.io
//const serverUrl = "https://qxsyq5mbz9gk.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "nipQFVGTqbv61vQjA7ZjakZIZM2kDbKegtQD7k1d"; // Testnet
const serverUrl = "https://yqiwoaj07xdh.usemoralis.com:2053/server"; // Testnet

//const nft_contract_address = "0x8e937fAE28652749c5c44a0Ab9ba90bCF73B60ab"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const test_contract_address = "0x0b479E40f49779d2953655dEEEC660F4267F25B7";

initMoralis();
prtTotalSupply();

// const web3 = new Web3(window.ethereum);

>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
async function initMoralis() {
    await Moralis.start({ serverUrl, appId });
    await Moralis.enableWeb3();
}

//Step 1 Initialize Web3
async function connectWallet() {
    let user = Moralis.User.current();

    if (!user) {
        try {
            user = await Moralis.authenticate({
                signingMessage: "Log in using Moralis",
            });
            let ethAddress = user.get("ethAddress");
            document.getElementById("getWallet").textContent = `${ethAddress}`;
        } catch (error) {
            console.log(error);
        }
    } else {
        let ethAddress = user.get("ethAddress");
        document.getElementById("getWallet").textContent = `${ethAddress}`;
    }
}

async function logOut() {
    await Moralis.User.logOut();
    document.getElementById("getWallet").textContent = "Connect Wallet";
    console.log("logged out");
}

//Step 2 Generate Character
async function getNftPicture() {
    for(i = 46; i < 47; i++){
        const configId = i;
        //  const configArray = getRandomValues(); // Itt lesz egy array amibe van egy random szám, egy nagyobb random szám
        //  const characterIndex = (configArray[0] % 7) + 1; // itt megkapsz egy random számot, maximum akkorát ami a modulo után van, tehát most itt 7-est
        const charIndex = configId;
        if (charIndex > 1000) {
            alert("All NFTs minted in the contract!");
        } else {
            try {
                const character = await mapNft(charIndex);
                const metadata = {
                    name: character["Names"],
                    image: character["URI"],
                    seller_fee_basis_points: 750,
                    fee_recipient: "0xb0073A64D1424fF800262814Fd65E29AeceF5A46",
                };
                const metadataFile = new Moralis.File("metadata.json", {
                    base64: btoa(JSON.stringify(metadata)),
                });
                await metadataFile.saveIPFS();
                // console.log(metadataFile);
                const metadataURI = metadataFile.ipfs();
                // console.log(metadataURI);
                //    displayNFT(metadataURI);
                //await batchMint(metadataURI).then(console.log);
                //await mintChosen(metadataURI).then(console.log);
                await mintNft(metadataURI).then(console.log);
            } catch (error) {
                console.log(error);
        }
    }
}

<<<<<<< HEAD
}

async function getNftPicture2() {
        //  const configArray = getRandomValues(); // Itt lesz egy array amibe van egy random szám, egy nagyobb random szám
        //  const characterIndex = (configArray[0] % 7) + 1; // itt megkapsz egy random számot, maximum akkorát ami a modulo után van, tehát most itt 7-est
        const charIndex = document.getElementById("chosen").value;
        //console.log(charIndex);
    
        if (charIndex > 1000) {
            alert("All NFTs minted in the contract!");
        } else {
            try {
                const character = await mapNft(charIndex);
    
                const metadata = {
                    name: character["Names"],
                    image: character["URI"],
                    seller_fee_basis_points: 750,
                    fee_recipient: "0xb0073A64D1424fF800262814Fd65E29AeceF5A46",
                };
                const metadataFile = new Moralis.File("metadata.json", {
                    base64: btoa(JSON.stringify(metadata)),
                });
                await metadataFile.saveIPFS();
                const metadataURI = metadataFile.ipfs();
                console.log(metadataURI);
                //    displayNFT(metadataURI);
                await mintChosen(metadataURI).then(console.log);
                //await mintChosen(metadataURI).then(console.log);
                // await mintNft(metadataURI).then(console.log);
            } catch (error) {
                console.log(error);
            }
=======
    if (charIndex == 222) {
        alert("All NFTs minted in the contract!");
    } else {
        try {
            const character = await mapNft(charIndex);
            const metadata = {
                name: character["Names"],
                image: character["URI"],
                seller_fee_basis_points: 750,
                fee_recipient: "0xb0073A64D1424fF800262814Fd65E29AeceF5A46",
            };
            const metadataFile = new Moralis.File("metadata.json", {
                base64: btoa(JSON.stringify(metadata)),
            });
            await metadataFile.saveIPFS();
            const metadataURI = metadataFile.ipfs();
            //console.log(metadataURI);
            //    displayNFT(metadataURI);
            await mintNft(metadataURI).then(console.log);
        } catch (error) {
            console.log(error);
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
        }
}

// async function getAllMetadata(){
//     for(i = 1; i < 41; i++){
//         const charIndex = i;
//         const character = await mapNft(charIndex);
//         const metadata = {
//             name: character["Names"],
//             image: character["URI"],
//             seller_fee_basis_points: 750,
//             fee_recipient: "0xb0073A64D1424fF800262814Fd65E29AeceF5A46",
//         };
//         const metadataFile = new Moralis.File("metadata.json", {
//             base64: btoa(JSON.stringify(metadata)),
//         });
//         await metadataFile.saveIPFS();
//         console.log(metadataFile._ipfs);
//         const metadataURI = metadataFile.ipfs();
//         //console.log(metadataURI);
//     }

// }


async function mapNft(charIndex) {
    const images = await fetch("static/ipfsCollection.json");
    const ipfsUris = await images.json();
    const iNames = {
        1: "Adroa",
        2: "Agyo",
        3: "Ah Puch",
        4: "Ahti",
        5: "Ahura Mazda",
        6: "Aine",
        7: "Akna",
        8: "Akras",
        9: "Akuanduba",
        10: "Aligank",
        11: "Altjira",
        12: "Amaterasu",
        13: "Amatsu Mikabosshi",
        14: "Ammun",
        15: "Anahit",
        16: "Anguta",
        17: "Antu",
        18: "Anubis",
        19: "Anuti",
        20: "Apedemak",
        21: "Apep",
        22: "Aphrodite",
        23: "Apollo",
        24: "Ares",
        25: "Asclepius",
        26: "Asena",
        27: "Ash",
        28: "Astghik",
        29: "Aten",
        30: "Athena",
        31: "Babi",
        32: "Baldur",
        33: "Bat",
        34: "Belobong",
        35: "Bishamon",
        36: "Bixia",
        37: "Boreas",
        38: "Bragi",
        39: "Buluku",
        40: "Bumba",
        41: "Cabracan",
        42: "Caer",
        43: "Chac",
        44: "Coi Coi Vilu",
        45: "Cybelle",
        46: "Damballa",
        47: "Denwin",
        48: "Diana",
        49: "Dolos",
        50: "Enlil",
        51: "Eros",
        52: "Forseti",
        53: "Frigg",
        54: "Fufluns",
        55: "Fujin",
        56: "Furrina",
        57: "Gengen Wer",
        58: "Gilgamesh",
        59: "Glooskap",
        60: "Hades",
        61: "Hapi",
        62: "Hathor",
        63: "Haurun",
        64: "Hedetet",
        65: "Heimdall",
        66: "Heka",
        67: "Hela",
<<<<<<< HEAD
        68: "Helios",
=======
        68: "Heilos",
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
        69: "Hera",
        70: "Hermes",
        71: "Heryshaf",
        72: "Hoderi",
        73: "Hodiak",
        74: "Horus",
        75: "Hotei",
        76: "Huitzilopochtli",
        77: "Hurracan",
        78: "Hypons",
        79: "Icarus",
        80: "Ilmarinen",
        81: "Inari",
        82: "Inti",
        83: "Ishara",
        84: "Ishtar",
        85: "Isis",
        86: "Ixchel",
        87: "Izanagi",
        88: "Izanami",
        89: "Jizo",
        90: "Julunggul",
        91: "Juno",
        92: "Jupiter",
        93: "Kaggen",
        94: "Kamapuaa",
        95: "Kanaloa",
        96: "Kane",
        97: "Kannon",
        98: "Kauriraris",
        99: "Keto",
        100: "Khnum",
        101: "Khonsu",
<<<<<<< HEAD
        102: "Kingu",
=======
        102: "Kinghu",
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
        103: "Kinich Ahau",
        104: "Koyash",
        105: "Kratos",
        106: "Lada",
        107: "Laka",
        108: "Legba",
        109: "Lei Gong",
        110: "Leno",
        111: "Lilinoe",
        112: "Loki",
        113: "Longwang",
        114: "Mafuie",
        115: "Marduk",
        116: "Marmoo",
        117: "Mars",
        118: "Mbombu",
        119: "Mebege",
        120: "Mictlantecuhtli",
        121: "Min",
        122: "Minerva",
        123: "Mixcoatl",
        124: "Mokosh",
        125: "Montu",
        126: "Morpheus",
        127: "Na Maka Kaha",
        128: "Nanabozho",
        129: "Nannar",
        130: "Nemesis",
        131: "Nephthys",
        132: "Neptune",
        133: "Nike",
        134: "Nikkiri",
        135: "Ninhursag",
        136: "Ninigi",
        137: "Ninlil",
        138: "Ninsun",
        139: "Nojir",
        140: "Obatala",
        141: "Odin",
        142: "Ogo",
        143: "Ogun",
        144: "Okuninushi",
        145: "Osiris",
        146: "Ozomalti",
        147: "Pangu",
        148: "Papatuanuku",
        149: "Pele",
        150: "Perun",
        151: "Pluto",
        152: "Poseidon",
        153: "Prometheus",
        154: "Ptah",
        155: "Ra",
        156: "Raginui",
        157: "Renenutet",
        158: "Ruti",
        159: "Sah",
        160: "Saturn",
        161: "Saxnot",
        162: "Sedna",
        163: "Sekhmet",
        164: "Sepa",
        165: "Seshat",
        166: "Set",
        167: "Shango",
        168: "Shezmu",
        169: "Shiva",
        170: "Sif",
        171: "Sobek",
        172: "Supay",
        173: "Surma",
        174: "Susanoo",
        175: "Svarog",
        176: "Tagaloa",
        177: "Tapio",
        178: "Tara",
        179: "Tawaret",
        180: "Tengu",
        181: "Tezcatlipoca",
        182: "Thanatos",
        183: "Themis",
        184: "Thor",
        185: "Thoronas",
        186: "Thoth",
        187: "Thunor",
        188: "Tiamat",
        189: "Tsukyomi",
        190: "Tuoni",
        191: "Tyr",
        192: "Uguo",
        193: "Ukko",
        194: "Ulgen",
        195: "Ullu",
        196: "Uni",
        197: "Uranus",
        198: "Usil",
        199: "Utu",
        200: "Vahagn",
        201: "Vaisravana",
        202: "Vajrapani",
        203: "Vammatar",
        204: "Veles",
        205: "Velle",
        206: "Venus",
        207: "Vesna",
        208: "Vesta",
        209: "Viracocha",
        210: "Votan",
        211: "Vulcan",
        212: "Wakan Tanka",
        213: "Wenenut",
        214: "Wepwawet",
        215: "Woden",
        216: "Xipe Totec",
        217: "Xochiquetzal",
        218: "Xolotl",
        219: "Yamir",
        220: "Yemaya",
        221: "Yum Kaax",
        222: "Zeus",
<<<<<<< HEAD
        223:"Adroa",
        224:"Agyo",
        225:"Ah Puch",
        226:"Ahti",
        227:"Ahura Mazda",
        228:"Aine",
        229:"Akna",
        230:"Akras",
        231:"Akuanduba",
        232:"Aligank",
        233:"Altjira",
        234:"Amaterasu",
        235:"Amatsu Mikabosshi",
        236:"Ammun",
        237:"Anahit",
        238:"Anguta",
        239:"Antu",
        240:"Anubis",
        241:"Anuti",
        242:"Apedemak",
        243:"Apep",
        244:"Aphrodite",
        245:"Apollo",
        246:"Ares",
        247:"Asclepius",
        248:"Asena",
        249:"Ash",
        250:"Astghik",
        251:"Aten",
        252:"Athena",
        253:"Babi",
        254:"Baldur",
        255:"Bat",
        256:"Belobong",
        257:"Bishamon",
        258:"Bixia",
        259:"Boreas",
        260:"Bragi",
        261:"Buluku",
        262:"Bumba",
        263:"Cabracan",
        264:"Caer",
        265:"Chac",
        266:"Coi Coi Vilu",
        267:"Cybelle",
        268:"Damballa",
        269:"Denwin",
        270:"Diana",
        271:"Dolos",
        272:"Enlil",
        273:"Eros",
        274:"Forseti",
        275:"Frigg",
        276:"Fufluns",
        277:"Fujin",
        278:"Furrina",
        279:"Gengen Wer",
        280:"Gilgamesh",
        281:"Glooskap",
        282:"Hades",
        283:"Hapi",
        284:"Hathor",
        285:"Haurun",
        286:"Hedetet",
        287:"Heimdall",
        288:"Heka",
        289:"Hela",
        290:"Helios",
        291:"Hera",
        292:"Hermes",
        293:"Heryshaf",
        294:"Hoderi",
        295:"Hodiak",
        296:"Horus",
        297:"Hotei",
        298:"Huitzilopochtli",
        299:"Hurracan",
        300:"Hypons",
        301:"Icarus",
        302:"Ilmarinen",
        303:"Inari",
        304:"Inti",
        305:"Ishara",
        306:"Ishtar",
        307:"Isis",
        308:"Ixchel",
        309:"Izanagi",
        310:"Izanami",
        311:"Jizo",
        312:"Julunggul",
        313:"Juno",
        314:"Jupiter",
        315:"Kaggen",
        316:"Kamapuaa",
        317:"Kanaloa",
        318:"Kane",
        319:"Kannon",
        320:"Kauriraris",
        321:"Keto",
        322:"Khnum",
        323:"Khonsu",
        324:"Kingu",
        325:"Kinich Ahau",
        326:"Koyash",
        327:"Kratos",
        328:"Lada",
        329:"Laka",
        330:"Legba",
        331:"Lei Gong",
        332:"Leno",
        333:"Lilinoe",
        334:"Loki",
        335:"Longwang",
        336:"Mafuie",
        337:"Marduk",
        338:"Marmoo",
        339:"Mars",
        340:"Mbombu",
        341:"Mebege",
        342:"Mictlantecuhtli",
        343:"Min",
        344:"Minerva",
        345:"Mixcoatl",
        346:"Mokosh",
        347:"Montu",
        348:"Morpheus",
        349:"Na Maka Kaha",
        350:"Nanabozho",
        351:"Nannar",
        352:"Nemesis",
        353:"Nephthys",
        354:"Neptune",
        355:"Nike",
        356:"Nikkiri",
        357:"Ninhursag",
        358:"Ninigi",
        359:"Ninlil",
        360:"Ninsun",
        361:"Nojir",
        362:"Obatala",
        363:"Odin",
        364:"Ogo",
        365:"Ogun",
        366:"Okuninushi",
        367:"Osiris",
        368:"Ozomalti",
        369:"Pangu",
        370:"Papatuanuku",
        371:"Pele",
        372:"Perun",
        373:"Pluto",
        374:"Poseidon",
        375:"Prometheus",
        376:"Ptah",
        377:"Ra",
        378:"Raginui",
        379:"Renenutet",
        380:"Ruti",
        381:"Sah",
        382:"Saturn",
        383:"Saxnot",
        384:"Sedna",
        385:"Sekhmet",
        386:"Sepa",
        387:"Seshat",
        388:"Set",
        389:"Shango",
        390:"Shezmu",
        391:"Shiva",
        392:"Sif",
        393:"Sobek",
        394:"Supay",
        395:"Surma",
        396:"Susanoo",
        397:"Svarog",
        398:"Tagaloa",
        399:"Tapio",
        400:"Tara",
        401:"Tawaret",
        402:"Tengu",
        403:"Tezcatlipoca",
        404:"Thanatos",
        405:"Themis",
        406:"Thor",
        407:"Thoronas",
        408:"Thoth",
        409:"Thunor",
        410:"Tiamat",
        411:"Tsukyomi",
        412:"Tuoni",
        413:"Tyr",
        414:"Uguo",
        415:"Ukko",
        416:"Ulgen",
        417:"Ullu",
        418:"Uni",
        419:"Uranus",
        420:"Usil",
        421:"Utu",
        422:"Vahagn",
        423:"Vaisravana",
        424:"Vajrapani",
        425:"Vammatar",
        426:"Veles",
        427:"Velle",
        428:"Venus",
        429:"Vesna",
        430:"Vesta",
        431:"Viracocha",
        432:"Votan",
        433:"Vulcan",
        434:"Wakan Tanka",
        435:"Wenenut",
        436:"Wepwawet",
        437:"Woden",
        438:"Xipe Totec",
        439:"Xochiquetzal",
        440:"Xolotl",
        441:"Yamir",
        442:"Yemaya",
        443:"Yum Kaax",
        444: "Zeus"
=======
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
    };
    return { Names: iNames[charIndex], URI: ipfsUris[charIndex] };
}

async function mintNft(metadataURI) {
<<<<<<< HEAD
    // THIS IS NEEDED FOR MAINNET ( ETH SENDING TO THE GNOSIS WALLET )
    // const options1 = {
    //     type: "native",
    //     receiver: "0xb0073A64D1424fF800262814Fd65E29AeceF5A46",
    //     amount: Moralis.Units.ETH(0.5),
    //     gasValue: 3000000
    // }
    // await Moralis.transfer(options1);
=======
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
    var ABI = [
        {
            inputs: [
                {
                    internalType: "string",
                    name: "URI",
<<<<<<< HEAD
                    type: "string"
                }
            ],
            name: "mint",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function"
=======
                    type: "string",
                },
            ],
            name: "mint",
            outputs: [],
            stateMutability: "payable",
            type: "function",
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
        },
    ];
    const options = {
        contractAddress: nft_contract_address,
        functionName: "mint",
        abi: ABI,
        params: { URI: metadataURI },
<<<<<<< HEAD
=======
        msgValue: Moralis.Units.ETH(0.355),
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
    };
    let tx = await Moralis.executeFunction(options);
    return tx.wait();
}

<<<<<<< HEAD

async function mintChosen(metadataURI){
    let chosenMintId = document.getElementById("chosen").value;
    console.log("chosen MintID is: ", chosenMintId)
    var ABI=[
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "URI",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "mintId",
                    "type": "uint256"
                }
            ],
            "name": "ownerMintbyId",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }];
    const options = {
        contractAddress: nft_contract_address,
        functionName: "ownerMintbyId",
        abi: ABI,
        params: { URI: metadataURI, mintId: chosenMintId}
    };

    let mintTranx = await Moralis.executeFunction(options);
    console.log(mintTranx);

}

=======
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

>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
async function prtTotalSupply() {
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
        chain:  "mainnet",
        address: nft_contract_address, 
        function_name: "getTotalSupply",
        abi: ABI,
    };
    const allowance = await Moralis.Web3API.native.runContractFunction(options);
    document.getElementById("totalSupply").innerHTML = `<div>${
        allowance - 1
    } / 222 Nft minted</div>`;
    console.log("Next Id that is going to be minted is: " + allowance);
<<<<<<< HEAD
    return allowance; 
=======
    return allowance;
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
}

document.getElementById("logOut").onclick = logOut;
document.getElementById("getWallet").onclick = connectWallet;
document.getElementById("getCharacter").onclick = getNftPicture;
<<<<<<< HEAD
document.getElementById("mintC").onclick = getNftPicture2;
//document.getElementById("metadata").onclick = getAllMetadata;
document.getElementById("batch").onclick = batchMint;
=======
>>>>>>> 7a11c052f52b2ec4a0a6961254d813b9a7ddfb4d
