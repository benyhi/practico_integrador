import { useState, useEffect } from 'react';
import axios from 'axios';
import ModelForm from '../../components/ModelForm';
import ActionMenu from "../../components/ActionMenu";
import ModelTable from "../../components/ModelTable";

export default function ProductsView() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
        axios.get('/products')
            .then(response => {
                //setProducts(response.data);
                setProducts([
                    {id: 1, name: 'Product 1', price: 100 },
                    {id: 2, name: 'Product 2', price: 200 },
                    {id: 3, name: 'Product 3', price: 300 },
                    {id: 4, name: 'Product 4', price: 400 },
                    {id: 5, name: 'Product 5', price: 500 },
                    {id: 6, name: 'Product 6', price: 600 },
                    {id: 7, name: 'Product 7', price: 700 },
                    {id: 8, name: 'Product 8', price: 800 },
                    {id: 9, name: 'Product 9', price: 900 },
                    {id: 10, name: 'Product 10', price: 1000 }
                ])
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
        };
        fetchProducts();
    }, []);

    const handleAction = (action) => {
        if (action === 'create') {
            setEditingProduct({ name: '', price: '' });
            setShowForm(true);
        }
        if (action === 'edit' && selectedProduct) {
            setEditingProduct(selectedProduct);
            setShowForm(true);
        }
    };

    const handleSubmit = (data) => {
        console.log('Datos guardados:', data);
        // Acá llamás a create o update según tenga `data.id`
    };

    return (
        <div>
            <h1>Vista de Productos</h1>
            <ActionMenu onAction={handleAction} selectedItem={selectedProduct}/>
            <ModelTable 
                data={products} 
                selectedItem={selectedProduct} 
                setSelectedItem={setSelectedProduct} 
            />

            <ModelForm 
                visible={showForm}
                onHide={() => setShowForm(false)}
                model={editingProduct}
                onSubmit={handleSubmit}
                title={editingProduct?.id ? 'Editar Producto' : 'Nuevo Producto'}
            />
        </div>
    );
}