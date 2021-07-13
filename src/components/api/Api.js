import axios from 'axios';

export default axios.create({
    baseURL: "https://household-api-319710.as.r.appspot.com/api",
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    }
});