import OpenAI from "openai";
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
    organization: process.env.ORG_ID,
});

let prompts = [
  { role: "system", content: "You are a helpful assistant." },
]

app.post('/chat', async (req, res) => {
  const userInput = req.body;

  prompts = [...prompts, userInput]
  try {
    const completion = await openai.chat.completions.create({
    messages: prompts,
    model: "gpt-3.5-turbo",
  });
  prompts = [...prompts, completion.choices[0].message]
  return res.json(prompts)
  } catch (error) {
    console.log(error)
  }
})

app.listen(3000, () => {
  console.log('app listening...')
})




