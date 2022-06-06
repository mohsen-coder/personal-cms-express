import jwt, {JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();


export class JWT {
    static generateToken(data: object, expiresIn: string): string {
        return jwt.sign(data, process.env.TOKEN_SECRET_KEY!, {expiresIn: expiresIn})
    }

    static authenticateToken(authHeader: string): JwtPayload | string | null {
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) return null;

        try {
            return jwt.verify(token, process.env.TOKEN_SECRET_KEY!);
        } catch (error) {
            return null
        }
    }
}