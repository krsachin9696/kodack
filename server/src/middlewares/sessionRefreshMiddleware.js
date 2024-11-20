export function sessionRefreshMiddleware(req, res, next) {
  if (req.session) {
    // Extend session expiration on client side (browser cookie)
    req.session.cookie.maxAge = 10 * 1000;

    // Update session expiration in PostgreSQL store
    req.session.save((err) => {
      if (err) {
        console.error('Failed to save session:', err);
      }
      next();
    });
  } else {
    return next();
  }
}
