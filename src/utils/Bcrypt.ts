import bcrypt from "bcrypt"
import config from 'config'

export class Bcrypt {

    static hashPassword(password: string): string {
        const salt = config.get<number>('bcryptSaltRounds')
        return bcrypt.hashSync(password, salt)
    }

    static comparePassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash)
    }
}