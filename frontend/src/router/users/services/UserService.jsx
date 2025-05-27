import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/users';

export const userService = {
    async getAll() {
        try {
            const response = await axios.get(`${API_BASE_URL}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener usuarios');
        }
    },

    async getById(id) {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al obtener el usuario');
        }
    },

    async create(userData) {
        try {
            const response = await axios.post(`${API_BASE_URL}`, userData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al crear el usuario');
        }
    },

    async update(id, userData) {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, userData, {
                headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al actualizar el usuario');
        }
    },

    async delete(id) {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${id}`);
            return response.data || { message: 'Usuario eliminado exitosamente' };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error al eliminar el usuario');
        }
    }
};
