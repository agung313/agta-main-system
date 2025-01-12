import agentAdmin from "./agentAdmin";

export function getDashboard() {
    return agentAdmin.get('/dashboard');
}