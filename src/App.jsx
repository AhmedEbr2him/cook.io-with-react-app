import { Outlet } from 'react-router-dom';
import Header from './pages/global/header/Header';
import MobileNav from './pages/global/mobileNav/MobileNav';
import Footer from './pages/global/footer/Footer';
import Snackbar from './components/snackbarFunc/Snackbar';
const App = () => {
  return (
    <>
      <div className='app'>
        <Header />
        <Outlet />
        <MobileNav />
        <Footer />
        <Snackbar />
      </div>
    </>
  );
};

export default App;
