pragma solidity ^0.5.0;

contract Entrylog {

    address public owner;


    mapping(string => uint[]) public logs;

    constructor() public{
        owner = msg.sender;
    }

    function LogEntry(string memory _nyuid) public{
        require(msg.sender == owner);
        logs[_nyuid].push(block.timestamp);
    }

}
