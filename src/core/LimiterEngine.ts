import type { Redis } from "ioredis";
import { TokenBucket } from "./TokenBucket.js";

type RateLimiterOptions = {
    key: string,
    tokenRequest: number
}

class Limiter{

    constructor(private redis: Redis, private capacity: number, private refillRate: number){}

    async isAllowed({key, tokenRequest}: RateLimiterOptions){
        
        //prepare arguments
        const args = {
            key,
            capacity: this.capacity,
            refillRate: this.refillRate, 
            tokenRequest
        }
        
        //call bucket execution
        const redisResponse = await TokenBucket(args);;

        //return decision
        return redisResponse
    }
}

export default Limiter