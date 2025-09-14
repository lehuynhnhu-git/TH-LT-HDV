// middleware/errorHandler.js
function notFound(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    console.error(`[${new Date().toISOString()}]`, status, err.message);

    // render error page
    res.status(status);
    res.render('error', {
        title: 'Error',
        status,
        message: err.message || 'Internal Server Error'
    });
}

module.exports = { notFound, errorHandler };