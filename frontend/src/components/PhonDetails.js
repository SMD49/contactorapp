import React from 'react';

function PhoneDetails(props) {
  const onSubmit = async (event) => {
    event.preventDefault();
    const phoneNumber = event.target.phoneNumber.value;
    const phoneType = event.target.phoneType.value;

    try {
      const response = await fetch(`http://localhost/api/contacts/${props.contactId}/phones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Number: phoneNumber, type: phoneType }),
      });

      if (!response.ok) {
        throw new Error('Failed to add phone details');
      }

      const data = await response.json();
      props.setPhones((phones) => [...phones, data]);
      event.target.reset();
      props.togglePhone(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        New Phone Number:
        <input type="text" name="phoneNumber" required />
      </label>
      <label>
        Phone Type:
        <input type="text" name="phoneType" required />
      </label>
      <button type="submit">Add Phone Details</button>
    </form>
  );
}

export default PhoneDetails;
