const db = require("../models");
const Phones = db.phones;

// Create phone
exports.create = (req, res) => {
  const contactId = req.params.contactId;
  const phone = {
    Number: req.body.Number,
    type: req.body.type,
    contactId: contactId,
  };

  Phones.create(phone)
    .then(data => res.send(data))
    .catch(error => handleError(res, error));
};

// Get all phones
exports.findAll = (req, res) => {
  const contactId = req.params.contactId;
  Phones.findAll({ where: { contactId } })
    .then(data => res.send(data))
    .catch(error => handleError(res, error));
};

// Get one phone by id
exports.findOne = (req, res) => {
  const phoneId = req.params.phoneId;
  const contactId = req.params.contactId;
  Phones.findOne({ where: { contactId, id: phoneId } })
    .then(data => res.send(data))
    .catch(error => handleError(res, error));
};

// Update one phone by id
exports.update = (req, res) => {
  const contactId = req.params.contactId;
  const phoneId = req.params.phoneId;

  Phones.update(req.body, { where: { contactId, id: phoneId } })
    .then(num => {
      if (num === 1) res.send({ message: "Phone was updated successfully." });
      else res.send({ message: `Cannot update Phone` });
    })
    .catch(error => handleError(res, error));
};

// Delete one phone by id
exports.delete = (req, res) => {
  const contactId = req.params.contactId;
  const phoneId = req.params.phoneId;

  Phones.destroy({ where: { contactId, id: phoneId } })
    .then(num => {
      if (num === 1) res.send({ message: "Phone was deleted successfully" });
      else res.send({ message: `Cannot delete Phone` });
    })
    .catch(error => handleError(res, error));
};

function handleError(res, error) {
  res.status(500).send({ message: error.message || "Some error occurred" });
}
