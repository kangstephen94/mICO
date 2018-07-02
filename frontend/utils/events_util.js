import axios from 'axios';

export const getEvents = () => {
  return (
    axios({
      url: 'https://mico-ios.herokuapp.com/api/events',
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
        }
    })
);
};
