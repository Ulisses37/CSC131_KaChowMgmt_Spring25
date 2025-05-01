export const authorizeAdmin = (req, res, next) => {
    if (!req.employee.admin) {
        return res.status(403).json({ 
            success: false,
            message: 'Forbidden: Admin privileges required' 
        });
    }
    next();
};