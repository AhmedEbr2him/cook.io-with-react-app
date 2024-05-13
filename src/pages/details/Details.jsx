import './Details.css';
import DetailsSkeleton from '../../components/skeleton/DetailsSkeleton';
import DetailsContent from './DetailsContent';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ACCESS_POINT, TYPE, APP_ID, API_KEY } from '../../utils/api';

const Details = () => {
  const recipeId = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const NEW_ACCESS_POINT = ACCESS_POINT.replace(
    ACCESS_POINT,
    `${ACCESS_POINT}/${recipeId.detailId}`
  );

  const fetchDetails = async () => {
    const url = `${NEW_ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}`;

    const respones = await fetch(url, { method: 'GET' });

    const data = await respones.json();

    setRecipe(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <article className='article container detail-page'>
      {loading && <DetailsSkeleton />}
      {/* عشان نضمن ان لما الداتا تحمل نعرف نرجع الصور */}
      {recipe && <DetailsContent recipe={recipe} recipeId={recipeId.detailId} />}
    </article>
  );
};
export default Details;
