const { Schema, model, models} = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, required: true },
});

export const User = models.User || model("User", UserSchema);
