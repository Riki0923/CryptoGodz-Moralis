 const appId = ""; // MAINNET
 const serverUrl = ""; //MAINNET


const nft_contract_address = ""; // nft contract address comes here


initMoralis();
prtTotalSupply();

// const web3 = new Web3(window.ethereum);

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
    for(i = 43; i < 223; i++){
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

}

async function getNftPicture2() {
        //  const configArray = getRandomValues(); // Itt lesz egy array amibe van egy random szám, egy nagyobb random szám
        //  const characterIndex = (configArray[0] % 7) + 1; // itt megkapsz egy random számot, maximum akkorát ami a modulo után van, tehát most itt 7-est
        const charIndex = document.getElementById("mintSelected").value;
    
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
                //console.log(metadataURI);
                //    displayNFT(metadataURI);
                await mintChosen(metadataURI).then(console.log);
                //await mintChosen(metadataURI).then(console.log);
                // await mintNft(metadataURI).then(console.log);
            } catch (error) {
                console.log(error);
            }
        }
}

async function getAllMetadata(){
    for(i = 1; i < 41; i++){
        const charIndex = i;
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
        console.log(metadataFile._ipfs);
        const metadataURI = metadataFile.ipfs();
        //console.log(metadataURI);
    }

}

async function getURIs(){
    return 

}


