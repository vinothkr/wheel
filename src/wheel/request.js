const sizeOf = require('./sizes')

class Request {
    constructor(size) {
	this.size = size
    }

    writeTo(buffer) {
	throw "Not Implemented";
    }
}


class HeartBeat extends Request {
    constructor(groupId, generationId, memberId) {
	super(sizeOf.string(groupId) + sizeOf.int32 + sizeOf.string(memberId));
	this.groupId = groupId;
	this.generationId = generationId;
	this.memberId = memberId;
    }

    writeTo(buffer) {
	buffer.writeString(this.groupId);
	buffer.writeInt32(this.generationId);
	buffer.writeString(this.memberId);
    }
}

module.exports = {
    'HeartBeat' : HeartBeat
};
