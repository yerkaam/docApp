export const doctorOnly = (req, res, next) => {
    if (!req.session?.doctorId) {
        return res.status(403).json({ message: "You must be logged in as doctor" });
    }
    next();
};
