export const verifyToken = async (req, res) => {
    try {
        // The middleware already verified the token
        const user = req.user || req.employee;
        
        if (!user) {
            return res.status(401).json({ valid: false });
        }

        res.status(200).json({ 
            valid: true,
            userType: req.user ? 'customer' : 'employee',
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ message: 'Token verification failed' });
    }
};