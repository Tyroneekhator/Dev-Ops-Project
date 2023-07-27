import dbConnect from "../../../database/dbConnect";
import Recipe from "../../../../models/Recipe";
import { withSentry } from "@sentry/nextjs";

async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const pet = await Recipe.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: pet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default withSentry(handler);
