import { axios } from "@pipedream/platform"

const news = "you should buy"

export default sentiAnalysis({
  props: {
    perplexity: {
      type: "app",
      app: "perplexity",
    },
  },
  async run({steps, $}) {
    const data = {
      "model": "mistral-7b-instruct",
      "messages": [
        {"role": "system", "content": "Be precise and concise."},
        {"role": "user", "content": `Do a sentiment analyze using financial news, the result should be displayed as percentage of buy and sell : ${news}`}
      ]
    }
    return await axios($, {
      method: "post",
      url: `https://api.perplexity.ai/chat/completions`,
      headers: {
        Authorization: `Bearer ${process.env.AI_KEY}`,
        "accept": `application/json`,
      },
      data,
    })
  },
})
