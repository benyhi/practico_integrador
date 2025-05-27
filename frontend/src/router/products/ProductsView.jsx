import { useState, useEffect } from 'react';
import ModelTable from "../../components/ModelTable";

export default function ProductsView() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // Simulate fetching products from an API
        const fetchProducts = async () => {
            const response = await fetch('/products'); // Adjust the API endpoint as needed
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleAction = (action, item) => {
        // Handle the action (create, edit, delete) here
        console.log(`Action: ${action}, Item:`, item);
        // You can implement the logic to call the API based on the action
    }

    return (
        <div>
            <h1>Productos</h1>
            <ModelTable 
                data={products} 
                selectedItem={selectedProduct} 
                setSelectedItem={setSelectedProduct} 
                onAction={(action, item) => handleAction(action, item)}
            />
        </div>
    );
}