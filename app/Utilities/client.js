import axios from 'axios';

const request = axios.create({
	baseURL: 'https://crowded-overalls-pig.cyclic.app/api',
});

export const client = request;

export const apiURL = path => `https://crowded-overalls-pig.cyclic.app/api/${path}`;
