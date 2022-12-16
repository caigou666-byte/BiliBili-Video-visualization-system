var root = protobuf.Root.fromJSON({
    "nested": {
        "protocol": {
            "options": {
                "go_package": "/protocol"
            },
            "nested": {
                "Message": {
                    "fields": {
                        "id": {
                            "type": "int64",
                            "id": 1
                        },
                        "progress": {
                            "type": "int32",
                            "id": 2
                        },
                        "mode": {
                            "type": "int32",
                            "id": 3
                        },
                        "fontsize": {
                            "type": "int32",
                            "id": 4
                        },
                        "color": {
                            "type": "uint32",
                            "id": 5
                        },
                        "midHash": {
                            "type": "string",
                            "id": 6
                        },
                        "content": {
                            "type": "string",
                            "id": 7
                        },
                        "ctime": {
                            "type": "int64",
                            "id": 8
                        },
                        "weight": {
                            "type": "int32",
                            "id": 9
                        },
                        "action": {
                            "type": "string",
                            "id": 10
                        },
                        "pool": {
                            "type": "int32",
                            "id": 11
                        },
                         "idStr": {
                            "type": "string",
                            "id": 12
                        }
                    }
                }
            }
        }
    }
});

let messageProto = root.lookup("protocol.Message")
let reader = new FileReader();

reader.readAsArrayBuffer(message.data);

reader.onload = ((event) => {
    let messagePB = messageProto.decode(new Uint8Array(event.target.result))

})