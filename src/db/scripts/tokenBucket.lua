local key = KEYS[1];

local capacity = tonumber(ARGV[1]) or 0;
local refillRate = tonumber(ARGV[2]);
local tokenRequest = tonumber(ARGV[3]);
local currentTime = tonumber(ARGV[4]);

--get bucket from redis
local bucket = redis.call(
    "HMGET",
    key,
    "tokens",
    "lastRefill"
)
--declare token and lastRefill from bucket
local tokens = tonumber(bucket[1]);
local lastRefill = tonumber(bucket[2]);

--if no token refillRate, initialize token with capacity and lastRefill with currentTime.
if tokens == nil then
    tokens = capacity
    lastRefill = currentTime
end

--calculate refill and elapsed time
local elapsedTime = (currentTime - lastRefill) / 1000
local refill = elapsedTime * refillRate

--prepare tokens and avoid bucket overflow
tokens = math.min(capacity, tokens + refill)

--if requestedTokens exceeds available tokens, return 0
if tokens < tokenRequest then
    return 0
end
--consume tokens
tokens = tokens - tokenRequest
--HMSET the new bucket in redis
redis.call(
    "HMSET",
    key,
    "tokens",
    tokens,
    "lastRefill",
    currentTime
)
--set redis expire
redis.call(
    "EXPIRE",
    key,
    3600
)
return 1