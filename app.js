const yargs = require("yargs");
const {
  simpanContact,
  listContacts,
  detailContacts,
  deleteContact,
} = require("./contacts");

yargs
  .command({
    command: "add",
    describe: "Menambahkan contact baru",
    builder: {
      nama: {
        describe: "Nama contact baru",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email contact baru",
        demandOption: false,
        type: "string",
      },
      noHP: {
        describe: "no HP contact baru",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      simpanContact(argv.nama, argv.email, argv.noHP);
    },
  })
  .demandCommand();

// Menampilkan daftar semua nama contact

yargs.command({
  command: "list",
  describe: "Daftar semua nama contact",
  handler() {
    listContacts();
  },
});

// menampilkan detail contact
yargs.command({
  command: "detail",
  describe: "Menampilkan detail contact",
  builder: {
    nama: {
      describe: "Nama contact baru",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContacts(argv.nama);
  },
});

// Menghapus contact
yargs.command({
  command: "delete",
  describe: "Menghapus contact",
  builder: {
    nama: {
      describe: "Nama contact baru",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
