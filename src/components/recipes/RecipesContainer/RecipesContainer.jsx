import { useDispatch } from 'react-redux';
import { setfilterAcitve } from '../../../store';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import RecipesList from './RecipesList';

const RecipesContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const filterCountRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  /* GET FILTER COUNT FROM URL */
  const queryString = location.search.slice(1);
  const queries = queryString && queryString.split('&').map(i => i.split('='));

  useEffect(() => {
    /* SET QUERIES */
    if (queries.length) {
      filterCountRef.current.style.display = 'block';
    } else {
      filterCountRef.current.style.display = 'none';
    }

    /* HANDLE SHOW FILTER ICON WHEN SCROLL */
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='recipe-container container'>
      <div className='title-wrapper'>
        <h2 className='headline-small'>All Recipes</h2>
        <button
          className={`btn btn-secondary btn-filter ${scrollY >= 100 ? 'active' : ''}`}
          aria-label='Open filter bar'
          onClick={() => dispatch(setfilterAcitve())}
        >
          <span className='material-symbols-outlined' aria-hidden='true'>
            filter_list
          </span>

          <div className='wrapper'>
            <span className='label-large'> Filters </span>
            <div className='badge label-small' ref={filterCountRef}>
              {queries.length}
            </div>
          </div>
        </button>
      </div>
      <RecipesList queries={queries} />
    </div>
  );
};
export default RecipesContainer;
