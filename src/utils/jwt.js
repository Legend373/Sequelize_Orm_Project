// src/utils/jwt.js
import jwt from "jsonwebtoken";

const JWTConfig = {
    access: {
        secret: process.env.JWT_ACCESS_SECRET || "default_access_secret",
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    },
    refresh: {
        secret: process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    },
};

const JWTService = {
    /**
     * Generate a JWT token
     * @param {Object} payload - The payload containing user info
     * @param {number|string} payload.id - User ID
     * @param {string} payload.role - User role
     * @param {"access"|"refresh"} type - Token type
     * @returns {string} JWT token
     */
    generateToken: (payload, type = "access") => {
        const { secret, expiresIn } = JWTConfig[type];
        return jwt.sign(payload, secret, { expiresIn });
    },

    /**
     * Verify a JWT token
     * @param {string} token - JWT token to verify
     * @param {"access"|"refresh"} type - Token type
     * @returns {Object|null} Decoded payload or null if invalid
     */
    verifyToken: (token, type = "access") => {
        const { secret } = JWTConfig[type];
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            console.error(`[JWTService] Invalid ${type} token:`, error.message);
            return null;
        }
    },

    /**
     * Refresh access and refresh tokens
     * @param {string} refreshToken - The refresh token
     * @returns {{ accessToken: string, refreshToken: string } | null} New tokens or null if invalid
     */
    refreshTokens: (refreshToken) => {
        const decoded = JWTService.verifyToken(refreshToken, "refresh");

        if (!decoded) return null; // Invalid or expired refresh token

        const { id, role } = decoded;

        const newAccessToken = JWTService.generateToken({ id, role }, "access");
        const newRefreshToken = JWTService.generateToken({ id, role }, "refresh");

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    },
};

export default JWTService;
