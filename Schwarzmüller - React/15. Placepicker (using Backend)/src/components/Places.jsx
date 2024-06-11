export default function Places({ title, places, fallbackText, onSelectPlace, isLoading, errorType, errorMessage }) {
  
  let content;
  if (isLoading) {
    content = <p className='center'>Fetching data...</p>;
  } else {
    if (errorType === 'Fetch') {
      content = <p className='error-text center'>{errorMessage}</p>
    } else {
      if (places.length === 0) {
        content = <p className="center">{fallbackText}</p>;
      } else {
        content =
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      };
    };
  };
  
  return (
    <section className="places-category">
      <h1 className='title center'>{title}</h1>
      {content}
    </section>
  );
}
