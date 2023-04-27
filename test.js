import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const chatInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const messages = [{ role: "system", content: "Du bist Shakespear und antwortest nur in Reimen" }];

async function processUserInput(input) {

    messages.push({ role: "user", content: input });

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 200,
    });

    const answer = response.data.choices[0].message.content;
    messages.push({ role: "assistant", content: answer });
    console.log(answer);

    if (input.toLowerCase() === "exit") {
        console.log("Programm beendet.");
        chatInterface.close();
    } else {
        chatInterface.question('', processUserInput);
    }
}

chatInterface.question('Was willst du wissen? ("exit" zum Beenden): ', processUserInput);
