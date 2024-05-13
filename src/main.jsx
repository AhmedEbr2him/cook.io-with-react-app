import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './global_style.css';
import App from './App';
import Home from './pages/home/Home';
import Recipes from './pages/recipes/Recipes';
import Details from './pages/details/Details';
import SavedRecipes from './pages/savedRecipes/SavedRecipes';
import ErrorPage from './pages/error/Error';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'recipes',
        element: <Recipes />,
      },
      {
        path: 'details/:detailId',
        element: <Details />,
      },
      {
        path: 'saved_recipes',
        element: <SavedRecipes />,
      },
      {
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