async function batchMint(){
    let Uris= ["https://ipfs.moralis.io:2053/ipfs/QmQumjkRD4LtqBziyX2Y571knaPySLWVcSr4yqN7h7Gv3N",
    "https://ipfs.moralis.io:2053/ipfs/QmPYXYCH3gN15HJ7QXXVjyLRakmYNhXjQj8ZVTgjvyY5d9",
    "https://ipfs.moralis.io:2053/ipfs/QmQbKz5zzjzrZaMBch1iw6S2XGxTnLQLky1wbu89efeR1V",
    "https://ipfs.moralis.io:2053/ipfs/QmdSMUZnZMLVa8rCtSZNSKK961dZjLwmzYfzxzni2gqudp",
    "https://ipfs.moralis.io:2053/ipfs/QmNnKTCDcare7UHo45aAuyjwqZe8NgZvGtLfEbq3di5DRd",
    "https://ipfs.moralis.io:2053/ipfs/QmWibzh5mpSVwvTeYgjnorj6Nh2N25a9wJCoimN6gDn7rm",
    "https://ipfs.moralis.io:2053/ipfs/QmZHoNu49r4RvuQ6L3v9FRQBCMbYDNd4Gt6AirTRB8BWAY",
    "https://ipfs.moralis.io:2053/ipfs/QmUm82p3Q1rjVuZHSL4B8SozvaRMcWtHPwrCXshcUe1tmJ",
    "https://ipfs.moralis.io:2053/ipfs/QmWZ1PEDfdycK142JRurCji5co8EmCTtYKEBbM5NnYkPF3",
    "https://ipfs.moralis.io:2053/ipfs/QmZzquz9pgixzupr5d2BHQUKLU2YfprpTora8X1W2LPSmt",
    "https://ipfs.moralis.io:2053/ipfs/QmTTLBDwEW6gzsJ5GgbMx2XZ31T7XpS7bCGNFVsfxJDGNW",
    "https://ipfs.moralis.io:2053/ipfs/QmPmvti2sCDo9SYtvF18tBg9eKzeBzJtKo8KRnqPzbvyzv",
    "https://ipfs.moralis.io:2053/ipfs/QmVJAXptePgwh8bmPn922fGfFiQiJSHE3ZqdL9NULNSTYk",
    "https://ipfs.moralis.io:2053/ipfs/QmfQkV26dDgEma4UiEaQefTvqT6Gr85LVxTwdNrxhkWyEh",
    "https://ipfs.moralis.io:2053/ipfs/QmRg5b1Wuso5we3R2L1DWPGnxtYrkosqiTzWUqrmEET7hM",
    "https://ipfs.moralis.io:2053/ipfs/QmPRihdjTi6wDTpk1WKLFb5BqZukXZJ4VK4NbQB7c6FVDB",
    "https://ipfs.moralis.io:2053/ipfs/QmZiogk8dNz6om1RAwsrZ6ti1ahXJo6VCr3G8XmVr7fAfd",
    "https://ipfs.moralis.io:2053/ipfs/QmSBnyZajSc7YQ2F7BcnCx8zS4bwseReuBK554uAkgYpyQ",
    "https://ipfs.moralis.io:2053/ipfs/QmYcjTUTks4T8bFFju4mJ9R2FdWAAgiysb3Hed9MQLzetY",
    "https://ipfs.moralis.io:2053/ipfs/QmRwbo3oPB3kPhq6TEzkY58da1eWU3u2FnvV4owxVnEay7",
    "https://ipfs.moralis.io:2053/ipfs/QmTZjmK9p74L7C6LqJbhXUgidP5B5Px5avpbLrHna67VYL",
    "https://ipfs.moralis.io:2053/ipfs/QmcC9ducamMjs91a8UdwrwHeC6igHSR3M84jiZ1m1Ncy3p",
    "https://ipfs.moralis.io:2053/ipfs/QmQsUFypSSCotvPCCqdCYcYMxPDBMKJf1buQcpxefcHFAq",
    "https://ipfs.moralis.io:2053/ipfs/Qma7zcpue1uonKvCfQQ22ziQf27TKvnB1pKGVC9zcxmv4E",
    "https://ipfs.moralis.io:2053/ipfs/QmVNZ93d9VJmjNovALs1QXBUUTNCE8TNVL58mR3vkwdyJm",
    "https://ipfs.moralis.io:2053/ipfs/QmUR2GhwHZKN7Y8Pg3Ajjkcg9CCCQa4SXE73dSsXEUcBm6",
    "https://ipfs.moralis.io:2053/ipfs/QmZWDECPovYkWNVAuEYLKu8zhwHoYS8A8cJFJyLhTqKz8e",
    "https://ipfs.moralis.io:2053/ipfs/QmZdELpxQLEHRpsWR6pbHuUjEZVuKkhXNG9vRcGQz22mrn",
    "https://ipfs.moralis.io:2053/ipfs/QmZrxYEKnitDosRTc9r9SNUb9fmi9kiiJnztAvjMS4oi47",
    "https://ipfs.moralis.io:2053/ipfs/QmWVYTUH2HPWEyKsiwKcvjjSWMCU1KDfXei3CGy48NRkpy",
    "https://ipfs.moralis.io:2053/ipfs/QmVtqt4czqcaRVcU7xQstZHq8XkLdDFoap335pUCxxsFaB",
    "https://ipfs.moralis.io:2053/ipfs/QmXV4wJ62PDZmk1vbE7fSyFimfNRanqYbdTH8ydea2uuDT",
    "https://ipfs.moralis.io:2053/ipfs/QmZV93zRooG8SZgi4FNM7k6BzzsCZx73tF31Ew3TvutofE",
    "https://ipfs.moralis.io:2053/ipfs/QmPLtmnw68KCLUmb4xbEY6DfTyzLmGP9QRc3s4JEVsu584",
    "https://ipfs.moralis.io:2053/ipfs/QmYoce2ijTuWWtJpE93WqPh1EbMRY9jnuzTaa4XWLdfjz7",
    "https://ipfs.moralis.io:2053/ipfs/Qmcp6NYZ7snJDaWW8f6Pmomcv8ugbHB6sTjozGZTgmKNUU",
    "https://ipfs.moralis.io:2053/ipfs/QmbaU5YnpHRnhwn8KB12aaxAwuNNY7MRXa5H8W92HzQbeN",
    "https://ipfs.moralis.io:2053/ipfs/QmcTYiKbAH8MD4rKfnJVzhF4sqbqUhkx91gWa3ZA3UrxWn",
    "https://ipfs.moralis.io:2053/ipfs/QmWgPXhF5QEpF92Cep9zQQw1otq8KqAHXzL8xdjA4jSA7f",
    "https://ipfs.moralis.io:2053/ipfs/QmfQ1owjr3jba2y5cRp4zwcUy8iRb8Jd4cGUmpXnVtNzgB",
    "https://ipfs.moralis.io:2053/ipfs/QmaQugGgSvDozEGKaUXuthucijzmeT48qXVQKqn4EKVYU6",
    "https://ipfs.moralis.io:2053/ipfs/Qmdxrwpbeeg5EZzUApNcTi677pqBLqR99vY32JtCwyuMep",
    "https://ipfs.moralis.io:2053/ipfs/QmRkWaFNtKJdtxCBrnCbTz3gV2ebsr55xWDnVCbJaNPVyh",
    "https://ipfs.moralis.io:2053/ipfs/QmTS5RouXesa3Z5hFw51dxZp7jcw3dn67TW6bLeVZczdvC",
    "https://ipfs.moralis.io:2053/ipfs/QmVeSusu6e1Jt4Jhf1kzKNRESS32aFHebohe1F2LSQM8nk",
    "https://ipfs.moralis.io:2053/ipfs/Qmd5hy4Aq4d9hPFPAWhzacaL6Qr3WL28YVBTpmhCQdXCNy",
    "https://ipfs.moralis.io:2053/ipfs/QmUJVFZCV8E2us89cw3KdQFyTjMDGrZyDLSZDADUNeBRfr",
    "https://ipfs.moralis.io:2053/ipfs/QmednES6KiXbrHBUWE6u1vMrNtyzjvQL3UGVMh3GrgUA5Q",
    "https://ipfs.moralis.io:2053/ipfs/QmceR5zc29Ga4UTFC8xrEytvzddx9T4niezHMBXHiGiX2B",
    "https://ipfs.moralis.io:2053/ipfs/QmRmYhxBouyuLqYMJPeCWVBYN5EaMhJ9zdW8qGgr2yPR8x",
    "https://ipfs.moralis.io:2053/ipfs/QmcfEMkgn2AQbxE6XecS5aKqHdBfNfw9SYrS2WJmqtZQJU",
    "https://ipfs.moralis.io:2053/ipfs/QmSTsQhGAvQ9HkMmQcS23mqu6324XVAnYLK4pzdaQye1kN",
    "https://ipfs.moralis.io:2053/ipfs/QmfNDeCrEpCcMCr87qvbzfUEFXjGVneK2gv613ZFXPPEFF",
    "https://ipfs.moralis.io:2053/ipfs/QmXdmJMhc8dZuGZn8AxnixddvkeNWF8s9uvs7XTcGfWUJc",
    "https://ipfs.moralis.io:2053/ipfs/QmNbtEzwsV8kj9u8ftaWpALPkF8unKr7j8YSDTfXsmexSw",
    "https://ipfs.moralis.io:2053/ipfs/QmWD2z1db4rbyCU52bTrygHD2bZWDBmH2QJEzeHcAcEeCX",
    "https://ipfs.moralis.io:2053/ipfs/QmdmYoMVCufrJJs9d4KJBQQAi5WND9mvgBQu8hoWYS3VhG",
    "https://ipfs.moralis.io:2053/ipfs/QmZ6jWEGzsDLNGsbZ66srZc3fiqKVXnbPdstzLujZSgjC7",
    "https://ipfs.moralis.io:2053/ipfs/QmVotr1Betow1nJqZyTWM1nhxoqA7LEf3MnZdhfhCRj5aG",
    "https://ipfs.moralis.io:2053/ipfs/QmW2BKaJXvv3JX5BAjsUHahZGvdba6yd3qnoSrimy8FHPX",
    "https://ipfs.moralis.io:2053/ipfs/QmRPtcBvKoDYK3AvTnzPtteWPzTowbidpyAd7GgXJ1FXA8",
    "https://ipfs.moralis.io:2053/ipfs/QmcBQifPCqxzsd345gqejvJY788TGfaa2UVtHMv9k8sNyC",
    "https://ipfs.moralis.io:2053/ipfs/QmfWvbnpq1DVsj9xdcHL3AnCHzQupRg3zDHFGhhaqudTX4",
    "https://ipfs.moralis.io:2053/ipfs/QmUGvVcg13QkS5w3JqcWuoPd3QMP9LASFkg49H5QYxg9ZD",
    "https://ipfs.moralis.io:2053/ipfs/QmQeM8tvBkEMEtPFueRE8ENCVTBEhZqciokNGiJEah9Q12",
    "https://ipfs.moralis.io:2053/ipfs/QmcvFX4Fr3XzE2bMgKxNrL5yMUGK9BfGjNhepYYJMm61ou",
    "https://ipfs.moralis.io:2053/ipfs/QmSf8ubL36Lmj9Wwxo8R55XnA3suKXkWcz4qpX4GDxd79X",
    "https://ipfs.moralis.io:2053/ipfs/QmQyF8NGn6RGANYQukajFnShys6kdSAiM6tx4Qegr4Dd5f",
    "https://ipfs.moralis.io:2053/ipfs/QmaAvd7uqYTSA97VR3Mv7GXdoEpmFjDqiXbSseCmnH2qmd",
    "https://ipfs.moralis.io:2053/ipfs/QmRM7BP9mnL44bYDDcdLGofZ8FQo7RQSnYCDroX4RnVkpL",
    "https://ipfs.moralis.io:2053/ipfs/QmSPmQxfiwUNs8ZQaLxg8jJ3CNrkXQY9JAWzqz977xfAM7",
    "https://ipfs.moralis.io:2053/ipfs/QmX55ar3V14Q1sPWnkywR4TxHrjRhGDcVx7MS5hxwgmDE7",
    "https://ipfs.moralis.io:2053/ipfs/QmUNYn4CC3uB5k77g97o5z9cg6gABWJiwruzbSTYERyMQi",
    "https://ipfs.moralis.io:2053/ipfs/QmWVc2zomaXm4jdrfYwHZbBTpzWWHacVMrsR9LxkpS5TNp",
    "https://ipfs.moralis.io:2053/ipfs/QmSqRgenUrcAiCkhKFHa6p9N83vLWufx7mYuQsG5ZYY6Bs",
    "https://ipfs.moralis.io:2053/ipfs/QmacK6q3hhLQCbS7YNSbvAVr6AZEjDDD1VQiewARUfU8rf",
    "https://ipfs.moralis.io:2053/ipfs/Qma88uQHjdCdDgwFTpe9dUAp6pjxKnjbys9yt92BqsaiuF",
    "https://ipfs.moralis.io:2053/ipfs/QmbgVLf8n8bubwyqdMRiSs5saWn6Crda2Nw9erxpCaun7f",
    "https://ipfs.moralis.io:2053/ipfs/QmRirsQ3YBFDSQE9zK3WibYSJeZh2pFS1frtcqNAnmiVQ5",
    "https://ipfs.moralis.io:2053/ipfs/QmRj3mxeDz5oS9P8JCJfg5mdC8HabERBrM1PoMTRa79nio",
    "https://ipfs.moralis.io:2053/ipfs/QmcUvaAXtTfjmxSoH6fyahDDfThksEDpnnUgTVho7JwYPH",
    "https://ipfs.moralis.io:2053/ipfs/QmRBiV5QK3MWKF6ZZAYM8WetHCBD9N4txes8T2uEzNQLen",
    "https://ipfs.moralis.io:2053/ipfs/QmTzvnuu1LUp62LX3UZH8XSakK6CDHGKSCUCQdPdK5FnzF",
    "https://ipfs.moralis.io:2053/ipfs/QmZCK6dZYsJbWFDQ89vrrWsHjfoi5L9LG4LhxvtfsQda4g",
    "https://ipfs.moralis.io:2053/ipfs/QmaWpE15ydpCA8tR51ytysdQDbWqD3xGeA462Q1RKhqCb7",
    "https://ipfs.moralis.io:2053/ipfs/QmPei4nYtW5gywbTRTemhndDrxEBxkt9U5NkwsivHBUgqc",
    "https://ipfs.moralis.io:2053/ipfs/QmTeuScSFvoyd3Qsvar4FvtMH1LTApjcccmzYyGvUUNuZe",
    "https://ipfs.moralis.io:2053/ipfs/QmVjM26e8FvhzLtTRpFoqbUYbcFT5VsLQc5PjiGuUdYAnf",
    "https://ipfs.moralis.io:2053/ipfs/QmWu6FF8h12bFPjuCnbRSpcGhVwtuBpSSBxsd31pZa8syq",
    "https://ipfs.moralis.io:2053/ipfs/QmQ54d1V6AHX1CmQ56PuL2pJLjwbygJTLB245CiVVCNMPW",
    "https://ipfs.moralis.io:2053/ipfs/QmVpMzNiut3oprV2o3KyUZjsw6WpynfSPziW6H7vU9cwHK",
    "https://ipfs.moralis.io:2053/ipfs/QmPPtmb2CH9gX1n6WbRyAM22UnqNQZiD56TiquE2NokRLa",
    "https://ipfs.moralis.io:2053/ipfs/QmNmWT5h9gDiGi7ARV79Ewge8xkooT3Zb1EkGrKJaSAt21",
    "https://ipfs.moralis.io:2053/ipfs/QmeLYrVo7iuYphgJvWDJ49Zvb3pBL4G8xoXH1gpuZrDJrc",
    "https://ipfs.moralis.io:2053/ipfs/QmP2s6eAu4cRH7y5ouwk71L1BhihPGTcLBjXSkw4sygE7A",
    "https://ipfs.moralis.io:2053/ipfs/QmQE7drA6xTp4qHjKVSAy5brtNL2oEHaUYRVxtrQviNXKc",
    "https://ipfs.moralis.io:2053/ipfs/QmQQtUPLNyWcypsXLLogU68bcw71XaJk6XNtgtW52wQ6TG",
    "https://ipfs.moralis.io:2053/ipfs/Qmc2U76w5ntP3Qkie7Rg31GcEMdNUZu9WzkeBaTpTzjj4a",
    "https://ipfs.moralis.io:2053/ipfs/QmdBGvGiWbsRn65fPcYBUjhxn3VSwyr7XA1QyYG6aHZ6QW",
    "https://ipfs.moralis.io:2053/ipfs/QmWS7VbepjqsztSPVhMJeNCSJ1HYqY9xa2wPoTmrnTJhDM",
    "https://ipfs.moralis.io:2053/ipfs/QmbQP1BSbNLaToZysmNvfyw6hFt731ia4hU8PVgytjXePj",
    "https://ipfs.moralis.io:2053/ipfs/Qmbe5Qe793dhjgf1y6i5YU9uTFRA8pnFF2PNc647nSDEqU",
    "https://ipfs.moralis.io:2053/ipfs/QmTa6op7yuoYg6EnennnCjCooVqotgK4Leroi2D7VhcLP3",
    "https://ipfs.moralis.io:2053/ipfs/QmWNJRimhmnYizjqcCBBG1HxXxZYMmm8WWnojALsMxF1eQ",
    "https://ipfs.moralis.io:2053/ipfs/Qme5PvTaY7FVcDXQagPDqnAGJYRCXyfEdQigsXKENPhvLz",
    "https://ipfs.moralis.io:2053/ipfs/QmSDKRZUEx7i9vDWUtCt3AbV8NKo9eF6vCSAn1y5o14ppX",
    "https://ipfs.moralis.io:2053/ipfs/QmY6MFLoiaBoCo7WRtfj1CpbKbg3JbraagEr15hvejH74x",
    "https://ipfs.moralis.io:2053/ipfs/QmSvCT2sYkedMeWsQvAu92hFgPxiZTuZ1Uh7HbpLkP3ZMu",
    "https://ipfs.moralis.io:2053/ipfs/QmQNnar8xY8K2ru9F8rkyuDQrf1sQGoGzt427JChEvvaJQ",
    "https://ipfs.moralis.io:2053/ipfs/QmaZbYWhhTpmn8U76q4ro7JymMTCej8Ftx4fwZbsJjGSyT",
    "https://ipfs.moralis.io:2053/ipfs/Qmd2jpVZfHibxqyBUmxBhwKUacYM8qRyVskJxkcMwA5C6b",
    "https://ipfs.moralis.io:2053/ipfs/QmcrMhnc1A72nmTJfynYWWS9jRB2qAjjEWCm9EjEhaCJ9A",
    "https://ipfs.moralis.io:2053/ipfs/QmPrywNPhfVWetdZm8uTC5Kb9WRxwVs7AcJL8Hg1MaFg1K",
    "https://ipfs.moralis.io:2053/ipfs/QmZCJdr2SojuGhqyLTK1hpmi7C6trndjDAjFkQ88PCSgw3",
    "https://ipfs.moralis.io:2053/ipfs/Qmb5Kt74y7t6Q4UpK4iV5ioJSRaVtu7B4Ai9vEDh9Ggpbr",
    "https://ipfs.moralis.io:2053/ipfs/QmWYtLQJHR23AZcxYGRQN7CYyBWfUtmoGTCrUcMChzFcCR",
    "https://ipfs.moralis.io:2053/ipfs/QmZGVsFyW7z97zL6B6m7GenretkuU24DbXvrgkLsP9Ziuj",
    "https://ipfs.moralis.io:2053/ipfs/Qma9xvCofEXNB6Qqj8bjvXytPSDBjxj3oVsjDkzh3czbSZ",
    "https://ipfs.moralis.io:2053/ipfs/Qmf1YuYbuMddBHuh5sHkxURBWWY1n7ZHrpH5dqBQZsCYxe",
    "https://ipfs.moralis.io:2053/ipfs/QmUdrZDk4pTW9wQ7mDjRMtQ3FQjXA8Ym8N3vomxbKQ59J6",
    "https://ipfs.moralis.io:2053/ipfs/QmNfx6dgQswsyGvij1h1jYqWuFc8XkFZMuiDDciDmFomjo",
    "https://ipfs.moralis.io:2053/ipfs/QmUfBgNNK4NesxwwiXyXASNeD7DwQLb8J3cforFerqvGkJ",
    "https://ipfs.moralis.io:2053/ipfs/QmTaTxfXMgYQmpjB6fksVQyFtyTLJmmRXrAvyvBBxSPVjY",
    "https://ipfs.moralis.io:2053/ipfs/QmUvo6dFWq6FFnerJRLE8NryGq3esRqzX8ToomyF3pMP5c",
    "https://ipfs.moralis.io:2053/ipfs/QmV9qgYzJgPiYE8V4PWEraiLjPHsFGfb8j9BnZiJnvpuZt",
    "https://ipfs.moralis.io:2053/ipfs/QmU1HV954xXcdQ63ckYd9gbMnwPuvatnGZjoMo62Swjkrv",
    "https://ipfs.moralis.io:2053/ipfs/QmVzFHvcigbBtWRxEbfpxYFFCY1DiYz3gnB1mwzhhtZZav",
    "https://ipfs.moralis.io:2053/ipfs/QmSibTsZGCt7W3LhyNoE38mRtgpEJA9HuDp4jHpy9rgr65",
    "https://ipfs.moralis.io:2053/ipfs/QmXmaXLDeEFoBGaNv2TTA2fUrdsCLTDqYPh4cQstnwqXH2",
    "https://ipfs.moralis.io:2053/ipfs/QmYqXEa68ncbHYr94NpGxW22HGbCPT1E4AaGsc5TQrzoqA",
    "https://ipfs.moralis.io:2053/ipfs/QmT5i5vumJ1Ha6sQHMDLZbuqSe52UeszfQMtJ4TYSqVjEM",
    "https://ipfs.moralis.io:2053/ipfs/QmYwJJ2CMYSyFjyy3JMt1pZMoMubbbPkJ2WnHoYsy76fw8",
    "https://ipfs.moralis.io:2053/ipfs/QmVH7KAZWS8F48JaiYrTTVTjnnnG6JeD8bCcouaxZT45Cs",
    "https://ipfs.moralis.io:2053/ipfs/QmYkvYD9tBfeTsr2kR4dacf7NBiYk4AXiEVmRTeLBjNUXq",
    "https://ipfs.moralis.io:2053/ipfs/QmXvjyhAYQr1BD9fNiEfzAHyFLTA1cnmth43u3sp5gbY9t",
    "https://ipfs.moralis.io:2053/ipfs/QmNhFTbypZirKyfojWu1hBdKDNhwbjJnxgmmn6Xa7sRDbj",
    "https://ipfs.moralis.io:2053/ipfs/QmdhUHpS3tUHbYoyxANA11Jpq51FX4Xx3x3vkpFqijC9ga",
    "https://ipfs.moralis.io:2053/ipfs/QmdTim3jDFsg84F5pQrXAevmKfB84UZkXabjgWz2V6qHRA",
    "https://ipfs.moralis.io:2053/ipfs/QmXD2mxu4UfjBevBhPEn4F1cmsnQiqMjqXvDL4afMeev6b",
    "https://ipfs.moralis.io:2053/ipfs/QmPJpBwCL6CZ8oz3uuPqvipKp1vi7qMFXDVPt6Sm29Cdfa",
    "https://ipfs.moralis.io:2053/ipfs/QmVG1L9eR9MLmhktYjbG83EepUwAaUHEU64ACsEPNDYipF",
    "https://ipfs.moralis.io:2053/ipfs/QmRbFpuMMEQzxon9qhLWsHqFmNbM3KGKzz3yjU8gsoWxKt",
    "https://ipfs.moralis.io:2053/ipfs/QmRusnAeAajgixYQRxuDRatkzewsk1Q8yyt7YneWyS5GM8",
    "https://ipfs.moralis.io:2053/ipfs/QmbMb2pxPS664ibAByZErou2EU44WxyDBuHURSYiUSmBJN",
    "https://ipfs.moralis.io:2053/ipfs/QmUCBruEiWiffFZ9ixfpjsmXi48MfzGGFUgqvGJcYg5UKu",
    "https://ipfs.moralis.io:2053/ipfs/QmNqSWWsL5BDhWX2hAesDdCN6EG6Gxg5ZoZ7eWJcXuRGaS",
    "https://ipfs.moralis.io:2053/ipfs/QmdNVEqeWTp8GAmGYgRgRyUAuv4i37ezTu29nDHFKfhruF",
    "https://ipfs.moralis.io:2053/ipfs/QmSX8Q3ubkTwLNjYjQsSndmdp4ZT16gbHeCRBPpiEQks5r",
    "https://ipfs.moralis.io:2053/ipfs/QmUxe8338KQ4oNh7thqozX8yBDJH6eThSvtYZAf1bD7CY4",
    "https://ipfs.moralis.io:2053/ipfs/QmexccwyVAJQ5tSVLxmjZs48GZktr3WHL3tcRdREiv3eGV",
    "https://ipfs.moralis.io:2053/ipfs/QmcdW7kPt5p3tekvRRxgrVyTyoEsFqQLg2TfMvp24Ms95T",
    "https://ipfs.moralis.io:2053/ipfs/Qmf4uqKtupNyMED9ABi4equj4MyCZQYoFDEoQkrUYSxx7p",
    "https://ipfs.moralis.io:2053/ipfs/QmXQYn5aaVVcmY5zx6gV2d3Q4QXpAfdNJuRUDKCMjJy2Ji",
    "https://ipfs.moralis.io:2053/ipfs/QmcBHLF6Y8n8hMRMyH1yoK68umtBpvYSJvcAzHDKt27ci1",
    "https://ipfs.moralis.io:2053/ipfs/QmdtdvB3iRnQUXQzooqCyQt3SAYQgCtfTUPnYv9SZ8G6oK",
    "https://ipfs.moralis.io:2053/ipfs/QmeSQrY3iUDKmpBBVpGemmUdBEHLQKttSGkaGWBMMxo6yN",
    "https://ipfs.moralis.io:2053/ipfs/QmVkZDHffkbrfnBYYVvUiNPMko3Vi9mQrUX1hBUCSFxU6r",
    "https://ipfs.moralis.io:2053/ipfs/QmSJsQ2zC3zuG2W4i3QqMAgkwvCheZee1iDPnjRXyLZbys",
    "https://ipfs.moralis.io:2053/ipfs/QmbGAum99khbTCk9pYreNRTcd6u2Se7gywEMS1oSQY3FAS",
    "https://ipfs.moralis.io:2053/ipfs/Qmb3o4nq3dbsUdotATZ71mYi6Q8Bz6bZkG2zAbTipBK5WL",
    "https://ipfs.moralis.io:2053/ipfs/Qmd1fagosH3BGqSc7mRBXxEE4Urc7fQUrkHVsdzQXis1H8",
    "https://ipfs.moralis.io:2053/ipfs/QmbuoyGgJoesYTXcnXxwa31mWY3zsvsFapPofHB124BZYm",
    "https://ipfs.moralis.io:2053/ipfs/QmUmbVK4M2FTFtvEWHdyGWZ9RfiVENfaDLFpCgmcr78cL1",
    "https://ipfs.moralis.io:2053/ipfs/QmR4fUMnbZzGDERKVv2NFtTd25ZnT5umBj1PmzvTUCymci",
    "https://ipfs.moralis.io:2053/ipfs/QmZqbArpF18Dt5EK13hVxxkKEo4tTkxQxkfDf1bP7TEPYR",
    "https://ipfs.moralis.io:2053/ipfs/QmNY8AGiUfFAetB4hpSPnKcZumhnS5X7vsDTwBYZADJf2T",
    "https://ipfs.moralis.io:2053/ipfs/QmTqw1TbkExFgzcAwP8ZWS5N1913omD6NEtuBVDhqCwyY2",
    "https://ipfs.moralis.io:2053/ipfs/QmSZujiXTgXoRFYgZvAjmjZ6W3gxq3kx41zH9jfbykSp1K",
    "https://ipfs.moralis.io:2053/ipfs/QmcAiw7Gd3QJg12B2E4TaaCE1eG1HJ32jA9yFQS5rDjnNf",
    "https://ipfs.moralis.io:2053/ipfs/QmYJMzLVVbJeRQqTaVaLE7in1yN1RZtdTBLqxdzviotfcY",
    "https://ipfs.moralis.io:2053/ipfs/QmRtC7GBDnPcXkfDhSbUKxUTth2KBTEWgvsPScpjgRccez",
    "https://ipfs.moralis.io:2053/ipfs/QmSCZvNaegv9pbXajYqbZ1QwLFzGEVz1QiHDVUhxRYt5Kp",
    "https://ipfs.moralis.io:2053/ipfs/Qmd2PamX5PBKdQJfMUXdzfqQ1JyqCzPFG4BTAxNr5ki6Vm",
    "https://ipfs.moralis.io:2053/ipfs/QmNnWX5JqsJ7cdveXHgQo5mu9UWZXFUhj4xJ3opSdMoabT",
    "https://ipfs.moralis.io:2053/ipfs/QmS7w2XUrHfsJ1xEWALAtio1L48phKiJbbgDKU6G7qNVQe",
    "https://ipfs.moralis.io:2053/ipfs/QmZTD4JqxuowRpvJv3Y1edBQ3haQSXywuZcBNB7TuJ52ka",
    "https://ipfs.moralis.io:2053/ipfs/QmdCPrjsef4yndB8QWS7BtPBQaj7bszYcCLGL86p1ue5p2",
    "https://ipfs.moralis.io:2053/ipfs/Qmf3TWpCf4c1vHpJF6fNHawEkNuA2RRv4XTeafCBbRehGn",
    "https://ipfs.moralis.io:2053/ipfs/QmamrmxenYmhS6cuDo8wXDGLzPeVJussNUUfhkUDG63PH1",
    "https://ipfs.moralis.io:2053/ipfs/Qmduz6ZTYU6Y4ffienmGAgjjVJed9XSXLBZUr8TR8Ukwdf",
    "https://ipfs.moralis.io:2053/ipfs/QmTKReUEsH8ty3ExnR6MgWxRapDSdPpUdcWPrrBQfpMcSm",
    "https://ipfs.moralis.io:2053/ipfs/QmaHPuTsPCWhDy7iBNNJLePtPik3gcfdwzY5gQ74ibSyK4",
    "https://ipfs.moralis.io:2053/ipfs/Qmcrj2gZXQLme2DUnEawXMqVvqUFbVcAmZFDMRDrfx7Gje",
    "https://ipfs.moralis.io:2053/ipfs/Qmf8uMsyDgML9PUVfG64ehMkmdUvStLCmxWYYmZY5ajTyw",
    "https://ipfs.moralis.io:2053/ipfs/QmP3aAWsSZAJukCpvSPjr91V3gucaLu6Q8pjhSLVmZ5Pay",
    "https://ipfs.moralis.io:2053/ipfs/QmVa1e2mR6JKi4a2aRX6uFbhgPNtEKpe8combVHuHDr7wY",
    "https://ipfs.moralis.io:2053/ipfs/QmWfLLjakZHagX13yerErczsoxzmR14nJMvVCisB7ctK7v",
    "https://ipfs.moralis.io:2053/ipfs/QmPfz8NRGkqNj43yV4QNob3RYh3r8XroiAXH1u72ugefHL",
    "https://ipfs.moralis.io:2053/ipfs/QmRbG4hVifQpNwhkPH9QqhVgCuVa9w366wsig4KzEKorG6",
    "https://ipfs.moralis.io:2053/ipfs/QmZ2vQsYcK3krgTgYnQoyUaMJey24qrw2MNsbBUrJzARyb",
    "https://ipfs.moralis.io:2053/ipfs/QmViNxSwPYPnVihUEbZ3pWVRFy4jAuhQiBnQbYPn5tnQmo",
    "https://ipfs.moralis.io:2053/ipfs/QmS2jsJj7BKqaeTdRS4KjjS5ZYLNpkCsVAomzH49mQUmVh",
    "https://ipfs.moralis.io:2053/ipfs/QmPCbQuk15EquuYmGL15LcSjunnbNDjgp8qv9FkMreAs3j",
    "https://ipfs.moralis.io:2053/ipfs/QmXHT6b3HPiNm6K5i5vcxPt2cpNfJxcWgsGGGetBm8c2My",
    "https://ipfs.moralis.io:2053/ipfs/QmfJJ7Fm3EJWTUn8gqdzgGeWtHQPU9TTE2foT6fCEXFhK6",
    "https://ipfs.moralis.io:2053/ipfs/QmfHdHY5Rjm8CXp5KuyzpsWdmCvrvHTQHtc4LAQwL7tnaa",
    "https://ipfs.moralis.io:2053/ipfs/QmfX4BgUoftDVHopUg2Z1MAJ2QDPeW8gxY4HCDqYnoojtN",
    "https://ipfs.moralis.io:2053/ipfs/QmNuwgMi267AAbiBtJwE4GUJBp7LCFsJvVG2tAo2HBfPvd",
    "https://ipfs.moralis.io:2053/ipfs/QmXauiyVdGRm5CUrJni5x58mwQAwDm4CDb2Lbj2GSVE1L4",
    "https://ipfs.moralis.io:2053/ipfs/QmTCmu3ENFPCzktF7VpXsji6Pp3Lv4Yc32MaeedPg2X41L",
    "https://ipfs.moralis.io:2053/ipfs/QmZRToTuJz2xctKd7RNu8VTE3zwbRLeAH74VWUyUKmHXDP",
    "https://ipfs.moralis.io:2053/ipfs/QmRsdjHy2MK8Wz969PJBT5jXWBV5Nxgq9EVScPRZ7tBTLa",
    "https://ipfs.moralis.io:2053/ipfs/QmYjvwRLtyPNGqEMAgRFowKCUuQDmaD9bGMFGzTPdTh7Dp",
    "https://ipfs.moralis.io:2053/ipfs/QmXar2a6oXFk2qDGQ1kibAqPvMUwvt9owvhdQdmSGeo3kU",
    "https://ipfs.moralis.io:2053/ipfs/QmfVj1wBqDvCfiFaQT2fBCLRji4PZxezwt2CzDGabRueNR",
    "https://ipfs.moralis.io:2053/ipfs/QmbzHAs3CjadZxhijRXfojxyFroBYcuyYKTmDbUqXqWuSe",
    "https://ipfs.moralis.io:2053/ipfs/QmeBM7jeffPnPorXKYvinRH5SimsUb6nGeJGgVaieCNYHB",
    "https://ipfs.moralis.io:2053/ipfs/QmPfresayqerjkTZGsq6s4d8RvTzHPxZtSjL4n6pBq33E9",
    "https://ipfs.moralis.io:2053/ipfs/QmeTKo8fcbYip449K2zVr1jtj5LqKwqwS1FADF9md9fdDU",
    "https://ipfs.moralis.io:2053/ipfs/QmNPPMy1SQZsEAfGPLtceVtULcr2Ly5e4td3SkHebdNVSY",
    "https://ipfs.moralis.io:2053/ipfs/QmSnGij2QuY6Xhid7tXjuLmvstwb6naM1tDCQPQbCDbQfg",
    "https://ipfs.moralis.io:2053/ipfs/QmT6DU3x5jFwUZ51A9AX32ZdvtJaegzoTgRUfqGLh6MwfJ",
    "https://ipfs.moralis.io:2053/ipfs/QmXUB4FVUspNCh2Muv3v4LTFTz6ccG4bXLEEjsYGVkkmnU",
    "https://ipfs.moralis.io:2053/ipfs/QmS4xAxJD5uZvndBRmqWv68ajpaLSoyEFHqzXYynGWVEAg",
    "https://ipfs.moralis.io:2053/ipfs/QmUn9cUmVKN3JiHmt7jGHYB9fScgGNL7SjHkt2rG4L4vLf",
    "https://ipfs.moralis.io:2053/ipfs/Qma9B4wSHEcnaZa9Nkdb5KvFvQkCc6GBafJZGy5mBf66Fx",
    "https://ipfs.moralis.io:2053/ipfs/QmbziyZqtmhKkhJH2BrQuy4GmmSGrtCbxNU4JzHKQYtKnu",
    "https://ipfs.moralis.io:2053/ipfs/QmRMrDDjQmmy6YKmf84TkNuZRd1v1d8XKLsW5dWD8ZsrW5",
    "https://ipfs.moralis.io:2053/ipfs/QmWRGcr2F4NLNAdKqjDiPcXu3GH2eqVp9eiB6FKM77gAkZ",
    "https://ipfs.moralis.io:2053/ipfs/QmcBaqJsTN51z4c4yihXRnFd3DAmCZUEBZ9EJjtP6ant3y",
    "https://ipfs.moralis.io:2053/ipfs/QmWYLMXAJsBxmLAWYTpdknnXGrDyqJXhBjA7fBqZXD1UbQ",
    "https://ipfs.moralis.io:2053/ipfs/QmTnHvBTspbzf9uuZ27D2LsuPcg7JU8wYainyuHAsmpxXY"];
    var ABI = [{
        "inputs": [
            {
                "internalType": "string[]",
                "name": "URI",
                "type": "string[]"
            }
        ],
        "name": "batchMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }];
    const options = {
        contractAddress: nft_contract_address,
        functionName: "batchMint",
        abi: ABI,
        params: { URI: Uris },
    };
    let tx = await Moralis.executeFunction(options);
    return tx.wait();
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
        68: "Helios",
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
        102: "Kingu",
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
    // THIS IS NEEDED FOR MAINNET ( ETH SENDING TO THE GNOSIS WALLET )
    // const options1 = {
    //     type: "native",
    //     receiver: "0xb0073A64D1424fF800262814Fd65E29AeceF5A46",
    //     amount: Moralis.Units.ETH(0.5),
    //     gasValue: 3000000
    // }
    // await Moralis.transfer(options1);
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
            stateMutability: "nonpayable",
            type: "function"
        },
    ];
    const options = {
        contractAddress: nft_contract_address,
        functionName: "mint",
        abi: ABI,
        params: { URI: metadataURI },
    };
    let tx = await Moralis.executeFunction(options);
    return tx.wait();
}


async function mintChosen(metadataURI){
    let chosenMintId = document.getElementById("mintSelected").value;
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
    return allowance; 
}

document.getElementById("logOut").onclick = logOut;
document.getElementById("getWallet").onclick = connectWallet;
document.getElementById("getCharacter").onclick = getNftPicture;
document.getElementById("mintC").onclick = getNftPicture2;
//document.getElementById("metadata").onclick = getAllMetadata;
document.getElementById("batch").onclick = batchMint;
