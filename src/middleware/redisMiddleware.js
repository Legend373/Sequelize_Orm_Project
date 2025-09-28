import redis from "../utils/redis.js";

export const cacheMiddleware = async (req, res, next) => {
    try {
        const key = req.originalUrl; // cache key is the full request URL
        const cached = await redis.get(key);

        if (cached) {
            console.log(`⚡ Cache hit for ${key}`);
            return res.json(JSON.parse(cached)); // return cached response
        }

        console.log(`❌ Cache miss for ${key}`);
        const originalJson = res.json.bind(res); // keep reference to original res.json

        res.json = (body) => {
            // cache stringified response with 60s expiration
            redis.set(key, JSON.stringify(body), "EX", 60);
            return originalJson(body); // call original res.json
        };

        next();
    } catch (err) {
        console.error("Redis middleware error:", err);
        next(); // fallback to normal flow if Redis fails
    }
};
