// frontend/src/routes/modelos/services/modelService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/products';

export const modelService = {
    async getAll() {
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener modelos');
        }
    },

    async getById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener el modelo');
        }
    },

    async create(modeloData) {
        try {
            const response = await axios.post(`${API_BASE_URL}`, modeloData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al crear el modelo');
        }
    },

    async update(id, modeloData) {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, modeloData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al actualizar el modelo');
        }
    },

    async delete(id) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data || { message: 'Modelo eliminado exitosamente' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al eliminar el modelo');
        }
    }
};
