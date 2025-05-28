import { Button } from 'primereact/button';

export default function ActionMenu({ onAction, selectedItem }) {
    const handleAction = (action) => {
        if (onAction) onAction(action);
    };

    return (
        <div className="p-d-flex" style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
            <Button 
                label="Nuevo" 
                icon="pi pi-plus" 
                className="p-button-success p-mr-2" 
                onClick={() => handleAction('create')} 
            />
            <Button 
                label="Editar" 
                icon="pi pi-pencil" 
                className="p-button-warning p-mr-2" 
                onClick={() => handleAction('edit')} 
                disabled={!selectedItem}
            />
            <Button 
                label="Eliminar" 
                icon="pi pi-trash" 
                className="p-button-danger" 
                onClick={() => handleAction('delete')} 
                disabled={!selectedItem}
            />
            <Button
                label="Exportar PDF"
                icon="pi pi-file-pdf"
                className="p-button-secondary"
                onClick={() => handleAction('export')} 
            />
        </div>
    );
}
