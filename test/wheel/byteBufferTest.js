const ByteBuffer = require('../../src/wheel/byteBuffer');
const expect = require('chai').expect;

describe('ByteBuffer', function() {
    it('should write int16 as 2 bytes', function() {
	const buffer = ByteBuffer.withSize(2);
	buffer.writeInt16(1);

	expect(buffer.buffer[0]).to.eql(0);
	expect(buffer.buffer[1]).to.eql(1);
    });

    it('should write int32 as 4 bytes', function() {
	const buffer = ByteBuffer.withSize(4);
	buffer.writeInt32(1);

	expect(buffer.buffer[0]).to.eql(0);
	expect(buffer.buffer[1]).to.eql(0);
	expect(buffer.buffer[2]).to.eql(0);
	expect(buffer.buffer[3]).to.eql(1);
    });

    it('should write string prefixed with length', function() {
	const buffer = ByteBuffer.withSize(20);
	buffer.writeString('hello');

	expect(buffer.buffer[0]).to.eql(0);
	expect(buffer.buffer[1]).to.eql(5);
	expect(String.fromCharCode(buffer.buffer[2])).to.eql('h');
	expect(String.fromCharCode(buffer.buffer[3])).to.eql('e');
	expect(String.fromCharCode(buffer.buffer[4])).to.eql('l');
	expect(String.fromCharCode(buffer.buffer[5])).to.eql('l');
	expect(String.fromCharCode(buffer.buffer[6])).to.eql('o');
    });

    it('should write bytes array prefixed with length', function() {
	const buffer = ByteBuffer.withSize(20);
	buffer.writeBytes([0,1,2]);

	expect(buffer.buffer[0]).to.eql(0);
	expect(buffer.buffer[1]).to.eql(0);
	expect(buffer.buffer[2]).to.eql(0);
	expect(buffer.buffer[3]).to.eql(3);
	expect(buffer.buffer[4]).to.eql(0);
	expect(buffer.buffer[5]).to.eql(1);
	expect(buffer.buffer[6]).to.eql(2);
    });
});
