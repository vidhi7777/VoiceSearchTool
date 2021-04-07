const request = require('request');

const options = {
  method: 'GET',
  url: 'https://visual-crossing-weather.p.rapidapi.com/history',
  qs: {
    startDateTime: '2019-01-01T00:00:00',
    aggregateHours: '24',
    location: 'seattle',
    endDateTime: '2019-01-04T00:00:00',
    unitGroup: 'us',
    dayStartTime: '8:00:00',
    contentType: 'csv',
    dayEndTime: '17:00:00',
    shortColumnNames: '0'
  },
  headers: {
    'x-rapidapi-key': '6bbb550beamsh6a168b46b4ee66dp1a3c6ejsn4f67f366e82a',
    'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	// if (error) throw new Error(error);

	// console.log(body);

    if(error){
        console.log ('Unable to connect to weather services!')
    } else if(body.error){
        console.log ('Unable to find location. Try another search.')
    } else{
        console.log(body)
    }

});