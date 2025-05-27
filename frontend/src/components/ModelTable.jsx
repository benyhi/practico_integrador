import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function ModelTable({ data, selectedItem, setSelectedItem }) {
    const columns = data && data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <DataTable 
            className='container'
            value={data} 
            selectionMode='single'
            selection={selectedItem}
            onSelectionChange={(e) => setSelectedItem(e.value)}
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
        >
            
            {columns.map((key) => (
                <Column key={key} field={key} header={key.charAt(0).toUpperCase() + key.slice(1)}  sortable />
            ))}

        </DataTable>
    );
}
