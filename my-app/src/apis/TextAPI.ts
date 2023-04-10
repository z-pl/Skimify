import env from "react-dotenv";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";
const configuration = new Configuration({
  apiKey: env.API_KEY
});
const openai = new OpenAIApi(configuration);
delete configuration.baseOptions.headers['User-Agent'];

async function getSummaryResponse() {
  const chatGPT = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: "Hello ChatGPT, how are you?"}]
  })

  const messg = chatGPT.data.choices[0].message;
  console.log(messg);
}

export {getSummaryResponse};
