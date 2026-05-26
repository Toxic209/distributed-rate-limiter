import fs from "fs"
import { redisClient } from "../db/RedisClient.js"
import path from "path"

const tokenBucketLua = fs.readFileSync(path.join(import.meta.dirname, "../db/scripts/tokenBucket.lua"), "utf-8");

type BucketOptions = {
    key: string,
    capacity: number,
    refillRate: number,
    tokenRequest: number
}

export async function TokenBucket({ key, capacity, refillRate, tokenRequest }: BucketOptions): Promise<Boolean> {

    const currentTime = Date.now();

    const sha = await redisClient.script("LOAD", tokenBucketLua) as string;

    try {
        const result = await redisClient.evalsha(
            sha,
            1,
            key,
            capacity,
            refillRate,
            tokenRequest,
            currentTime
        );
    
        return result === 1;
        
    } catch (error) {
        if (error instanceof Error && error.message.includes("NOSCRIPT")) {
            const result = await redisClient.eval(
                tokenBucketLua,
                1,
                key,
                capacity,
                refillRate,
                tokenRequest,
                currentTime
            );
        
            return result === 1;
        }

        throw Error;
    }
}