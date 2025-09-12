// src/middleware/authMiddleware.js
import JWTService from "../utils/jwt.js";

/**
 * Middleware to require a valid access token
 * Attaches user info to req.user
 */
export const requireAuth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).json({ error: "Access token required" });
        }

        const token = authHeader.startsWith("Bearer ")
            ? authHeader.split(" ")[1]
            : authHeader;

        const decoded = JWTService.verifyToken(token, "access");
        if (!decoded) {
            return res.status(401).json({ error: "Invalid or expired access token" });
        }

        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (err) {
        console.error("requireAuth error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * Middleware to restrict access based on roles
 * @param {Array<string>} roles - List of allowed roles
 */
export const requireRole = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "Authentication required" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden: insufficient permissions" });
        }

        next();
    };
};
