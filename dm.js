/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.dm = (function() {

    /**
     * Namespace dm.
     * @exports dm
     * @namespace
     */
    var dm = {};

    dm.DmSegMobileReply = (function() {

        /**
         * Properties of a DmSegMobileReply.
         * @memberof dm
         * @interface IDmSegMobileReply
         * @property {Array.<dm.IDanmakuElem>|null} [elems] DmSegMobileReply elems
         */

        /**
         * Constructs a new DmSegMobileReply.
         * @memberof dm
         * @classdesc Represents a DmSegMobileReply.
         * @implements IDmSegMobileReply
         * @constructor
         * @param {dm.IDmSegMobileReply=} [properties] Properties to set
         */
        function DmSegMobileReply(properties) {
            this.elems = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DmSegMobileReply elems.
         * @member {Array.<dm.IDanmakuElem>} elems
         * @memberof dm.DmSegMobileReply
         * @instance
         */
        DmSegMobileReply.prototype.elems = $util.emptyArray;

        /**
         * Creates a new DmSegMobileReply instance using the specified properties.
         * @function create
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {dm.IDmSegMobileReply=} [properties] Properties to set
         * @returns {dm.DmSegMobileReply} DmSegMobileReply instance
         */
        DmSegMobileReply.create = function create(properties) {
            return new DmSegMobileReply(properties);
        };

        /**
         * Encodes the specified DmSegMobileReply message. Does not implicitly {@link dm.DmSegMobileReply.verify|verify} messages.
         * @function encode
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {dm.IDmSegMobileReply} message DmSegMobileReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DmSegMobileReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.elems != null && message.elems.length)
                for (var i = 0; i < message.elems.length; ++i)
                    $root.dm.DanmakuElem.encode(message.elems[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DmSegMobileReply message, length delimited. Does not implicitly {@link dm.DmSegMobileReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {dm.IDmSegMobileReply} message DmSegMobileReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DmSegMobileReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DmSegMobileReply message from the specified reader or buffer.
         * @function decode
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dm.DmSegMobileReply} DmSegMobileReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DmSegMobileReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dm.DmSegMobileReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.elems && message.elems.length))
                            message.elems = [];
                        message.elems.push($root.dm.DanmakuElem.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DmSegMobileReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dm.DmSegMobileReply} DmSegMobileReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DmSegMobileReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DmSegMobileReply message.
         * @function verify
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DmSegMobileReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.elems != null && message.hasOwnProperty("elems")) {
                if (!Array.isArray(message.elems))
                    return "elems: array expected";
                for (var i = 0; i < message.elems.length; ++i) {
                    var error = $root.dm.DanmakuElem.verify(message.elems[i]);
                    if (error)
                        return "elems." + error;
                }
            }
            return null;
        };

        /**
         * Creates a DmSegMobileReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dm.DmSegMobileReply} DmSegMobileReply
         */
        DmSegMobileReply.fromObject = function fromObject(object) {
            if (object instanceof $root.dm.DmSegMobileReply)
                return object;
            var message = new $root.dm.DmSegMobileReply();
            if (object.elems) {
                if (!Array.isArray(object.elems))
                    throw TypeError(".dm.DmSegMobileReply.elems: array expected");
                message.elems = [];
                for (var i = 0; i < object.elems.length; ++i) {
                    if (typeof object.elems[i] !== "object")
                        throw TypeError(".dm.DmSegMobileReply.elems: object expected");
                    message.elems[i] = $root.dm.DanmakuElem.fromObject(object.elems[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a DmSegMobileReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {dm.DmSegMobileReply} message DmSegMobileReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DmSegMobileReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.elems = [];
            if (message.elems && message.elems.length) {
                object.elems = [];
                for (var j = 0; j < message.elems.length; ++j)
                    object.elems[j] = $root.dm.DanmakuElem.toObject(message.elems[j], options);
            }
            return object;
        };

        /**
         * Converts this DmSegMobileReply to JSON.
         * @function toJSON
         * @memberof dm.DmSegMobileReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DmSegMobileReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DmSegMobileReply
         * @function getTypeUrl
         * @memberof dm.DmSegMobileReply
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DmSegMobileReply.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dm.DmSegMobileReply";
        };

        return DmSegMobileReply;
    })();

    dm.DanmakuElem = (function() {

        /**
         * Properties of a DanmakuElem.
         * @memberof dm
         * @interface IDanmakuElem
         * @property {number|Long|null} [id] DanmakuElem id
         * @property {number|null} [progress] DanmakuElem progress
         * @property {number|null} [mode] DanmakuElem mode
         * @property {number|null} [fontsize] DanmakuElem fontsize
         * @property {number|null} [color] DanmakuElem color
         * @property {string|null} [midHash] DanmakuElem midHash
         * @property {string|null} [content] DanmakuElem content
         * @property {number|Long|null} [ctime] DanmakuElem ctime
         * @property {number|null} [weight] DanmakuElem weight
         * @property {string|null} [action] DanmakuElem action
         * @property {number|null} [pool] DanmakuElem pool
         * @property {string|null} [idStr] DanmakuElem idStr
         */

        /**
         * Constructs a new DanmakuElem.
         * @memberof dm
         * @classdesc Represents a DanmakuElem.
         * @implements IDanmakuElem
         * @constructor
         * @param {dm.IDanmakuElem=} [properties] Properties to set
         */
        function DanmakuElem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DanmakuElem id.
         * @member {number|Long} id
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DanmakuElem progress.
         * @member {number} progress
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.progress = 0;

        /**
         * DanmakuElem mode.
         * @member {number} mode
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.mode = 0;

        /**
         * DanmakuElem fontsize.
         * @member {number} fontsize
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.fontsize = 0;

        /**
         * DanmakuElem color.
         * @member {number} color
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.color = 0;

        /**
         * DanmakuElem midHash.
         * @member {string} midHash
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.midHash = "";

        /**
         * DanmakuElem content.
         * @member {string} content
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.content = "";

        /**
         * DanmakuElem ctime.
         * @member {number|Long} ctime
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.ctime = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * DanmakuElem weight.
         * @member {number} weight
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.weight = 0;

        /**
         * DanmakuElem action.
         * @member {string} action
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.action = "";

        /**
         * DanmakuElem pool.
         * @member {number} pool
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.pool = 0;

        /**
         * DanmakuElem idStr.
         * @member {string} idStr
         * @memberof dm.DanmakuElem
         * @instance
         */
        DanmakuElem.prototype.idStr = "";

        /**
         * Creates a new DanmakuElem instance using the specified properties.
         * @function create
         * @memberof dm.DanmakuElem
         * @static
         * @param {dm.IDanmakuElem=} [properties] Properties to set
         * @returns {dm.DanmakuElem} DanmakuElem instance
         */
        DanmakuElem.create = function create(properties) {
            return new DanmakuElem(properties);
        };

        /**
         * Encodes the specified DanmakuElem message. Does not implicitly {@link dm.DanmakuElem.verify|verify} messages.
         * @function encode
         * @memberof dm.DanmakuElem
         * @static
         * @param {dm.IDanmakuElem} message DanmakuElem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DanmakuElem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.id);
            if (message.progress != null && Object.hasOwnProperty.call(message, "progress"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.progress);
            if (message.mode != null && Object.hasOwnProperty.call(message, "mode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.mode);
            if (message.fontsize != null && Object.hasOwnProperty.call(message, "fontsize"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.fontsize);
            if (message.color != null && Object.hasOwnProperty.call(message, "color"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint32(message.color);
            if (message.midHash != null && Object.hasOwnProperty.call(message, "midHash"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.midHash);
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.content);
            if (message.ctime != null && Object.hasOwnProperty.call(message, "ctime"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.ctime);
            if (message.weight != null && Object.hasOwnProperty.call(message, "weight"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.weight);
            if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                writer.uint32(/* id 10, wireType 2 =*/82).string(message.action);
            if (message.pool != null && Object.hasOwnProperty.call(message, "pool"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.pool);
            if (message.idStr != null && Object.hasOwnProperty.call(message, "idStr"))
                writer.uint32(/* id 12, wireType 2 =*/98).string(message.idStr);
            return writer;
        };

        /**
         * Encodes the specified DanmakuElem message, length delimited. Does not implicitly {@link dm.DanmakuElem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof dm.DanmakuElem
         * @static
         * @param {dm.IDanmakuElem} message DanmakuElem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DanmakuElem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DanmakuElem message from the specified reader or buffer.
         * @function decode
         * @memberof dm.DanmakuElem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {dm.DanmakuElem} DanmakuElem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DanmakuElem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.dm.DanmakuElem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.int64();
                        break;
                    }
                case 2: {
                        message.progress = reader.int32();
                        break;
                    }
                case 3: {
                        message.mode = reader.int32();
                        break;
                    }
                case 4: {
                        message.fontsize = reader.int32();
                        break;
                    }
                case 5: {
                        message.color = reader.uint32();
                        break;
                    }
                case 6: {
                        message.midHash = reader.string();
                        break;
                    }
                case 7: {
                        message.content = reader.string();
                        break;
                    }
                case 8: {
                        message.ctime = reader.int64();
                        break;
                    }
                case 9: {
                        message.weight = reader.int32();
                        break;
                    }
                case 10: {
                        message.action = reader.string();
                        break;
                    }
                case 11: {
                        message.pool = reader.int32();
                        break;
                    }
                case 12: {
                        message.idStr = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DanmakuElem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof dm.DanmakuElem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {dm.DanmakuElem} DanmakuElem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DanmakuElem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DanmakuElem message.
         * @function verify
         * @memberof dm.DanmakuElem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DanmakuElem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id) && !(message.id && $util.isInteger(message.id.low) && $util.isInteger(message.id.high)))
                    return "id: integer|Long expected";
            if (message.progress != null && message.hasOwnProperty("progress"))
                if (!$util.isInteger(message.progress))
                    return "progress: integer expected";
            if (message.mode != null && message.hasOwnProperty("mode"))
                if (!$util.isInteger(message.mode))
                    return "mode: integer expected";
            if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                if (!$util.isInteger(message.fontsize))
                    return "fontsize: integer expected";
            if (message.color != null && message.hasOwnProperty("color"))
                if (!$util.isInteger(message.color))
                    return "color: integer expected";
            if (message.midHash != null && message.hasOwnProperty("midHash"))
                if (!$util.isString(message.midHash))
                    return "midHash: string expected";
            if (message.content != null && message.hasOwnProperty("content"))
                if (!$util.isString(message.content))
                    return "content: string expected";
            if (message.ctime != null && message.hasOwnProperty("ctime"))
                if (!$util.isInteger(message.ctime) && !(message.ctime && $util.isInteger(message.ctime.low) && $util.isInteger(message.ctime.high)))
                    return "ctime: integer|Long expected";
            if (message.weight != null && message.hasOwnProperty("weight"))
                if (!$util.isInteger(message.weight))
                    return "weight: integer expected";
            if (message.action != null && message.hasOwnProperty("action"))
                if (!$util.isString(message.action))
                    return "action: string expected";
            if (message.pool != null && message.hasOwnProperty("pool"))
                if (!$util.isInteger(message.pool))
                    return "pool: integer expected";
            if (message.idStr != null && message.hasOwnProperty("idStr"))
                if (!$util.isString(message.idStr))
                    return "idStr: string expected";
            return null;
        };

        /**
         * Creates a DanmakuElem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof dm.DanmakuElem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {dm.DanmakuElem} DanmakuElem
         */
        DanmakuElem.fromObject = function fromObject(object) {
            if (object instanceof $root.dm.DanmakuElem)
                return object;
            var message = new $root.dm.DanmakuElem();
            if (object.id != null)
                if ($util.Long)
                    (message.id = $util.Long.fromValue(object.id)).unsigned = false;
                else if (typeof object.id === "string")
                    message.id = parseInt(object.id, 10);
                else if (typeof object.id === "number")
                    message.id = object.id;
                else if (typeof object.id === "object")
                    message.id = new $util.LongBits(object.id.low >>> 0, object.id.high >>> 0).toNumber();
            if (object.progress != null)
                message.progress = object.progress | 0;
            if (object.mode != null)
                message.mode = object.mode | 0;
            if (object.fontsize != null)
                message.fontsize = object.fontsize | 0;
            if (object.color != null)
                message.color = object.color >>> 0;
            if (object.midHash != null)
                message.midHash = String(object.midHash);
            if (object.content != null)
                message.content = String(object.content);
            if (object.ctime != null)
                if ($util.Long)
                    (message.ctime = $util.Long.fromValue(object.ctime)).unsigned = false;
                else if (typeof object.ctime === "string")
                    message.ctime = parseInt(object.ctime, 10);
                else if (typeof object.ctime === "number")
                    message.ctime = object.ctime;
                else if (typeof object.ctime === "object")
                    message.ctime = new $util.LongBits(object.ctime.low >>> 0, object.ctime.high >>> 0).toNumber();
            if (object.weight != null)
                message.weight = object.weight | 0;
            if (object.action != null)
                message.action = String(object.action);
            if (object.pool != null)
                message.pool = object.pool | 0;
            if (object.idStr != null)
                message.idStr = String(object.idStr);
            return message;
        };

        /**
         * Creates a plain object from a DanmakuElem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof dm.DanmakuElem
         * @static
         * @param {dm.DanmakuElem} message DanmakuElem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DanmakuElem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.id = options.longs === String ? "0" : 0;
                object.progress = 0;
                object.mode = 0;
                object.fontsize = 0;
                object.color = 0;
                object.midHash = "";
                object.content = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ctime = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ctime = options.longs === String ? "0" : 0;
                object.weight = 0;
                object.action = "";
                object.pool = 0;
                object.idStr = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                if (typeof message.id === "number")
                    object.id = options.longs === String ? String(message.id) : message.id;
                else
                    object.id = options.longs === String ? $util.Long.prototype.toString.call(message.id) : options.longs === Number ? new $util.LongBits(message.id.low >>> 0, message.id.high >>> 0).toNumber() : message.id;
            if (message.progress != null && message.hasOwnProperty("progress"))
                object.progress = message.progress;
            if (message.mode != null && message.hasOwnProperty("mode"))
                object.mode = message.mode;
            if (message.fontsize != null && message.hasOwnProperty("fontsize"))
                object.fontsize = message.fontsize;
            if (message.color != null && message.hasOwnProperty("color"))
                object.color = message.color;
            if (message.midHash != null && message.hasOwnProperty("midHash"))
                object.midHash = message.midHash;
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.ctime != null && message.hasOwnProperty("ctime"))
                if (typeof message.ctime === "number")
                    object.ctime = options.longs === String ? String(message.ctime) : message.ctime;
                else
                    object.ctime = options.longs === String ? $util.Long.prototype.toString.call(message.ctime) : options.longs === Number ? new $util.LongBits(message.ctime.low >>> 0, message.ctime.high >>> 0).toNumber() : message.ctime;
            if (message.weight != null && message.hasOwnProperty("weight"))
                object.weight = message.weight;
            if (message.action != null && message.hasOwnProperty("action"))
                object.action = message.action;
            if (message.pool != null && message.hasOwnProperty("pool"))
                object.pool = message.pool;
            if (message.idStr != null && message.hasOwnProperty("idStr"))
                object.idStr = message.idStr;
            return object;
        };

        /**
         * Converts this DanmakuElem to JSON.
         * @function toJSON
         * @memberof dm.DanmakuElem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DanmakuElem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DanmakuElem
         * @function getTypeUrl
         * @memberof dm.DanmakuElem
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DanmakuElem.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/dm.DanmakuElem";
        };

        return DanmakuElem;
    })();

    return dm;
})();

module.exports = $root;
