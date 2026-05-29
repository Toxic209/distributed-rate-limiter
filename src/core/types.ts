export type BucketOptions = {
    key: string,
    capacity: number,
    refillRate: number,
    tokenRequest: number
}

export type RateLimiterOptions = {
    key: string,
    tokenRequest: number
}