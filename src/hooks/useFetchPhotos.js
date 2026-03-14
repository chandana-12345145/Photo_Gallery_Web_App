import { useEffect, useState } from 'react';

const PHOTOS_API_URL = 'https://picsum.photos/v2/list?limit=30';

function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch(PHOTOS_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to fetch photos right now.');
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Something went wrong while loading photos. Please try again.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}

export default useFetchPhotos;

