import axios from 'axios';

export const getEvents = () => (
    axios({
        url: 'http://localhost:5000/api/events',
        method: 'GET'
    })
);
