var load = require("protobufjs");
var request = require('request');

request.get({
    url: "http://api.bilibili.com/x/v2/dm/web/seg.so?type=1&oid=888269257&segment_index=1"
}, (err, response, body) => {
    if (!err && response.statusCode === 200) {
        console.log(body)
        let pbroot = require("protobufjs").Root;
        let json = require("./dm.js");
        console.log(json)
        let root = pbroot.fromJSON(json);

        let Message = root.lookupType("dm.DanmakuElem");
        //解码
        try {
            let message = Message.decode(body);
            console.log(message)
        } catch (e) {
            if (e instanceof protobuf.util.ProtocolError) {
                //missing required field
            } else {
                //wire format is invalid
            }
        }
        res.send(body);
    }
})
