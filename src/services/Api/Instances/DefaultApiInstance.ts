import axios from 'axios';

const DefaultApiInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export { DefaultApiInstance };
