import { NextApiResponse } from "next";
import dbConnect from "../../database/dbConnect";
import Recipe from "../../../models/Recipe";
import { seederRecipes } from "../../database/dummyData";

export default async function handler(_, res: NextApiResponse) {
  try {
    await dbConnect();

    const recpies = await Recipe.find({}).count();

    // If database is populated, delete data
    if (recpies) {
      await Recipe.deleteMany({});
    }

    const populate = await Recipe.insertMany(seederRecipes);

    res.status(200).json({
      success: true,
      result: populate,
    });
  } catch (e) {
    res.status(400).json({ success: false, result: e });
  }
}
