import type { Request } from "./types.js";
import type { FastifyInstance } from "fastify";
import Limiter from "../core/LimiterEngine.js";
import { redisClient } from "../db/RedisClient.js";

export default async function RateLimiter(fastify: FastifyInstance){

    fastify.post<{Body: Request}>("/check", async (request, reply) => {
        
        const reqData: Request = request.body;

        const limiter = new Limiter(redisClient, 10, 2);

        const allowed = await limiter.isAllowed({
            key: reqData.key,  
            tokenRequest: reqData.tokenRequest 
        });

        return { allowed }
    });
}