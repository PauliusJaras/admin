const { Schema, model, models, default: mongoose } = require("mongoose");

const CategorySchema = new Schema({
  title: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
});

export const Category = models.Category || model("Category", CategorySchema);
