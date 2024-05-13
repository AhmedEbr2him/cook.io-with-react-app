/* eslint-disable react/prop-types */
import { getTime } from '../../utils/global';
import { Link } from 'react-router-dom';
import { savedRecipes, setChangeSnackbar } from '../../store/index';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const DetailsContent = ({ recipe }) => {
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const { changeSnackbar } = useSelector(state => state.recipesReducer);

  const {
    images: { LARGE, REGULAR, SMALL },
    label: title,
    source: author,
    ingredients = [],
    totalTime: cookingTime = 0,
    calories = 0,
    cuisineType = [],
    dietLabels = [],
    dishType = [],
    yield: servings = 0,
    ingredientLines = [],
    uri,
  } = recipe.recipe;

  document.title = `${title} Cook-io`;
  //CREATE BANNER
  const banner = LARGE ?? REGULAR ?? SMALL;
  const { url: bannerUrl, width, height } = banner;
  // CREATE TAGS
  const tags = [...cuisineType, ...dietLabels, ...dishType];

  const recipeId = uri.slice(uri.lastIndexOf('_') + 1);
  const isSaved = localStorage.getItem(`cookie-recipe${recipeId}`);

  const handleSavedRecipe = recipe => {
    dispatch(savedRecipes(recipe));
    setSaved(isSaved);
    dispatch(setChangeSnackbar(!changeSnackbar));
  };
  return (
    <>
      <figure className='detail-banner img-holder'>
        <img src={bannerUrl} alt={title} width={width} height={height} className='img-cover' />
      </figure>

      <div className='detail-content'>
        <div className='title-wrapper'>
          <h1 className='display-small'>{title ?? 'Untitled'}</h1>
          <button
            className={`btn btn-secondary has-state has-icon ${isSaved ? 'saved' : 'removed'}`}
            onClick={() => {
              handleSavedRecipe(recipe);
            }}
          >
            <span className='material-symbols-outlined bookmark-add' aria-hidden='true'>
              bookmark_add
            </span>
            <span className='material-symbols-outlined bookmark' aria-hidden='true'>
              bookmark
            </span>
            <span className='label-large save-text'>Save</span>
            <span className='label-large unsave-text'>Unsaved</span>
          </button>
        </div>

        <div className='detail-author label-large'>
          <span className='span'>by {author}</span>
        </div>

        <div className='detail-state'>
          <div className='state-item'>
            <span className='display-medium'>{ingredients.length}</span>
            <span className='label-medium'>Ingredients</span>
          </div>
          <div className='state-item'>
            <span className='display-medium'>{getTime(cookingTime).time || '<1'}</span>
            <span className='label-medium'>{getTime(cookingTime).timeUnit}</span>
          </div>
          <div className='state-item'>
            <span className='display-medium'>{Math.floor(calories)}</span>
            <span className='label-medium'>Calories</span>
          </div>
        </div>

        <div className='tag-list'>
          {tags &&
            tags.map((tag, index) => {
              let type = '';
              if (cuisineType.includes(tag)) {
                type = 'cuisineType';
              } else if (dietLabels.includes(tag)) {
                type = 'diet';
              } else if (dishType.includes(tag)) {
                type = 'dishType';
              }
              return (
                <Link
                  key={index}
                  to={`/recipes?${type}=${tag.toLowerCase()}`}
                  className='filter-chip label-large has-state'
                >
                  {tag}
                </Link>
              );
            })}
        </div>

        <h2 className='title-medium ingr-title'>
          Ingredients
          <span className='label-medium'>for {servings} Servings</span>
        </h2>

        <ul className='body-large ingr-list'>
          {ingredientLines &&
            ingredientLines.map((ingredient, index) => {
              return (
                <li key={index} className='ingr-item'>
                  {ingredient}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
export default DetailsContent;
