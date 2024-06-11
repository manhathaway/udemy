import { useRef, useState, useCallback, useEffect } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './backendFunctions.js';

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState({
    data: [],
    isLoading: true,
    error: {
      type: null,
      message: null
    }
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      setUserPlaces((previous) => ({
        ...previous,
        isLoading: true,
        error: {
          type: null,
          message: null
        }
      }));

      try {
        const places = await fetchUserPlaces();

        setUserPlaces((previous) => ({
          ...previous,
          isLoading: false,
          data: places
        }));
      } catch (error) {
        setUserPlaces((previous) => ({
          ...previous,
          isLoading: false,
          error: {
            type: 'Fetch',
            message: 'Unable to fetch user places.'
          }
        }));
      };
    };

    fetchPlaces();
  }, [])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  const handleStopRemovePlace = useCallback(() => {
    setModalIsOpen(false);
  }, [])

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((previous) => {
      if (previous.data.some((place) => place.id === selectedPlace.id)) {
        return {
          ...previous,
          data: previous.data
        }
      } else {
        return {
          ...previous,
          data: [selectedPlace, ...previous.data]
        }
      };
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces.data]);
    } catch (error) {
      setUserPlaces((previous) => ({
        ...previous,
        data: userPlaces.data,
        error: {
          type: 'Update',
          message: 'Failed to update user data.'
        }
      }));
    };
  }

  const handleRemovePlace = async () => {
    setUserPlaces((previous) => ({
      ...previous,
      data: previous.data.filter((place) => place.id !== selectedPlace.current.id)
    }));

    try {
      await updateUserPlaces(userPlaces.data.filter(place => place.id !== selectedPlace.current.id));
    } catch (error) {
      setUserPlaces((previous) => ({
        ...previous,
        data: userPlaces.data,
        error: {
          type: 'Delete',
          message: 'Failed to delete user data.',
        }
      }));
    };

    setModalIsOpen(false);
  };

  const handleError = () => {
    setUserPlaces((previous) => ({
      ...previous,
      error: null
    }));
  };

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
          errorType={userPlaces.error.type}
          errorMessage={userPlaces.error.message}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces.data}
          onSelectPlace={handleStartRemovePlace}
          isLoading={userPlaces.isLoading}
          errorType={userPlaces.error.type}
          errorMessage={userPlaces.error.message}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
