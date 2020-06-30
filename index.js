const yargs = require("yargs");

const services = require("./contacts");

async function consoleTable() {
  const table = await services.listContacts();
  console.table(table);
}

const argv = yargs
  .number("id")
  .string("name")
  .string("email")
  .string("phone")
  .alias("id", "i")
  .alias("name", "n")
  .alias("email", "e")
  .alias("phone", "p").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      consoleTable();
      break;

    case "get":
      services.getContactById(id);
      break;

    case "add":
      services.addContact(name, email, phone);
      break;

    case "remove":
      services.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
