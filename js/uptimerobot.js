/*$(document).ready(function() {
	var timerId = $("#td_uptime").uptimeRobotMonitor({
		mainApiKey : 'u169587-be15122462001f708a75915e',
		//numOfRows: 1, //Use this or numOfMonitorsPerRow
		numOfMonitorsPerRow : 3,
		monitorConfs : [
		    {
				friendlyName : 'tests.abc',
				name : 'http://www.munichre.com (test)',
				// color : '#E67EA8'
		    },
		    {
				friendlyName : 'www.abc',
				name : 'http://www.munichre.com (www)',
				// color : '#E67EA8'
		    },
		    {
				friendlyName : 'abc',
				name : 'http://www.munichre.com (abc)',
				//color : '#ff6600'
		    },
		
		]
	});
});
*/

$( document ).ready(function() {
	var timerId1 = $("#td_uptime1").uptimeRobotMonitor({monitorConfs: [
	    {
	        apiKey: "m776367159-8e265aef42a7ae3ef4736884",
	    }]});
	});

$( document ).ready(function() {
	var timerId2 = $("#td_uptime2").uptimeRobotMonitor({monitorConfs: [
	    {
	        apiKey: "m776367162-3ce036cb796a80ba1430db47",
	    }],    
	    containerClass: "uptimeContainer2",
	    containerId: "uptimeContainer2",
	});});

$( document ).ready(function() {
	var timerId2 = $("#td_uptime3").uptimeRobotMonitor({monitorConfs: [
	    {
	        apiKey: "m776367293-6c007ce88ae26ba91441a76b",
	    }],    
	    containerClass: "uptimeContainer32",
	    containerId: "uptimeContainer32",
	});});
