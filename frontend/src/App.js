import React, { useState, useEffect } from 'react';
import './App.css';
import { Stats } from './components/Stats';
import { ContactList } from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetchContacts();

    async function fetchContacts() {
      try {
        const response = await fetch('http://localhost/api/contacts');
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error('Error while fetching contacts:', error);
      }
    }
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Contactor</h1>
      <button className="show-stats-button" onClick={() => setShowStats(!showStats)}>
        {showStats ? "Hide Stats" : "Show Stats"}
      </button>
      {showStats && <Stats />}
      <ContactList contacts={contacts} setContacts={setContacts} />
    </div>
  );
}

export default App;
