import { NextApiResponse } from "next";
import dbConnect from "../../database/dbConnect";
import User from "../../../models/User";
import { seederUsers } from "../../database/dummyDataUsers";
const bcrypt = require("bcrypt");

export default async function handler(_, res: NextApiResponse) {
  try {
    await dbConnect();

    const users = await User.find({}).count();

    // If database is populated, delete data
    if (users) {
      await User.deleteMany({});
    }

    const populate = await User.insertMany(seederUsers);

    // Update user passwords to hashes
    const updateUsersRef = User.collection.find({});
    const updateUsers = await updateUsersRef.toArray();
    updateUsers.forEach(async ({ _id, password }) => {
      const hash = await bcrypt.hash(password, 10);
      const hashedPass = " " + hash; // cannot use $ for the first value

      await User.collection.updateOne({ _id: _id }, [
        { $set: { password: hashedPass } },
      ]);
    });

    res.status(200).json({
      success: true,
      result: populate,
    });
  } catch (e) {
    res.status(400).json({ success: false, result: e });
  }
}
