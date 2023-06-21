const { Schema, model, models, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true },
});

export const User = models.User || model("User", UserSchema);
