const ByteBuffer = require('../../src/wheel/byteBuffer');
const request = require('../../src/wheel/request')
const sinon = require('sinon');

describe('Request', function() {
    it('should write HeartBeat to buffer', function() {
	const buffer = ByteBuffer.withSize(23)
	const mock = sinon.mock(buffer);					   
	const heartBeat = new request.HeartBeat('groupId', 1, 'memberId');
	
	mock.expects('writeString').once().withArgs('groupId');
	mock.expects('writeInt32').once().withArgs(1);
	mock.expects('writeString').once().withArgs('memberId');

	heartBeat.writeTo(buffer);
	
	mock.verify();
    });
});
