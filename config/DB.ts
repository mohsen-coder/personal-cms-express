import { Sequelize } from 'sequelize';

export const database = new Sequelize('personal_blog', 'root', '123456789', { 
    dialect: 'mysql', 
    host: 'localhost', 
    storage: "./session.mysql" 
})