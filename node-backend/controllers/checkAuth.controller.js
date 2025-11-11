export const checkAuth = async (req, res) => {
    try {
        res.json({
            message: "user authorized",
            userId: req.user.id
        });
    } catch (error) {
        res.status(500).json({ message: "error checking user" });
    }
};
