import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
  savedRecipes: [],
  loading: true,
  changeSnackbar: '',
  isActive: false,
};
const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    savedRecipes: (state, action) => {
      const {
        recipe: { uri },
      } = action.payload;

      const recipeId = uri.slice(uri.lastIndexOf('_') + 1);
      const isSaved = localStorage.getItem(`cookie-recipe${recipeId}`);

      if (!isSaved) {
        localStorage.setItem(`cookie-recipe${recipeId}`, JSON.stringify(action.payload));
        state.saved = !isSaved;
        state.savedRecipes = action.payload;
      } else {
        localStorage.removeItem(`cookie-recipe${recipeId}`);
      }
    },

    setChangeSnackbar: state => {
      state.changeSnackbar = !state.changeSnackbar;
    },
    setfilterAcitve: state => {
      state.isActive = !state.isActive;
    },
  },
});

export default recipesSlice.reducer;
export const { setRecipes, savedRecipes, setChangeSnackbar, setfilterAcitve, setIsAccordionOpen } =
  recipesSlice.actions;
