import Web3 from 'web3'
import {loadweb3} from './web3tools.js';
let kit;

let connectWallet = async function () {
    if (window.web3){
        try{
            //window.web3 = new Web3(window.web3.currentProvider)
            //const web3 = window.web3
            const web3 = await loadweb3()
            console.log("Injected Web3 Detected")
            const accounts = await web3.eth.getAccounts();
            const netID = await window.web3.currentProvider.networkVersion
            return {"network":netID, "account":accounts[0]};

        } catch (error) {
            //notification(`⚠️ ${error}.`)
            console.log("Error! -  No MetaMask on the Browser");
            console.log({ error });
            //this.setState({ loading: false })
        }
    }

  };

export {connectWallet};