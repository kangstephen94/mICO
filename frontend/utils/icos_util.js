import axios from 'axios';

export const getIcos = () => (
    axios({
        url: 'http://localhost:5000/api/icos',
        method: 'GET'
    })
);
