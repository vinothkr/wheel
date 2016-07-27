class ByteBuffer {
    constructor(buffer) {
	this.start = 0;
	this.buffer = buffer;
    }
    
    writeInt16(value) {
	this.buffer.writeInt16BE(value, this.start);
	this.start += 2;
    }

    writeInt32(value) {
	this.buffer.writeInt32BE(value, this.start);
	this.start += 4;
    }

    writeString(value) {
	this.writeInt16(value.length);
	this.buffer.write(value, this.start, value.length);
	this.start += value.length;
    }
    
    writeBytes(value) {
	this.writeInt32(value.length);
	(new Buffer(value)).copy(this.buffer, this.start, 0);
	this.start += value.length;
    }

    readInt16() {
	this.start += 2;
	return this.buffer.readInt16BE(this.start - 2);
    }
    
    readInt32() {
	this.start +=4;
	return this.buffer.readInt32BE(this.start - 4);
    }
    
    readString() {
	const size = this.readInt16();
	this.start += size;
	return this.buffer.toString('utf8', this.start - size, this.start);
    }

    readArrayOf(reader) {
	const size = this.readInt32();
	const result = [];
	for(var i = 0; i < size; i ++) {
	    result.push(reader(this));
	}
	return result;
    }

    static withSize(size) {
	return new ByteBuffer(new Buffer(size));
    }
}


module.exports = ByteBuffer;
