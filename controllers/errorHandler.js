const handleError = (req, resp, next) => {
  resp.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' });
};

module.exports = handleError;