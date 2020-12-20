const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dwu20/image/upload/v1597790821/defualt2_xli5go.webp",
  },
});

module.exports = mongoose.model("User", userSchema);
