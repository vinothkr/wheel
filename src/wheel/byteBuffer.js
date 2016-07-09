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
	this.buffer.write(value, this.start, value.length, 'UTF-8');
	this.start += value.length + 2;
    }
    
    writeBytes(value) {
	this.writeInt32(value.length);
	(new Buffer(value)).copy(this.buffer, this.start, 0);
	this.start += value.length + 4;
    }

    readInt16() {
	this.start += 2;
	return this.buffer.readInt16BE(this.start - 2);
    }
    
    static withSize(size) {
	return new ByteBuffer(new Buffer(size));
    }
}


module.exports = ByteBuffer;
