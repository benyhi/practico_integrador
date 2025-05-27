import ProductsView from './products/ProductsView';

const products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];

const users = [
  { id: 1, name: 'User 1', email: 'user1@gmail.com' },
  { id: 2, name: 'User 2', email: 'user2@gmail.com' },
  { id: 3, name: 'User 3', email: 'user2@gmail.com' }
]

// Enrutamiento de la aplicacion con React Router Dom
const AppRouter = () => {
  return (
    <div>
      <h1>Practico Integrador Node + React</h1>
      <ProductsView/>
    </div>
  );
}

export default AppRouter;