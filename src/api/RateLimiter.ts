import type { Request } from "./types.js";
import type { FastifyInstance } from "fastify";
import Limiter from "../core/LimiterEngine.js";

export default async function RateLimiter(fastify: FastifyInstance){
    fastify.post<{Body: Request}>("/check", (request, reply) => {
        const reqData: Request = request.body;

        const limiter = new Limiter;

        const allowed = limiter.isAllowed(reqData.key);

        return { allowed }
    });
}