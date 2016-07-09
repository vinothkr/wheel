const ByteBuffer = require('../../src/wheel/byteBuffer');
const response = require('../../src/wheel/response');
const expect = require('chai').expect;
const sinon = require('sinon');

describe('Response', function() {
    it('should read HeartBeat from buffer', function() {
	const buffer = ByteBuffer.withSize(2);
	const stub = sinon.stub(buffer, 'readInt16');

	stub.onFirstCall().returns(10);
	
	const heartBeat = new response.HeartBeat(buffer);
	expect(heartBeat.errorCode).to.eql(10);
    });
});
