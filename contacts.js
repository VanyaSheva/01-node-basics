const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = fs;
const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const finded = contacts.find((contact) => contact.id === contactId);
    console.log(finded);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const filtered = contacts.filter((contact) => contact.id !== contactId);
    fsPromises.writeFile(contactsPath, JSON.stringify(filtered, null, 2));
    console.table(filtered);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const contactToAdd = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
    };
    contacts.push(contactToAdd);
    fsPromises.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
