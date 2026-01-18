const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('http://localhost:5173/'); // Redirect to frontend
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout((err) => {
             if (err) { return next(err); }
             res.redirect('http://localhost:5173/');
        });
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
