class Response {
}

class HeartBeat extends Response {
    constructor(buffer) {
	super();
	this.errorCode = buffer.readInt16();
    }
}

class TopicMetadata extends Response {
    constructor(buffer) {
	super();
	this.brokers = buffer.readArrayOf(this.readBroker);
	this.topics = buffer.readArrayOf(this.readTopic);	
    }
    
    readTopic(buffer) {
	function readPartition(buffer) {
	    return {
		errorCode : buffer.readInt16(),
		id : buffer.readInt32(),
		leader : buffer.readInt32(),
		replicas : buffer.readArrayOf(buffer.readInt32),
		isr : buffer.readArrayOf(buffer.readInt32)
	    };
	}
	return {
	    errorCode : buffer.readInt16(),
	    name : buffer.readString(),
	    partitions : buffer.readArrayOf(readPartition)
	}
    }

    readBroker(buffer) {
	return {
	    nodeId : buffer.readInt32(),
	    host : buffer.readString(),
	    port : buffer.readInt32()
	};
    }
}

module.exports = {
    'HeartBeat' : HeartBeat,
    'TopicMetadata' : TopicMetadata
};
