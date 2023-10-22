const db = require("../models");
const Contacts = db.contacts;
const Phones = db.phones;

// Create contact
exports.create = (req, res) => {
    const contact = {
        name: req.body.name,
    };

    Contacts.create(contact)
        .then(data => res.send(data))
        .catch(error => handleError(res, error));
};

// Get all contacts
exports.findAll = (req, res) => {
    Contacts.findAll()
        .then(data => res.send(data))
        .catch(error => handleError(res, error));
};

// Get one contact by id
exports.findOne = (req, res) => {
    const contactId = req.params.contactId;

    Contacts.findByPk(contactId)
        .then(data => {
            if (!data) res.status(404).send({ message: `Contact with id=${contactId} not found` });
            else res.send(data);
        })
        .catch(error => handleError(res, error));
};

// Update one contact by id
exports.update = (req, res) => {
    const contactId = req.params.contactId;

    Contacts.update(req.body, { where: { id: contactId } })
        .then(num => {
            if (num == 1) res.send({ message: "Contact was updated successfully." });
            else res.send({ message: `Cannot update Contact` });
        })
        .catch(error => handleError(res, error));
};

// Delete one contact by id
exports.delete = (req, res) => {
    const contactId = req.params.contactId;

    Promise.all([
        Phones.destroy({ where: { contactId } }),
        Contacts.destroy({ where: { id: contactId } })
    ])
        .then(([numPhones, numContacts]) => {
            if (numContacts == 1) res.send({ message: "Contact was deleted successfully!" });
            else res.status(404).send({ message: `Contact with id=${contactId} not found` });
        })
        .catch(error => handleError(res, error));
};

function handleError(res, error) {
    res.status(500).send({ message: error.message || "Some error occurred" });
}
