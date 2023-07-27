import dbConnect from "../../../database/dbConnect";
import User from "../../../../models/User";
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
        const user = await User.findByIdAndUpdate(id, req.body);
        console.log("check");
        console.log(req.body);
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
      } catch (e) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: user });
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
