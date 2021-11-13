const contactsOperations = require('./contacts');
const argv = require('yargs').argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contactList = await contactsOperations.listContacts();
      console.log(contactList);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case 'add':
      const newContact = await contactsOperations.addContact(
        name,
        email,
        phone,
      );
      console.log(newContact);
      break;

    case 'remove':
      const deletedContact = await contactsOperations.removeContact(id);
      console.log(deletedContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
