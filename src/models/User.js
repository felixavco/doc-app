import Sequelize from 'sequelize';
import sequelize from '../config/db_connection';
import Account from './Account';

const Model = Sequelize.Model;


class User extends Model { };

User.init(
    {
        firstName: { type: Sequelize.STRING, allowNull: false, validate: { len: [2, 50] } },
        middleName: { type: Sequelize.STRING, validate: { len: [2, 50] } },
        lastName: { type: Sequelize.STRING, allowNull: false, validate: { len: [2, 50] } },
        lastName2: { type: Sequelize.STRING, validate: { len: [2, 50] } },
        email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false }
    },
    {
        sequelize,
        modelName: 'users'
    }
);


export default User;