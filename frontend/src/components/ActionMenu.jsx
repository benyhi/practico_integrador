import { Button } from 'primereact/button';

export default function ActionMenu({ onAction }) {

    const handleAction = (action) => {
        if (onAction) {
            onAction(action);
        }
    };

    return (
        <div className="action-menu">
            <Button onClick={() => handleAction('create')}>Nuevo</Button>
            <Button onClick={() => handleAction('edit')}>Editar</Button >
            <Button  onClick={() => handleAction('delete')}>Eliminar</Button >
        </div>
    );
}

