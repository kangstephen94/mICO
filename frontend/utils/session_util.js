import axios from 'axios';

export const getUser = () => (
    axios({
        url: 'http://localhost:5000/api/current_user',
        method: 'GET'
    })
);
