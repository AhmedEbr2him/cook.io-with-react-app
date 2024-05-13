import './Card.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTime } from '../../utils/global';
import { savedRecipes, setChangeSnackbar } from '../../store';

const Card = ({ slice, recipe }) => {
  const dispatch = useDispatch();
  const { recipes } = useSelector(state => state.recipesReducer);
  const { changeSnackbar } = useSelector(state => state.recipesReducer);

  const handleSavedRecipe = recipe => {
    dispatch(savedRecipes(recipe));
    dispatch(setChangeSnackbar(!changeSnackbar));
  };
  return (
    recipes &&
    recipes.slice(0, slice).map((recipe, index) => {
      const {
        recipe: { image, label: title, totalTime: cookingTime, uri },
      } = recipe;
      const recipeId = uri.slice(uri.lastIndexOf('_') + 1);
      const isSaved = localStorage.getItem(`cookie-recipe${recipeId}`);

      return (
        <div className='card' key={index} style={{ animationDelay: `${100 * index}ms` }}>
          <figure className='card-media img-holder'>
            <img
              src={image}
              alt={title}
              width='195'
              height='195'
              loading='lazy'
              className='img-cover'
            />
          </figure>

          <div className='card-body'>
            <h3 className='title-small'>
              <Link to={`/details/${recipeId}`} className='card-link'>
                {title ?? 'Untitled'}
              </Link>
            </h3>
            <div className='meta-wrapper'>
              <div className='meta-item'>
                <span className='material-symbols-outlined' aria-hidden='true'>
                  schedule
                </span>
                <span className='label-medium'>
                  {getTime(cookingTime).time || '<1'} {''}
                  {getTime(cookingTime).timeUnit}
                </span>
              </div>
              <button
                className={`icon-btn has-state ${isSaved ? 'saved' : 'removed'}`}
                aria-label='Add to saved recipes'
                onClick={() => handleSavedRecipe(recipe)}
              >
                <span className='material-symbols-outlined bookmark-add' aria-hidden='true'>
                  bookmark_add
                </span>
                <span className='material-symbols-outlined bookmark' aria-hidden='true'>
                  bookmark
                </span>
              </button>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default Card;
