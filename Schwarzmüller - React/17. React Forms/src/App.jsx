import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';

function App() {
  const [page, setPage] = useState('login');
  
  const handlePageChange = (page) => {
    setPage(page);
  };
  
  let content;
  switch (page) {
    case 'login':
      content = <Login onPageChange={handlePageChange}/>
      break;
    case 'signup':
      content = <Register onPageChange={handlePageChange}/>
  };
  
  return (
    <>
      <Header />
      <main>
        {content}
      </main>
    </>
  );
}

export default App;
