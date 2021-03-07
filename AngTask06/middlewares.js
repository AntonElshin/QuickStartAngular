import colors from 'colors'

export function requestTime(req, res, next) {
    req.requestTime = Date.now()
    next()
}

export function logger(req, res, next) {
    console.log(colors.bgGreen.black(`Req.time: ${req.requestTime}`))
    next()
}

export function allowCrossDomain (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
}
