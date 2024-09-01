const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  user_id: { type: String, required: true, unique: true },
  college_mail_id: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  college_roll_no: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User_Table", userSchema);
