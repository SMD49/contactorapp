import React, { useState } from 'react';
import './App.css';
import { Stats } from './components/Stats';
import { ContactCreate } from './components/ContactCreate';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="container">
      <h1 className="heading">Contactor</h1>
      <button className="show-stats-button" onClick={() => setShowStats(!showStats)}>
        {showStats ? "Hide Stats" : "Show Stats"}
      </button>
      {showStats && <Stats />}
      <ContactCreate contacts={contacts} setContacts={setContacts} />
    </div>
  );
}

export default App;
