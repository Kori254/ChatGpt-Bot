import OpenAI from 'openai';
import dotenv from 'dotenv';
import readlineSync from 'readline-sync';
import colors from 'colors';
dotenv.config();



const openai= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function main(){
    console.log(colors.green.bold('Welcome t the Rubik terminal!'));
    console.log(colors.green.bold('You can Start chatting with the bot.'));

    const chatHistory=[];

    while(true){
        const userInput= readlineSync.question(colors.green.italic('You: '));

        try {
            const messages =chatHistory.map(([role, content])=>({role, content}));
            messages.push({
                role: 'user',
                content: userInput
            });

            const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            });
            
            const completionText= chatCompletion.choices[0].message;


            if(userInput.toLowerCase()==='exit'){
                console.log(colors.purple.italic('Bot:')+ completionText);
                return;
            }

            console.log(colors.purple.italic('Bot:')+ completionText);
            chatHistory.push(['user',userInput]);
            chatHistory.push(['assistant', completionText]);
            
        } catch (error) {
            console.error(colors.red(error));
        }

    }
    
}

main();