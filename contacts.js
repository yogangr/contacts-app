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

const simpanContact = (nama, email, noHP) => {
  const contact = { nama, email, noHP };
  const fileBuffer = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(fileBuffer);

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

module.exports = { simpanContact };
