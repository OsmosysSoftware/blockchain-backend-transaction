# Blockchain Messaging API

This API allows storing and retrieving user-specific messages on the blockchain. All blockchain operations are performed via a single application account, and each message is associated with a `userId` to distinguish between users.

## Base URL

```
http://localhost:3000
```

## Endpoints

### Store a Message

**Endpoint**:
`POST /store-message`

**Description**:
Stores a message on the blockchain for a specific user.

**Request Body**:

```json
{
  "userId": 2,
  "message": "Second User Message -  Blockchain!",
  "data": {"type": "info"}
}
```

| Parameter | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| `userId`  | Number | The ID of the user storing the message |
| `message` | String | The message to store                   |
| `data`    | JSON   | Additional data related to the message |

**cURL**

```bash
curl --location 'http://localhost:3000/store-message' \
--header 'Content-Type: application/json' \
--data '{
  "userId": 2,
  "message": "Second User Message -  Blockchain!",
  "data": {"type": "info"}
}'
```

**Response**:

```json
{
    "success": true,
    "receipt": {
        "blockHash": "0x00006714000019bc7627241c54e76cfd3f436b6103bd57fbb8afb27bd24d3181",
        "blockNumber": "26795591",
        "cumulativeGasUsed": "227611",
        "effectiveGasPrice": "3500000000",
        "from": "0xfbdd4988a3899147130a9224069229783a3b3786",
        "gasUsed": "227611",
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": "1",
        "to": "0xb3cbee4f6a8868bcc33da1494d4b951040b0a025",
        "transactionHash": "0x13bef8fe55dfbc0ee4e9ba527cbfbb6a8e3fc6548f6788e6fdad40e68de36092",
        "transactionIndex": "0",
        "type": "2"
    }
}
```

---

### Get All Messages

**Endpoint**:
`GET /get-all-messages`

**Description**:
Fetches all stored messages from the blockchain.

**cURL**

```bash
curl --location 'http://localhost:3000/get-all-messages'
```

**Response**:

```json
[
    {
        "0": "1",
        "1": "Hello Blockchain!",
        "2": "{\"type\":\"info\"}",
        "__length__": 3,
        "userId": "1",
        "message": "Hello Blockchain!",
        "data": "{\"type\":\"info\"}"
    },
    {
        "0": "2",
        "1": "Second User Message -  Blockchain!",
        "2": "{\"type\":\"info\"}",
        "__length__": 3,
        "userId": "2",
        "message": "Second User Message -  Blockchain!",
        "data": "{\"type\":\"info\"}"
    }
]
```

---

### Get Messages by User ID

**Endpoint**:
`GET /get-messages-by-user/:userId`

**Description**:
Fetches all messages associated with a specific user.

**Path Parameter**:
| Parameter | Type | Description |
|-----------|--------|-----------------------------------|
| `userId` | Number | The ID of the user to fetch messages for |

**cURL**

```bash
curl --location 'http://localhost:3000/get-messages-by-user/2'
```


**Response**:

```json
[
    {
        "0": "2",
        "1": "Second User Message -  Blockchain!",
        "2": "{\"type\":\"info\"}",
        "__length__": 3,
        "userId": "2",
        "message": "Second User Message -  Blockchain!",
        "data": "{\"type\":\"info\"}"
    }
]
```

---
