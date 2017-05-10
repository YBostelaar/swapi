import qs from 'qs';
import { API_ENDPOINT } from 'config/api';

const request = ({ path, options, handle401 }) => new Promise((resolve, reject) => {
    fetch(path, options)
        .then((response) => {
            const unauthorized = response.status === 401 || response.status === 403;
            if (unauthorized && handle401) {
                console.log('unauthorized');
            }

            if (response.ok) {
                return response.json();
            }

            return Promise.reject(response.statusText);
        })
        .then((json) => {
            console.info('API call succeeded:', json);
            resolve(json);
        })
        .catch((error) => {
            console.error('API call failed:', error);
            reject(error);
        });
});

const generateOptions = ({ method, path, query, body }) => ({
    path: `${API_ENDPOINT}${path}${query ? '?' : ''}${qs.stringify(query || {})}`,
    options: {
        headers: {
            'Content-Type': 'application/json',
        },
        method,
        ...(body ? { body: JSON.stringify(body) } : {}),
    },
});

export const get = ({ path, query }) =>
    request(generateOptions({ method: 'GET', path, query }));
export const del = ({ path, query }) =>
    request(generateOptions({ method: 'DELETE', path, query }));
export const post = ({ path, body }) =>
    request(generateOptions({ method: 'POST', path, body }));
export const put = ({ path, body }) =>
    request(generateOptions({ method: 'PUT', path, body }));
