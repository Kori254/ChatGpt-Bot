import OpenAI from 'openai';
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';
import colors from 'colors';
import say from 'say';
import speaker from 'speakertts';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function main() {
    console.log(colors.green.bold('Welcome to the Rubik terminal!'));
    console.log(colors.green.bold('You can start chatting with the bot.'));

    const chatHistory = [];

    while (true) {
        const userInput = readlineSync.question(colors.green.italic('You: '));

        try {
            const messages = chatHistory.map(([role, content]) => ({ role, content }));
            messages.push({
                role: 'user',
                content: userInput
            });

            const chatCompletion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            // Get the choices array from the response
            const choices = chatCompletion.choices;

            // Loop through the choices and print each one
            choices.forEach((choice, index) => {
                console.log(`Choice ${index + 1}: ${choice.message.content}`);
            });

            // Access the first choice (you can modify this based on your requirements)
            const completionText = choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.purple.italic('Bot:') + completionText);
                return;
            }

            console.log(('Bot:') + completionText);
            // say.speak("hello my name is lewis");
            speaker.speak('Hello, world', 'Microsoft David Desktop', 1, 'ASCII', (error) => {
                if (error) {
                    return console.error('Error speaking!', error)
                }

                console.log('text to speech complete')
                })
            
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);

        } catch (error) {
            console.error(colors.red(error));
        }
    }
}

// Call the main function
main();