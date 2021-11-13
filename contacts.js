const path = require('path');
const fs = require('fs').promises;
var uniqid = require('uniqid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  return contactList;
};

const getContactById = async contactId => {
  const contactList = await listContacts();
  const contact = contactList.find(item => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const contactList = await listContacts();
  const contactIndex = contactList.findIndex(item => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const deletedContact = contactList.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const contactList = await listContacts();
  const newContact = { name, email, phone, id: uniqid() };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
