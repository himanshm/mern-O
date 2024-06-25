import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function RootLayoutPage() {
  return (
    <>
      <Navbar />
      <div className='pages'>
        <Outlet />
      </div>
    </>
  );
}

export default RootLayoutPage;
