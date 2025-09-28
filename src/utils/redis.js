import Redis from "ioredis";

const redis = new Redis({
    host: "127.0.0.1", // since server is running locally
    port: 6379,
});

redis.on("connect", () => {
    console.log("✅ Connected to Redis (ioredis)");
});

redis.on("error", (err) => {
    console.error("❌ Redis error:", err);
});

export default redis;
