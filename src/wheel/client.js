const sizeOf = require('./sizes');
const ByteBuffer = require('./byteBuffer');
const request = require('./request');
const response = require('./response');
const net = require('net');

class Client {
    constructor(host, port, clientId) {
	this.clientId = clientId;
	this.socket = new net.Socket();
	this.socket.connect({host: host, port: port});
	this.socket.on('data', this.listener());
	this.nextId = 0;
	this.callbacks = {};
    }

    nextCorrelationId() {
	this.nextId = this.nextId + 1;
	return this.nextId;
    }

    send(request, callback) {
	const size = request.size + sizeOf.int16 * 2 + sizeOf.int32 + sizeOf.string(this.clientId);
	const buffer = ByteBuffer.withSize(size);
	const correlationId = this.nextCorrelationId();
	buffer.writeInt32(size);
	buffer.writeInt16(request.apiKey);
	buffer.writeInt16(0);
	buffer.writeInt32(correlationId);
	buffer.writeString(this.clientId);
	request.writeTo(buffer);
	console.log("Is flushed? " + this.socket.write(buffer.buffer));
	this.callbacks[correlationId] = callback;
    }

    deliver(data) {
	const buffer = new ByteBuffer(data);
	const correlationId = buffer.readInt32();
	const current = this.callbacks[correlationId];
	delete this.callbacks[correlationId];
	return current(buffer);
    }
    
    listener() {
	var remainingSize = 0;
	var soFar = null;
	const result =  (data) => {
	    console.log("Here" + data.length +" " + remainingSize);
	    if(remainingSize == 0) {
		remainingSize = data.readInt32BE();
		soFar = new Buffer(remainingSize);
		return result(data.slice(4));
	    }
	    else if(remainingSize <= data.length) {
		data.copy(soFar, soFar.length - remainingSize, 0, remainingSize);
		this.deliver(data);
		const rest = data.slice(remainingSize);
		remainingSize = 0;
		soFar = null;
		if(rest.length > 0) return result(rest);
	    }
	    else {
		data.copy(soFar, soFar.length - remaininSize);
		remainingSize -= data.length;
	    }
	}
	return result;
    }

    heartBeat(groupId, generationId, memberId, callback) {
	this.send(new request.HeartBeat(groupId, generationId, memberId), (buffer) => {
	    callback(new response.HeartBeat(buffer));
	});
    }

    topicMetadata(topics, callback) {
	this.send(new request.TopicMetadata(topics), (buffer) => {
	    callback(new response.TopicMetadata(buffer));
	});
    }
}

module.exports = Client;


const client = new Client("localhost", 9092, "clientId");
client.topicMetadata(['products'], function(response) {
    console.log(response);
    client.topicMetadata(['products'], function(response) {
	console.log(response);
    });
});

for(var i = 0; i< 3; i ++) {
    client.heartBeat("groupId1", 1, "memberId1" , (response) => {
	client.heartBeat("groupId2", 1, "memberId" , (response) => {
	    console.log(response);
	});  
	console.log(response);
    });    
}

