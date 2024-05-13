import './Recipes.css';
import RecipesContainer from '../../components/recipes/RecipesContainer/RecipesContainer';
import Filterbar from '../../components/recipes/Filterbar';

const Recipes = () => {
  return (
    <main>
      <div className='article recipe-page'>
        <Filterbar />
        <RecipesContainer />
      </div>
    </main>
  );
};
export default Recipes;
