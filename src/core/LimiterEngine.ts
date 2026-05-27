import type { Redis } from "ioredis";
import { TokenBucket } from "./TokenBucket.js";

export type RateLimiterOptions = {
    key: string,
    tokenRequest: number
}

export class Limiter{

    constructor(private redis: Redis, private capacity: number, private refillRate: number){}

    async isAllowed({key, tokenRequest}: RateLimiterOptions): Promise<Boolean>{
        
        //prepare arguments
        const args = {
            key,
            capacity: this.capacity,
            refillRate: this.refillRate, 
            tokenRequest
        }
        
        //call bucket execution
        const redisResponse = await TokenBucket(this.redis, args);;

        //return decision
        return redisResponse
    }
}