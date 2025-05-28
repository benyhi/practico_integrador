
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductsView from './products/ProductsView';
import UsersView from './users/UsersView';
import Navbar from '../components/Navbar';
import Home from '../components/Home';

const AppRouter = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/product" element={<ProductsView />} />
        <Route path="/user" element={<UsersView />} />
      </Routes>
    </BrowserRouter>


  );
};

export default AppRouter;
