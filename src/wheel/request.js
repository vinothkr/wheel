const sizeOf = require('./sizes')
const _ = require('lodash')

class Request {
    constructor(apiKey, size) {
	this.apiKey = apiKey;
	this.size = size;
    }

    writeTo(buffer) {
	throw "Not Implemented";
    }
}

class TopicMetadata extends Request {
    constructor(topics) {
	super(3, _.sum(topics.map(sizeOf.string)));
	this.topics = topics;
    }

    writeTo(buffer) {
	buffer.writeInt32(this.topics.length);
	for(var topic in this.topics) {
	    buffer.writeString(topic);
	}
    }
}




class HeartBeat extends Request {
    constructor(groupId, generationId, memberId) {
	super(12, sizeOf.string(groupId) + sizeOf.int32 + sizeOf.string(memberId));
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
    'HeartBeat' : HeartBeat,
    'TopicMetadata' : TopicMetadata
};
