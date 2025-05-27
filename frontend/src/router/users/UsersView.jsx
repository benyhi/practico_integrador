import { useState, useEffect } from 'react';
import ModelForm from '../../components/ModelForm';
import ActionMenu from "../../components/ActionMenu";
import ModelTable from "../../components/ModelTable";
import { userService } from './services/UserService';

export default function UsersView() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await userService.getAll();
                setUsers(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchUsers();
    }, []);

    const handleAction = (action) => {
        if (action === 'create') {
            setEditingUser({ nombre: '', email: '', edad: '' });
            setShowForm(true);
        }
        if (action === 'edit' && selectedUser) {
            setEditingUser(selectedUser);
            setShowForm(true);
        }
        if (action === 'delete' && selectedUser) {
            if (window.confirm(`¿Estás seguro que deseas eliminar "${selectedUser.nombre}"?`)) {
                userService.delete(selectedUser.id)
                    .then(() => {
                        setUsers(users.filter(p => p.id !== selectedUser.id));
                        setSelectedUser(null);
                    })
                    .catch(error => {
                        console.error('Error al eliminar el usuario:', error);
                        alert(error.message);
                    });
            }
        }
    };

    const handleSubmit = async (data) => {
        if (!data) return;

        try {
            if (data.id) {
                const updatedUser = await userService.update(data.id, data);
                setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
                setSelectedUser(updatedUser);
            } else {
                const newUser = await userService.create(data);
                setUsers([...users, newUser]);
                setSelectedUser(newUser);
            }
            setShowForm(false);
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
            alert(error.message);
        }
    };


    return (
        <div>
            <h1>Vista de Usuarios</h1>
            <ActionMenu onAction={handleAction} selectedItem={selectedUser}/>
            <ModelTable 
                data={users} 
                selectedItem={selectedUser} 
                setSelectedItem={setSelectedUser} 
            />

            <ModelForm 
                visible={showForm}
                onHide={() => setShowForm(false)}
                model={editingUser}
                onSubmit={handleSubmit}
                title={editingUser?.id ? 'Editar Usuario' : 'Nuevo Usuario'}
            />
        </div>
    );
}