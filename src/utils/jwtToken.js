
import jwt from 'jsonwebtoken';

const accessSecrets = {
    user: process.env.ACCESS_SECRET_CLIENT,
    admin: process.env.ACCESS_SECRET_ADMIN,
    agent: process.env.ACCESS_SECRET_AGENT
};

const refreshSecrets = {
    user: process.env.REFRESH_SECRET_CLIENT,
    admin: process.env.REFRESH_SECRET_ADMIN,
    agent: process.env.REFRESH_SECRET_AGENT
};

const ACCESS_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';

export const generateTokens = ({ id, role }) => {
    const accessSecret = accessSecrets[role];
    const refreshSecret = refreshSecrets[role];

    const accessToken = jwt.sign({ id, role }, accessSecret, { expiresIn: ACCESS_EXPIRY });
    const refreshToken = jwt.sign({ id, role }, refreshSecret, { expiresIn: REFRESH_EXPIRY });

    return { accessToken, refreshToken };
};


