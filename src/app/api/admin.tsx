import agentAdmin from "./agentAdmin";

export function getDashboard() {
    return agentAdmin.get('/dashboard');
}

export function getSlogan() {
    return agentAdmin.get('/slogan');
}

export function updateSlogan(payload: object) {
    return agentAdmin.put('/slogan', payload);
}

export function getAbouts() {
    return agentAdmin.get('/abouts');
}

export function updateAbouts(payload: object) {
    return agentAdmin.put('/abouts', payload);
}