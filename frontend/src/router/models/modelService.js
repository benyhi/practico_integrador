// frontend/src/routes/modelos/services/modelService.js
const API_BASE_URL = 'http://localhost:3000/api'; // URL base de tu API backend

export const modelService = {
    async getAll() {
        const response = await fetch(`${API_BASE_URL}/modelos`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error al obtener modelos' }));
            throw new Error(errorData.message || 'Error al obtener modelos');
        }
        return response.json();
    },

    async getById(id) {
        const response = await fetch(`${API_BASE_URL}/modelos/${id}`);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error al obtener el modelo' }));
            throw new Error(errorData.message || 'Error al obtener el modelo');
        }
        return response.json();
    },

    async create(modeloData) {
        const response = await fetch(`${API_BASE_URL}/modelos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modeloData)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error al crear el modelo' }));
            throw new Error(errorData.message || 'Error al crear el modelo');
        }
        return response.json();
    },

    async update(id, modeloData) {
        const response = await fetch(`${API_BASE_URL}/modelos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(modeloData)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error al actualizar el modelo' }));
            throw new Error(errorData.message || 'Error al actualizar el modelo');
        }
        return response.json();
    },

    async delete(id) {
        const response = await fetch(`${API_BASE_URL}/modelos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error al eliminar el modelo' }));
            throw new Error(errorData.message || 'Error al eliminar el modelo');
        }
        // Algunos DELETE devuelven 204 No Content y no tienen cuerpo JSON
        // Otros pueden devolver un mensaje. Ajusta según tu API.
        if (response.status === 204) {
            return { message: 'Modelo eliminado exitosamente (no content)' };
        }
        return response.json();
    }
};

// Si prefieres exportar por defecto:
// export default modelService;
// Y luego importarías con: import modelService from '...'