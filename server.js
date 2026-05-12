const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/check-writing", async (req, res) => {
  try {
    const text = req.body.text;

    const response = await client.responses.create({
      model: "gpt-5.4-mini",
      input: `
You are an English writing teacher.

Correct the student's writing and give:
1. Corrected text
2. Grammar mistakes
3. Spelling mistakes
4. Vocabulary suggestions
5. Writing level: Beginner, Intermediate, or Advanced
6. Grade out of 10
7. Short teacher feedback

Student writing:
${text}
`
    });

    res.json({
      result: response.output_text
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "AI correction failed. Check your API key or internet connection."
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});