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