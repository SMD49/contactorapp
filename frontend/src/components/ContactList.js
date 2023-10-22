import React, { useRef } from 'react';
import { Contact } from './Contact';

function ContactList({ contacts, setContacts }) {
  const newContactRef = useRef('');

  function onChange(event) {
    newContactRef.current.value = event.target.value;
  }

  function addContact() {
    const newContact = newContactRef.current.value;

    if (!newContact) {
      console.error('Contact name is required.');
      return;
    }

    fetch('http://localhost/api/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newContact }),
    })
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Failed to add contact');
        }
        return response.json();
      })
      .then(function(data) {
        setContacts([...contacts, data]);
        newContactRef.current.value = ''; // Clear the input
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }

  return (
    <div className="container">
      <div className="input-row">
        <input
          className="text-input"
          type="text"
          placeholder="Add a new contact"
          ref={newContactRef}
          onChange={onChange}
        />
        <button className="btn" type="button" onClick={addContact}>
          Create contact
        </button>
      </div>

      <div className="contacts">
        {contacts.map(function(contact) {
          return (
            <Contact
              setContacts={setContacts}
              id={contact.id}
              name={contact.name}
              key={contact.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export { ContactList };
