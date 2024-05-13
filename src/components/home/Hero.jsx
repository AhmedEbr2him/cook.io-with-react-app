import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const searchField = useRef(null);

  const handleSearchNavigate = () => {
    if (searchField.current.value) {
      navigate(`/recipes?q=${searchField.current.value}`);
    }
  };
  const handleSearchFieldKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearchNavigate();
    }
  };

  return (
    <section className='hero' aria-label='banner'>
      <div className='banner-card'>
        <h1 className='display-large'>Your desired dish ?</h1>

        <div className='search-wrapper'>
          <span className='material-symbols-outlined leading-icon' aria-hidden='true'>
            local_dining
          </span>

          <input
            type='search'
            name='search'
            id=''
            aria-label='search-recipes'
            placeholder='Search recipes...'
            className='search-field body-medium'
            ref={searchField}
            onKeyDown={handleSearchFieldKeyDown}
          />

          <button className='search-submit' aria-label='Submit' onClick={handleSearchNavigate}>
            <span className='material-symbols-outlined' aria-hidden='true'>
              search
            </span>
          </button>
        </div>

        <p className='label-medium'>Search any recipe e.g: burger, pizza, sandwich, toast.</p>
      </div>
    </section>
  );
};
export default Hero;
