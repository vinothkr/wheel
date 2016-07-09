class Response {
}

class HeartBeat extends Response {
    constructor(buffer) {
	super();
	this.errorCode = buffer.readInt16();
    }
}

module.exports = {
    'HeartBeat' : HeartBeat
};
