import { Menubar } from 'primereact/menubar';
import 'primeicons/primeicons.css';
        

const Navbar = () => {
    const items = [
        {
            label: 'Productos',
            icon: 'pi pi-gift',
            command: () => { window.location.href = '/product' }
        },
        {
            label: 'Usuarios',
            icon: 'pi pi-user',
            command: () => { window.location.href = '/user' }
        },
    ];
    return (
        <Menubar model={items}/>
        
    );
};

export default Navbar;
