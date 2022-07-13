import jwt, {JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();

interface JWTResponse {
    accountId: string,
    username: string,
    name: string,
    family: string,
    email: string,
    role: string
}

export class JWT {
    static generateToken(data: object, expiresIn: string): string {
        return jwt.sign(data, process.env.TOKEN_SECRET_KEY!, {expiresIn: expiresIn})
    }

    static authenticateToken(authHeader: string): JWTResponse | null {
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) return null;

        try {
            const data = jwt.verify(token, process.env.TOKEN_SECRET_KEY!)
            if (!data) return null;
            return data as JWTResponse
        } catch (error) {
            return null
        }
    }
}