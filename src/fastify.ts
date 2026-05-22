import Fastify from "fastify";
import RateLimiter from "./api/RateLimiter.js";

const fastify = Fastify({
    logger: true
});

fastify.register(RateLimiter, {
    prefix: "api/v1/limiter"
})


export default fastify