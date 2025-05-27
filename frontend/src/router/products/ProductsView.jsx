import { useState, useEffect } from 'react';
import ModelForm from '../../components/ModelForm';
import ActionMenu from "../../components/ActionMenu";
import ModelTable from "../../components/ModelTable";
import { productService } from './services/ProductService';

export default function ProductsView() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getAll();
                setProducts(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchProducts();
    }, []);

    const handleAction = (action) => {
        if (action === 'create') {
            setEditingProduct({ nombre: '', precio: '' });
            setShowForm(true);
        }
        if (action === 'edit' && selectedProduct) {
            setEditingProduct(selectedProduct);
            setShowForm(true);
        }
        if (action === 'delete' && selectedProduct) {
            if (window.confirm(`¿Estás seguro que deseas eliminar "${selectedProduct.nombre}"?`)) {
                productService.delete(selectedProduct.id)
                    .then(() => {
                        setProducts(products.filter(p => p.id !== selectedProduct.id));
                        setSelectedProduct(null);
                    })
                    .catch(error => {
                        console.error('Error al eliminar el producto:', error);
                        alert(error.message);
                    });
            }
        }
    };

    const handleSubmit = async (data) => {
        if (!data) return;

        try {
            if (data.id) {
                const updatedProduct = await productService.update(data.id, data);
                setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
                setSelectedProduct(updatedProduct);
            } else {
                const newProduct = await productService.create(data);
                setProducts([...products, newProduct]);
                setSelectedProduct(newProduct);
            }
            setShowForm(false);
        } catch (error) {
            console.error('Error al guardar el producto:', error);
            alert(error.message);
        }
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