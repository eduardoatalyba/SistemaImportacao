const jwt = require('jsonwebtoken');
const user = require('../service/user');

const secretKey = "MeuSegredoForte";

function authMiddleware(role) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Extrai o token da string "Bearer <token>"

        if (!token) {
            return res.status(400).json({ msg: 'Token inválido ou não fornecido' });
        }

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ msg: 'Token inválido ou não fornecido' });
            }

            const verify = await user.Verify(decoded.id, decoded.role);
            if (!verify || (role && !role.includes(decoded.role))) {
                return res.status(401).json({ msg: 'Permissão negada - Sem permissão' });
            }

            req.session = decoded;
            next();
        });
    };
}

module.exports = authMiddleware;
