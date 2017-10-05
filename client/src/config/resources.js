const testing = process.env.NODE_ENV === 'test';
const apiUrl = `${testing ? 'http://localhost' : ''}/api`;

export const TODOS_PATH = apiUrl + '/todos';