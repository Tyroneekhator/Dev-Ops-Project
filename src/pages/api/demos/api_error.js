import { withSentry } from "@sentry/nextjs";
import * as Sentry from "@sentry/react";
import { userInfo } from "os";

// Code from https://github.com/natterstefan/next-with-sentry

Sentry.setContext("user_details", {
    name: "Test",
    email: "test@solent.ac.uk",
  });

const doAsyncWork = () => Promise.reject(new Error("API Test 1"));
doAsyncWork();

async function handler(req, res) {
    res.status(500).json({ error: "API ERROR" });
}

export default withSentry(handler);
