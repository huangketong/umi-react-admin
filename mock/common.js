

module.exports = {
    [`GET /api/account/v2/login`](req, res) {
        res.json({
            data: {
                token: '123456789hjhjhjh',
                userName: '这样不好吧',
            }
        });
    },

    [`GET /api/account/v2/logout`](req, res) {
        res.json({
            data: {
                token: '123456789hjhjhjh',
                userName: '这样不好吧',
            }
        });
    },
}