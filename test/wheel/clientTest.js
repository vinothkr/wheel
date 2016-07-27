const Client = require('../../src/wheel/client.js');

describe('Client', function() {
    it('should send heartbeart and receive error message', function() {
	const client = new Client("localhost", 9092, "clientId");
	

	client.heartBeat("groupId1", 1, "memberId1" , (response) => {
	    console.log(response);

	    client.heartBeat("groupId1", 1, "memberId1" , (response) => {
		console.log(response);
	    });
	});
	   
    });
});
