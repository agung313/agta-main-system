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

export function getServices() {
  return agentAdmin.get('/services');
}

export function updateServices(payload: object) {
  return agentAdmin.put('/services', payload);
}

export function getContact() {
  return agentAdmin.get('/contacts');
}

export function updateContact(payload: object) {
  return agentAdmin.put('/contacts', payload);
}

export function delImageData(payload: { filename: string }) {
  return agentAdmin.delete(`/deleteImage`, {
    params: payload, // Mengirimkan filename sebagai query parameter
  });
}

interface UploadImageResponse {
  // Define the structure of the response data here
  url: string;
  // Add other fields as necessary
}

export async function uploadImage(file: File): Promise<UploadImageResponse> {
  try {
    // Buat FormData dan tambahkan file
    const formData = new FormData();
    formData.append("image", file); // Pastikan key ini sesuai dengan backend Anda

    // Kirim data ke backend
    const response = await agentAdmin.post("/uploadImage", formData, {
    headers: {
        "Content-Type": "multipart/form-data", // Pastikan ini ditambahkan
    },
    });

    return response.data.filenames[0]; // Kembalikan data dari backend
  } catch (error) {
    console.error(error); // eslint-disable-line
    throw error; // Rethrow the error after logging it
  }
}