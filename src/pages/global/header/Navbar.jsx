import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navItem = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Recipes',
      href: '/recipes',
    },
  ];

  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        {navItem.map((item, index) => {
          return (
            <li key={index}>
              <Link
                to={item.href}
                className={`navbar-link title-small has-state ${
                  location.pathname === item.href ? 'active' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default Navbar;
