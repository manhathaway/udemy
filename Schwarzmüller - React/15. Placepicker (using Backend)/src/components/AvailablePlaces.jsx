import Places from './Places.jsx';
import Error from './Error.jsx';
import { useState, useEffect } from 'react';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvaliablePlaces } from '../backendFunctions.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [avaliablePlaces, setAvaliablePlaces] = useState({
    data: null,
    isLoading: true,
    error: {
      type: null,
      message: null
    }
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      setAvaliablePlaces((previous) => ({
        ...previous,
        isLoading: true
      }));
      
      try {
        const places = await fetchAvaliablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          
          setAvaliablePlaces((previous) => ({
            ...previous,
            isLoading: false,
            data: sortedPlaces
          }));
        });

      } catch (error) {
        setAvaliablePlaces((previous) => ({
          ...previous,
          isLoading: false,
          error: {
            type: 'Fetch',
            message: 'Failed to fetch avaliable places.'
          }
        }));
      };
    };

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={avaliablePlaces.data}
      onSelectPlace={onSelectPlace}
      fallbackText="No places available."
      isLoading={avaliablePlaces.isLoading}
      errorType={avaliablePlaces.error.type}
      errorMessage={avaliablePlaces.error.message}
    />
  );
}
