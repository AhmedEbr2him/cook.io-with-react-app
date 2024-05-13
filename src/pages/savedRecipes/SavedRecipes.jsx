import { useDispatch, useSelector } from 'react-redux';
import { savedRecipes, setChangeSnackbar } from '../../store';
import { getTime } from '../../utils/global';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const SavedRecipes = () => {
  const dispatch = useDispatch();
  const { changeSnackbar } = useSelector(state => state.recipesReducer);
  const [saved, setSaved] = useState(false);

  const savedCurrentRecipes = Object.keys(localStorage).filter(item => {
    return item.startsWith('cookie-recipe');
  });

  return (
    <main>
      <article className='article container saved-recipe-page' data-saved-recipe-container>
        <h2 className='headline-small section-title'>All Saved Recipes</h2>

        <div className='grid-list'>
          {savedCurrentRecipes.length ? (
            savedCurrentRecipes.map((savedRecipe, index) => {
              const {
                recipe: { image, label: title, totalTime: cookingTime, uri },
              } = JSON.parse(localStorage.getItem(savedRecipe));

              const recipeId = uri.slice(uri.lastIndexOf('_') + 1);

              const isSaved = localStorage.getItem(`cookie-recipe${recipeId}`);

              const handleSavedRecipe = recipe => {
                dispatch(savedRecipes(recipe));
                setSaved(isSaved);
                dispatch(setChangeSnackbar(!changeSnackbar));
                console.log(JSON.parse(localStorage.getItem(savedRecipe)));
              };

              return (
                <div key={recipeId} className='card' style={{ animationDelay: `${100 * index}ms` }}>
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
                        onClick={() =>
                          handleSavedRecipe(JSON.parse(localStorage.getItem(savedRecipe)))
                        }
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
          ) : (
            <p className='body-large'>You don&apos;t saved any recipes yet!</p>
          )}
        </div>
      </article>
    </main>
  );
};
export default SavedRecipes;
