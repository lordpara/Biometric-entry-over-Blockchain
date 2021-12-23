import Web3 from 'web3'
import {connectWallet} from './connectWallet.js'
import contractjson from '../Contracts/Entrylog.json';
let contractAddress = '0xeBe2F4D1Ed57ea7bf105DAbb988a6B21112cAd80';
let address = '0x95B7FbdCAfEBF2434119816C037c80Cbf0519403'

let loadweb3 = async function () {

    window.web3 = new Web3(window.web3.currentProvider)
    const web3 = window.web3
    console.log("Injected Web3 Detected")

    return web3;
};

let loadContract = async function (_nyuid) {
    let response
    //const connection = await connectWallet()
    //console.log(connection)
    const web3 = await loadweb3()
    let contract = new web3.eth.Contract(contractjson.abi, contractAddress);
    console.log(_nyuid)
    contract.methods.LogEntry(_nyuid).send({ from: address }).on('transactionHash', (hash) => {
        response = "Success"
    });

    return response
};

/*let loadlogs = async function (_nyuid) {
    let response

    const web3 = await loadweb3()
    let contract = new web3.eth.Contract(contractjson.abi, contractAddress);
    let response = await contract.methods.logs(_nyuid).call()

    return response
};*/
/*let isSupported = async function (network) {

    let value = false
    if (support_network.includes(network)){
        value = true
    }
    return value;
};*/

/*let changeNetwork = async function (ID) {

    window.web3 = new Web3(window.web3.currentProvider)
    const web3 = window.web3
    web3.setProvider(ID)
    console.log("Network changed")
};*/

//export {changeNetwork};
//export {isSupported};
export {loadweb3};
export {loadContract};
//export {loadlogs};