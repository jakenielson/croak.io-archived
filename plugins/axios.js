import * as axios from 'axios';

let options = {}

// The server-side needs a full url to work
if (process.server) {
  options.baseURL = process.env.BASE_URL || 'http://localhost:3000';
}

export default axios.create(options);