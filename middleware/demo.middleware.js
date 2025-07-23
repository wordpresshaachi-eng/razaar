function iptrack(req, res, next) {
    const allowedHostname = 'localhost'; 
    console.log(`\nrequested by IP Address: ${req.ip}`);
    console.log(`requested from Host: ${req.host}`);
    console.log(`requested from Hostname: ${req.hostname}`);

    if (req.hostname !== allowedHostname) {
        return res.status(403).json({ message: 'Forbidden: Hostname not allowed' });
    }

    next();
}
module.exports = iptrack;