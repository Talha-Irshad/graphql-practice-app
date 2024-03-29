const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
},{
    timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);
