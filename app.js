const yargs = require("yargs");
const { simpanContact } = require("./contacts");

yargs.command({
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
});

yargs.parse();
