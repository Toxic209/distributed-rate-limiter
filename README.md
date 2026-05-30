# distributed-limiter

  

A high-performance distributed rate limiter based on the Token Bucket algorithm, designed for Node.js applications using Redis as the backing store.

  

## Features

  

- Token Bucket rate limiting

- Redis-backed distributed state

- Atomic operations using Lua scripts

- TypeScript support

- Lightweight and framework-agnostic

- Suitable for APIs, services, and microservices

  

## Installation

  

```bash

npm  install  distributed-limiter

```

  

## Quick Start

  

```ts

import { TokenBucketLimiter } from  "distributed-limiter";

  

const limiter =  new  TokenBucketLimiter({

redis,
capacity,
refillRate

});

  

const result =  await limiter.isAllowed({

key:  "user:123",

tokenRequest:  1,

});

  

if (result.allowed) {

console.log("Request allowed");

} else {

console.log("Rate limit exceeded");

}

```

  

## API

  

### `new TokenBucketLimiter(options)`

  

Creates a new limiter instance.

  

```ts

const limiter =  new  TokenBucketLimiter({

redis,
limiterCapacity,
refillRate

});

```

  

### `limiter.isAllowed(request)`

  

Checks whether a request can consume the requested number of tokens.

  

```ts

const result =  await limiter.isAllowed({

key: string,

tokenRequest: number,

});

```

  

#### Request Parameters

`key` - Unique identifier (user, IP, API key, etc.)

`capacity` - Maximum bucket size

`refillRate` - Tokens added per second

`tokenRequest` - Tokens required for the request

  **Note:** `capacity` and `refillRate` can be configured once during limiter initialization and reused automatically for all requests. In applications, only `key` and `tokenRequest` need to be supplied per request.

#### Response

  

```ts

{

allowed: boolean;

}

```

  

## Architecture
![Diagram](/assets//Rate%20Limiter%20Architecture.png)

```text

Client Request

│

▼

BucketLimiter

│

▼

Redis Lua Script

│

▼

Token Bucket State

```

  

The limiter stores bucket state in Redis and performs all token calculations atomically through Lua scripts to ensure correctness across multiple application instances.

  

## License

MIT