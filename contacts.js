const fs = require("fs");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const contacts = loadContact();

  // cek duplikat
  const duplikat = contacts.find((contact) => contact.nama === nama);
  if (duplikat) {
    console.log("Contact sudah terdaftar, gunakan nama lain!");
    return false;
  }

  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email tidak valid!");
      return false;
    }
  }

  if (!validator.isMobilePhone(noHP, "id-ID")) {
    console.log("No HP tidak valid!");
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts), "utf-8");
  console.log("Data berhasil diinput!");
};

const listContacts = () => {
  const contacts = loadContact();
  console.log("Daftar contact");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
  });
};

const detailContacts = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  if (!contact) {
    console.log(`nama ${nama} tidak ditemukan!`);
    return false;
  }

  console.log("Detail contact");
  console.log(`nama : ${contact.nama}`);
  console.log(`no HP : ${contact.noHP}`);
  if (contact.email) {
    console.log(`email : ${contact.email}`);
  }
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() !== nama.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(`nama ${nama} tidak ditemukan!`);
    return false;
  }

  fs.writeFileSync(
    "./data/contacts.json",
    JSON.stringify(newContacts),
    "utf-8"
  );
  console.log(`Data ${nama} behasil dihapus!`);
};

module.exports = { simpanContact, listContacts, detailContacts, deleteContact };
