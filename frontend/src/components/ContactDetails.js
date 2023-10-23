import React, { useState, useEffect, useRef } from "react";
import PhoneDetails from "./PhonDetails";
import "../App.css";

function ContactDetails(props) {
  const [showPhoneDetails, setShowPhoneDetails] = useState(false);
  const [phones, setPhones] = useState([]);
  const deletePhoneIdRef = useRef(null);

  useEffect(() => {
    fetchPhones();

    async function fetchPhones() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/contacts/${props.id}/phones`
        );
        const data = await response.json();

        setPhones(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [props.id]);

  const onDeleteContact = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/contacts/${props.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        props.setContacts((contacts) =>
          contacts.filter((contact) => contact.id !== props.id)
        );
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDeletePhone = (phoneId) => {
    fetch(`http://localhost:5000/api/contacts/${props.id}/phones/${phoneId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setPhones((updatedPhones) =>
            updatedPhones.filter((phone) => phone.id !== phoneId)
          );
        } else {
          console.error("Failed to delete phone");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="contact-container">
      <section className="contact-info">
        <span
          onClick={() => setShowPhoneDetails(!showPhoneDetails)}
          className="contact-name"
          style={{ cursor: "pointer" }}
        >
          {props.name}
        </span>
        <button type="button" onClick={onDeleteContact} className="delete-button">
          Delete
        </button>
      </section>
      <PhoneDetails contactId={props.id} setPhones={setPhones} togglePhone={() => setShowPhoneDetails(!showPhoneDetails)} />
      {showPhoneDetails && (
        <section className="phone-details-container">
          {phones.length > 0 ? (
            <section className="phone-detail">
              <section>Number: {phones[0].Number}</section>
              <section>Type: {phones[0].type}</section>
              <button
                type="button"
                onClick={() => onDeletePhone(phones[0].id)}
              >
                Delete Phone
              </button>
            </section>
          ) : (
            <p>No phone details available.</p>
          )}
        </section>
      )}
    </section>
  );
}

export { ContactDetails };
