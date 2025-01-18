import agent from './agent';

export function getDashboard() {
    return agent.get('/dashboard');
}

export function getAbouts() {
    return agent.get('/abouts');
}

export function getServices() {
    return agent.get('/services');
}

export function getContacts() {
    return agent.get('/contacts');
}

export function login(payload: object) {
    return agent.post('/login', payload);
}

export function sigUp(payload: object) {
    return agent.post('/signup', payload);
}

export function sentMessage(payload: object) {
    return agent.post('/messages', payload);
}

export function visitor(payload: object) {
    return agent.post('/visitor', payload);
}

export function signUp(payload: object) {
    return agent.post('/signup', payload);
  }
