import { useState, useEffect } from 'react';
import ActionMenu from './ActionMenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ModelTable({ data, selectedItem, setSelectedItem, onAction }) {
    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];

    const handleAction = (action) => {
        // Esta funcion pasa el action que se pulso (create, edit, delete) 
        // y tambien el item del modelo seleccionado para manejar
        // la llamada al servicio desde el componente padre de la vista del modelo.
        if (onAction) {
            onAction(action, selectedItem);
        }
        console.log(`Accion: ${action}, Item Seleccionado:`, selectedItem);
    }

    return (
        <div>
        <ActionMenu onAction={handleAction}/>
        <DataTable 
            className='container'
            value={data} 
            selectionMode='single'
            selection={selectedItem}
            onSelectionChange={(e) => {
                console.log('Selected Item:', e.value);
                setSelectedItem(e.value);
            }}
            strippedRows 
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
        >
            
            {columns.map((key) => (
                <Column key={key} field={key} header={key.charAt(0).toUpperCase() + key.slice(1)}  sortable />
            ))}

        </DataTable>

        </div>
    );
}
