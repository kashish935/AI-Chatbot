require('dotenv').config();
const app = require('./src/app');
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require('./src/service/ai.service');

const httpServer = createServer(app);
const io = new Server(httpServer, { 
    //here we initiate the socket server
        cors:{
            origin:"http://localhost:5173", //frontend server
        }
    });

const chatHistory = [
    /*{
        role:"user",
        parts: [
            {
                text: 'who was the pm of india in 2019?' 
            }
        ]
    },
    {
        role:"model",
        parts:[
            {
                text:"The Prime Minister of India in 2019 was Narendra Modi."
            }
        ]
    } example of chat history */
    ];

io.on("connection", (socket) => {

    console.log('a user connected');

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });

    socket.on("ai-message",async (data)=>{        
        console.log("Recieved AI message:",data);

        chatHistory.push({
            role:"user",
            parts:[{text:data}]
        });

        const response = await generateResponse(chatHistory);

        chatHistory.push({
            role:"model",
            parts:[{text:response}]
        });

        console.log("AI Response:",response);
        socket.emit("ai-message-response",response);
    })
});


httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 