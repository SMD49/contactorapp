const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;

// Calculate stats
exports.calculate = (req, res) => {
  Promise.all([
    Phones.count(),
    Contacts.count(),
    Contacts.max('createdAt'),
    Contacts.min('createdAt'),
  ])
    .then(([phoneCount, contactCount, newestContact, oldestContact]) => {
      const stats = {
        ContactNum: contactCount,
        PhoneNum: phoneCount,
        newContact: newestContact,
        oldContact: oldestContact,
      };
      res.send(stats);
    })
    .catch(error => {
      res.status(500).send({ message: error.message || "Some error occurred" });
    });
};
