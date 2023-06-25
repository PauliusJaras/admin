const { Schema, model, models} = require("mongoose");

const AdminSchema = new Schema({
  email: { type: String, required: true },
});

export const Admin = models.Admin || model("Admin", AdminSchema);
