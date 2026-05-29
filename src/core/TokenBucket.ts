import type { Redis } from "ioredis";
import type { BucketOptions } from "../index.js";
import { bucketLua } from "../db/scripts/tokenBucket.js";

const tokenBucketLua = bucketLua;



export async function TokenBucket(redis: Redis, { key, capacity, refillRate, tokenRequest }: BucketOptions): Promise<Boolean> {

    const currentTime = Date.now();

    const sha = await redis.script("LOAD", tokenBucketLua) as string;

    try {
        const result = await redis.evalsha(
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
            const result = await redis.eval(
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