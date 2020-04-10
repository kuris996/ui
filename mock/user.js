export default {
    'POST /api/login/account': (req, res) => {
        const { password, userName } = req.body;
        if (password === 'ui' && userName === 'user') {
            res.send({
                status: 'ok',
                currentAuthority: 'user',
            });
            return;
        }
        res.send({
            status: 'error',
            currentAuthority: 'guest',
        })
    },
};