const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-5",
      input: message,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong with AI",
    });
  }
};

module.exports = chatController;
