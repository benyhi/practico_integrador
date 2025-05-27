import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsView from './products/ProductsView';
import UsersView from './users/UsersView';
import Navbar from '../components/Navbar';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/product" element={<ProductsView />} />
        <Route path="/user" element={<UsersView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
