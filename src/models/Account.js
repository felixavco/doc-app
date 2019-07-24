import Sequelize from 'sequelize';
import sequelize from '../config/db_connection';
import User from './User';

const Model = Sequelize.Model;

class Account extends Model { };

Account.init(
    {
        name: { type: Sequelize.STRING, allowNull: false }, 
    },
    {
        sequelize,
        modelName: 'accounts'
    }
);

Account.hasMany(User, { as: 'users', foreignKey: 'user_id'});

export default Account;

