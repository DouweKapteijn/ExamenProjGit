import jwt from "jsonwebtoken";

export default function authorize(roles) {
    return (req, res, next) => {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) {
            return res.status(401).json({message: "Geen token aanwezig"});
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({message: "Unauthorized"});
            }

            if (!roles.includes(user.role)) {
                return res.status(403).json({message: "Geen toegang"});
            }

            req.user = user;
            next();
        });
    };
}
