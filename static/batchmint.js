
//Step 2 Generate Character
// async function getNftforBatch() {
//         const metadatas = [];
//         for(i = 1; i <= 5; i++){
//             console.log("minting nft id:" , i);
//             // const promise = new Promise ((resolve, reject) => {
//             //     setTimeout(() => resolve(), 3000);
//             // });
//             // await promise;
//             const character = await mapNft(i);
//             const metadata = {
//                 name: character["Names"],
//                 image: character["URI"],
//                 seller_fee_basis_points: 750,
//                 fee_recipient: "0xb0073A64D1424fF800262814Fd65E29AeceF5A46",
//             };
//             const metadataFile = new Moralis.File("metadata.json", {
//                 base64: btoa(JSON.stringify(metadata)),
//             });
//             await metadataFile.saveIPFS();
//             const metadataURI = metadataFile.ipfs();
//             metadatas.push(metadataURI);
//         }
//         await batchMintTwo(metadatas).then(console.log);
// }
// async function getImages(){
//      const images = await fetch("static/ipfsCollection.json");
//      const ipfsUris = await images.json();
//     // console.log(ipfsUris);
//      const result = Object.keys(ipfsUris).map(key => ipfsUris[key]);
//     // console.log(result);
//      return result;
// }

// async function mapNft(charIndex) {
//     const images = await fetch("static/ipfsCollection.json");
//     const ipfsUris = await images.json();
//      //console.log(ipfsUris); // Ez Object
//      const result =  Object.keys(ipfsUris).map(key => ipfsUris[key]);
//      //console.log(result); // Ez tömb 
//     const iNames = {
//         1: "Adroa",
//         2: "Agyo",
//         3: "Ah Puch",
//         4: "Ahti",
//         5: "Ahura Mazda",
//         6: "Aine",
//         7: "Akna",
//         8: "Akras",
//         9: "Akuanduba",
//         10: "Aligank",
//         11: "Altjira",
//         12: "Amaterasu",
//         13: "Amatsu Mikabosshi",
//         14: "Ammun",
//         15: "Anahit",
//         16: "Anguta",
//         17: "Antu",
//         18: "Anubis",
//         19: "Anuti",
//         20: "Apedemak",
//         21: "Apep",
//         22: "Aphrodite",
//         23: "Apollo",
//         24: "Ares",
//         25: "Asclepius",
//         26: "Asena",
//         27: "Ash",
//         28: "Astghik",
//         29: "Aten",
//         30: "Athena",
//         31: "Babi",
//         32: "Baldur",
//         33: "Bat",
//         34: "Belobong",
//         35: "Bishamon",
//         36: "Bixia",
//         37: "Boreas",
//         38: "Bragi",
//         39: "Buluku",
//         40: "Bumba",
//         41: "Cabracan",
//         42: "Caer",
//         43: "Chac",
//         44: "Coi Coi Vilu",
//         45: "Cybelle",
//         46: "Damballa",
//         47: "Denwin",
//         48: "Diana",
//         49: "Dolos",
//         50: "Enlil",
//         51: "Eros",
//         52: "Forseti",
//         53: "Frigg",
//         54: "Fufluns",
//         55: "Fujin",
//         56: "Furrina",
//         57: "Gengen Wer",
//         58: "Gilgamesh",
//         59: "Glooskap",
//         60: "Hades",
//         61: "Hapi",
//         62: "Hathor",
//         63: "Haurun",
//         64: "Hedetet",
//         65: "Heimdall",
//         66: "Heka",
//         67: "Hela",
//         68: "Helios",
//         69: "Hera",
//         70: "Hermes",
//         71: "Heryshaf",
//         72: "Hoderi",
//         73: "Hodiak",
//         74: "Horus",
//         75: "Hotei",
//         76: "Huitzilopochtli",
//         77: "Hurracan",
//         78: "Hypons",
//         79: "Icarus",
//         80: "Ilmarinen",
//         81: "Inari",
//         82: "Inti",
//         83: "Ishara",
//         84: "Ishtar",
//         85: "Isis",
//         86: "Ixchel",
//         87: "Izanagi",
//         88: "Izanami",
//         89: "Jizo",
//         90: "Julunggul",
//         91: "Juno",
//         92: "Jupiter",
//         93: "Kaggen",
//         94: "Kamapuaa",
//         95: "Kanaloa",
//         96: "Kane",
//         97: "Kannon",
//         98: "Kauriraris",
//         99: "Keto",
//         100: "Khnum",
//         101: "Khonsu",
//         102: "Kingu",
//         103: "Kinich Ahau",
//         104: "Koyash",
//         105: "Kratos",
//         106: "Lada",
//         107: "Laka",
//         108: "Legba",
//         109: "Lei Gong",
//         110: "Leno",
//         111: "Lilinoe",
//         112: "Loki",
//         113: "Longwang",
//         114: "Mafuie",
//         115: "Marduk",
//         116: "Marmoo",
//         117: "Mars",
//         118: "Mbombu",
//         119: "Mebege",
//         120: "Mictlantecuhtli",
//         121: "Min",
//         122: "Minerva",
//         123: "Mixcoatl",
//         124: "Mokosh",
//         125: "Montu",
//         126: "Morpheus",
//         127: "Na Maka Kaha",
//         128: "Nanabozho",
//         129: "Nannar",
//         130: "Nemesis",
//         131: "Nephthys",
//         132: "Neptune",
//         133: "Nike",
//         134: "Nikkiri",
//         135: "Ninhursag",
//         136: "Ninigi",
//         137: "Ninlil",
//         138: "Ninsun",
//         139: "Nojir",
//         140: "Obatala",
//         141: "Odin",
//         142: "Ogo",
//         143: "Ogun",
//         144: "Okuninushi",
//         145: "Osiris",
//         146: "Ozomalti",
//         147: "Pangu",
//         148: "Papatuanuku",
//         149: "Pele",
//         150: "Perun",
//         151: "Pluto",
//         152: "Poseidon",
//         153: "Prometheus",
//         154: "Ptah",
//         155: "Ra",
//         156: "Raginui",
//         157: "Renenutet",
//         158: "Ruti",
//         159: "Sah",
//         160: "Saturn",
//         161: "Saxnot",
//         162: "Sedna",
//         163: "Sekhmet",
//         164: "Sepa",
//         165: "Seshat",
//         166: "Set",
//         167: "Shango",
//         168: "Shezmu",
//         169: "Shiva",
//         170: "Sif",
//         171: "Sobek",
//         172: "Supay",
//         173: "Surma",
//         174: "Susanoo",
//         175: "Svarog",
//         176: "Tagaloa",
//         177: "Tapio",
//         178: "Tara",
//         179: "Tawaret",
//         180: "Tengu",
//         181: "Tezcatlipoca",
//         182: "Thanatos",
//         183: "Themis",
//         184: "Thor",
//         185: "Thoronas",
//         186: "Thoth",
//         187: "Thunor",
//         188: "Tiamat",
//         189: "Tsukyomi",
//         190: "Tuoni",
//         191: "Tyr",
//         192: "Uguo",
//         193: "Ukko",
//         194: "Ulgen",
//         195: "Ullu",
//         196: "Uni",
//         197: "Uranus",
//         198: "Usil",
//         199: "Utu",
//         200: "Vahagn",
//         201: "Vaisravana",
//         202: "Vajrapani",
//         203: "Vammatar",
//         204: "Veles",
//         205: "Velle",
//         206: "Venus",
//         207: "Vesna",
//         208: "Vesta",
//         209: "Viracocha",
//         210: "Votan",
//         211: "Vulcan",
//         212: "Wakan Tanka",
//         213: "Wenenut",
//         214: "Wepwawet",
//         215: "Woden",
//         216: "Xipe Totec",
//         217: "Xochiquetzal",
//         218: "Xolotl",
//         219: "Yamir",
//         220: "Yemaya",
//         221: "Yum Kaax",
//         222: "Zeus",
//     };
//     return { Names: iNames[charIndex], URI: ipfsUris[charIndex] };
// }

// async function batchMintTwo(metadataURI){
//     var ABI = [
//         {
//             "inputs": [
//                 {
//                     "internalType": "string[]",
//                     "name": "URI",
//                     "type": "string[]"
//                 }
//             ],
//             "name": "batchMintTwo",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
// }];
//     const options = {
//         contractAddress: nft_contract_address,
//         functionName: "batchMintTwo",
//         abi: ABI,
//         params: { URI: metadataURI },
//     }
//     let tx = await Moralis.executeFunction(options);
//     console.log(tx);
// }

// async function batchMint(metadataURI){
//     var ABI = [
//         {
//             "inputs": [
//                 {
//                     "internalType": "string",
//                     "name": "URI",
//                     "type": "string"
//                 }
//             ],
//             "name": "batchMint",
//             "outputs": [],
//             "stateMutability": "nonpayable",
//             "type": "function"
// }];
//     const options = {
//         contractAddress: nft_contract_address,
//         functionName: "batchMint",
//         abi: ABI,
//         params: { URI: metadataURI },
//     }
//     let tx = await Moralis.executeFunction(options);
//     console.log(tx);
// }


// // document.getElementById("batchMint").onclick = getNftforBatch;
