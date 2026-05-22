import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})
import fastify from "./fastify.js"


const port = parseInt(process.env.PORT || "4001", 10)

//connect cleanly
function startServer() {
    try {
        fastify.listen({ port: port }, () => {
            console.log(`Serving at ${port}`);
        })
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

startServer();