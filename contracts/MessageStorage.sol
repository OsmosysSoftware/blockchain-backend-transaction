// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MessageStorage {
    struct Message {
        uint userId;
        string message;
        string data;
    }

    Message[] public messages;

    function storeMessage(uint _userId, string memory _message, string memory _data) public {
        messages.push(Message(_userId, _message, _data));
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getMessagesByUserId(uint _userId) public view returns (Message[] memory) {
        uint count = 0;
        for (uint i = 0; i < messages.length; i++) {
            if (messages[i].userId == _userId) {
                count++;
            }
        }

        Message[] memory result = new Message[](count);
        uint j = 0;
        for (uint i = 0; i < messages.length; i++) {
            if (messages[i].userId == _userId) {
                result[j] = messages[i];
                j++;
            }
        }

        return result;
    }
}
