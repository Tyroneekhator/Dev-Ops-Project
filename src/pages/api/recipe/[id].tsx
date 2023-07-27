import dbConnect from "../../../database/dbConnect";
import Recipe from "../../../../models/Recipe";
import { withSentry } from "@sentry/nextjs";

async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();
  switch (method) {
    case "PUT":
      try {
        const recipe = await Recipe.findByIdAndUpdate(id, req.body);
        console.log("check");
        console.log(req.body);
        if (!recipe) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: recipe });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const recipe = await Recipe.findByIdAndDelete(id);
        if (!recipe) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: recipe });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}

export default withSentry(handler);
