import { NextApiResponse } from "next";
import dbConnect from "./dbConnect";
import Recipe from "../../models/Recipe";
import User from "../../models/User";
import { seederUsers } from "./dummyDataUsers";
import { seederRecipes } from "./dummyData";

export default async function handler(_, res: NextApiResponse) {
  try {
    await dbConnect();

    const recpies = await Recipe.find({}).count();

    // If database is populated, delete data
    if (recpies) {
      await Recipe.deleteMany({});
      await User.deleteMany({});
    }

    // Create recipe and user collections
    await Recipe.collection["recipes"].insertMany(seederRecipes);
    await User.collection["users"].insertMany(seederUsers);

    // const populate = await Recipe.insertMany(seederRecipes);

    res.status(200).json({
      success: true,
      result: "Database has been successfully seeded.",
    });
  } catch (e) {
    res.status(400).json({ success: false, result: e });
  }
}
