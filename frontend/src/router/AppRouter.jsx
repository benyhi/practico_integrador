import ModelTable from '../components/ModelTable';

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
      <h1>App Router</h1>
      <ModelTable data={products}/>
    </div>
  );
}

export default AppRouter;