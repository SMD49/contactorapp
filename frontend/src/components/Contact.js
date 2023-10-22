import React, { useState, useEffect, useRef } from "react";
import PhoneForm from "./PhoneForm";
import "../App.css";

function Contact(props) {
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

        if (Array.isArray(data)) {
          setPhones(data);
        } else {
          console.error("Data is not an array:", data);
        }
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
        props.setContacts((contacts) => contacts.filter((contact) => contact.id !== props.id));
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDeletePhone = () => {
    deletePhoneIdRef.current &&
      fetch(`http://localhost:5000/api/contacts/${props.id}/phones/${deletePhoneIdRef.current}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            setPhones((updatedPhones) =>
              updatedPhones.filter((phone) => phone.id !== deletePhoneIdRef.current)
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
    <div className="contact-container">
      <div className="contact-info">
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
      </div>
      <PhoneForm contactId={props.id} setPhones={setPhones} togglePhone={() => setShowPhoneDetails(!showPhoneDetails)} />
      {showPhoneDetails && (
        <div className="phone-details-container">
          {phones.map((phone) => (
            <div key={phone.id} className="phone-detail">
              <div>Number: {phone.Number}</div>
              <div>Type: {phone.type}</div>
              <button
                type="button"
                onClick={() => {
                  deletePhoneIdRef.current = phone.id;
                  onDeletePhone();
                }}
              >
                Delete Phone
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { Contact };
