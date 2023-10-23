import React, { useRef } from 'react';
import { ContactDetails } from './ContactDetails';

function ContactCreate({ contacts, setContacts }) {
  const newContactRef = useRef('');

  const onChange = (event) => {
    newContactRef.current.value = event.target.value;
  };

  const handleAddContact = async () => {
    const newContact = newContactRef.current.value;

    if (!newContact) {
      console.error('No contact name.');
      return;
    }

    try {
      const response = await fetch('http://localhost/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newContact }),
      });

      if (!response.ok) {
        throw new Error('Cannot add contact');
      }

      const data = await response.json();
      setContacts([...contacts, data]);
      newContactRef.current.value = ''; // Clear the input
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const contactDetailsList = [];
  for (const { id, name } of contacts) {
    contactDetailsList.push(
      <ContactDetails setContacts={setContacts} id={id} name={name} key={id} />
    );
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
        <button className="btn" type="button" onClick={handleAddContact}>
          Create contact
        </button>
      </div>

      <div className="contacts">{contactDetailsList}</div>
    </div>
  );
}

export { ContactCreate };
