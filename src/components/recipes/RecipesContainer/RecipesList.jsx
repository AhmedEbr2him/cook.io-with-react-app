import { useEffect, useRef, useState } from 'react';
import SkeletonCard from '../../skeleton/SkeletonCard';
import { cardQueries, fetchRecipes } from '../../../utils/api';
import CardRecipes from './CardRecipes';
import { useLocation } from 'react-router-dom';

/**
 * firet render main recipes on page
 * second render more recipes on load more
 */
const RecipesList = ({ queries }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [isNextPage, setIsNextPage] = useState(' ');
  const [isRequestedBefore, setIsRequestedBefore] = useState(true);
  const loadMoreRef = useRef(null);
  const [repeatSkeleton, setRepeatSkeleton] = useState(0 || 12);

  const defaultQueries = [
    ['mealType', 'breakfast'],
    ['mealType', 'dinner'],
    ['mealType', 'lunch'],
    ['mealType', 'snack'],
    ['mealType', 'teatime'],
    ...cardQueries,
  ];
  useEffect(() => {
    fetchMainRecipes();
    setRecipes([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const fetchMainRecipes = async () => {
    setLoading(true);
    setRecipes([]);
    fetchRecipes(queries || defaultQueries, data => {
      setIsRequestedBefore(false);
      if (data.hits.length) {
        setRecipes(prevRecipes => [...prevRecipes, ...data.hits]);

        setLoading(false);
      }
      const {
        _links: { next },
      } = data;
      setIsNextPage(next?.href);
    });
  };

  const handleMoreRecipes = async () => {
    if (
      loadMoreRef.current.getBoundingClientRect().top < window.innerHeight &&
      !isRequestedBefore &&
      isNextPage
    ) {
      setIsRequestedBefore(true);
      const response = await fetch(isNextPage);
      const data = await response.json();
      setRecipes(prevRecipes => [...prevRecipes, ...data.hits]);

      const {
        _links: { next },
      } = data;
      setIsNextPage(next?.href);
      setIsRequestedBefore(false);
    }
  };
  const CONTAINER_MAX_WIDTH = 1200;
  const CONTAINER_MAX_CARD = 6;

  useEffect(() => {
    window.addEventListener('scroll', handleMoreRecipes);

    return () => {
      window.removeEventListener('scroll', handleMoreRecipes);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextPage, isRequestedBefore]);

  if (loading) {
    return <div className='grid-list'>{<SkeletonCard repeat={12} />}</div>;
  }

  return (
    <>
      <div className='grid-list'>
        <CardRecipes recipes={recipes} />
      </div>
      <div className='load-more grid-list' ref={loadMoreRef}>
        {!recipes && <p className='body-medium info-text'>No More Recipes</p>}
      </div>
    </>
  );
};
export default RecipesList;
