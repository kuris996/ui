export default {
    'POST /api/login/account': (req, res) => {
        const { password, userName, type } = req.body;
        if (password === 'ui' && userName === 'admin') {
            res.send({
                status: 'ok',
                type,
                currentAuthority: 'admin'
            });
            return;
        }
        res.send({
            status: 'error',
            type,
            currentAuthority: 'guest',
        })
    },
};