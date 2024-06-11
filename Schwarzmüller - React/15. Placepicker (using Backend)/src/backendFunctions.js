const fetchAvaliablePlaces = async () => {
    const response = await fetch('http://localhost:3000/places');
    
    if (!response.ok) { throw new Error(); }

    const data = await response.json();
    return data.places;
};

const fetchUserPlaces = async () => {
    const response = await fetch('http://localhost:3000/user-places');
    
    if (!response.ok) { throw new Error(); }

    const data = await response.json();
    return data.places;
};

const updateUserPlaces = async (places) => {
    const response = await fetch('http://localhost:3000/user-places', {
      method: 'PUT',
      body: JSON.stringify({ places }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) { throw new Error(); };
    
    const data = await response.json();
    return data.message;
};

export { fetchAvaliablePlaces, fetchUserPlaces, updateUserPlaces };