

export default {
    [`POST /api/account/v2/login`]: (req, res) => {
        res.json({
            token: '123456789hjhjhjh',
            userName: '这样不好吧',
        });
    },

    [`POST /api/account/v2/logout`]: (req, res) => {
        res.json({
            token: '123456789hjhjhjh',
            userName: '这样不好吧',
        });
    },
}