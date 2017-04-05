import config from './env/config.js';
import simpleRestClient from './util/rest.js';
const restClient = simpleRestClient(config.restserverurl);
export default (type, resource, params) => new Promise(resolve => setTimeout(() => resolve(restClient(type, resource, params)), 500));
