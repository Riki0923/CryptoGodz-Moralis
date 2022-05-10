//const appId = "ElUr7RZ9LgJNDvnDi02ajnrO49wS4vqi43wEdrPr"; // Application id from moralis.io
//const serverUrl = "https://qxsyq5mbz9gk.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "nipQFVGTqbv61vQjA7ZjakZIZM2kDbKegtQD7k1d"; // Testnet
const serverUrl = "https://yqiwoaj07xdh.usemoralis.com:2053/server"; // Testnet
Moralis.enableWeb3();


//const nft_contract_address = "0x8e937fAE28652749c5c44a0Ab9ba90bCF73B60ab"; //NFT Minting Contract Use This One "Batteries Included", code of this contract is in the github repository under contract_base for your reference.
const test_contract_address = "0x0b479E40f49779d2953655dEEEC660F4267F25B7";



initMoralis();
prtTotalSupply();
document.getElementById("getWallet").onclick = connectWallet;
document.getElementById("logOut").onclick = logOut;

const web3 = new Web3(window.ethereum);


async function initMoralis(){
    Moralis.start({ serverUrl, appId });
    await Moralis.initPlugins();
}

//Step 1 Initialize Web3
async function connectWallet() {
    let user = Moralis.User.current();
    if(!user) {
        user = await Moralis.authenticate({
            signingMessage: "Log in using Moralis"
        })
        .then(function (user){
      //      console.log("logged in: ", user);
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
  //  console.log("logged out");
  }

//Step 2 Generate Character
async function getNftPicture() {
    const configId = await prtTotalSupply();
    //  const configArray = getRandomValues(); // Itt lesz egy array amibe van egy random szám, egy nagyobb random szám
    //  const characterIndex = (configArray[0] % 7) + 1; // itt megkapsz egy random számot, maximum akkorát ami a modulo után van, tehát most itt 7-est
    const charIndex = configId;

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
        68: "Heilos",
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
        102: "Kinghu",
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
        222: "Zeus"
    };
    return { Names: iNames[charIndex], URI: ipfsUris[charIndex] };
}

async function mintNft(metadataURI) { 

    var ABI = [
        {
            inputs: [
                {
                    internalType: "string",
                    name: "URI",
                    type: "string"
                }
            ],
            name: "mint",
            outputs: [],
            stateMutability: "payable",
            type: "function"
        },
    ];
    const options = {
        contractAddress: test_contract_address,
        functionName: "mint",
        abi: ABI,
        params: { URI: metadataURI },        
        msgValue: Moralis.Units.ETH(0.355)
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
    } / 222 Nft minted</div>`;
    console.log("Next Id that is going to be minted is: " + allowance);
    return allowance;
} 
