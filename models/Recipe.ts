import { model, Model, models, Schema } from "mongoose";

interface IngredientInterface {
  name: string;
  amount: number;
  unit: string;
}

interface CategoryInterface {
  course: string;
  country: string;
  diet: string;
}

// interface CommentInterface {
//   user_id: string;
//   comment: string;
// }

export interface RecipeInterface {
  _id?: string;
  title: string;
  author_id: string;
  category: CategoryInterface;
  images?: string | string[];
  ingredients: IngredientInterface;
  steps: string;
  likes: number;
  comments: string | string[];
  visibility: string;
}

const recipeSchema = new Schema<RecipeInterface, Model<RecipeInterface>>({
  title: { type: String, required: [true, "Title must be provided"] },
  author_id: { type: String, required: true },
  category: {
    course: { type: String, required: true },
    country: { type: String },
    diet: { type: String },
  },
  images: { type: [String] },
  ingredients: [
    {
      name: { type: String, required: [true, "Ingredient name is required"] },
      amount: { type: Number, required: [true, "Amount is required"] },
      unit: { type: String, required: [true, "Unit required"] },
      _id: false,
    },
  ],
  steps: { type: String, required: [true, "Please provide method"] },
  likes: { type: Number },
  comments: [{ type: String }],
  visibility: { type: String }
});

export default (models.Recipe as Model<RecipeInterface>) ||
  model<RecipeInterface>("Recipe", recipeSchema);
