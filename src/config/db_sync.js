import Account from '../models/Account';
import User from '../models/User';

const db_sync = () => {

    Account.sync({ force: true })
        .then(() => {
            return Account.create({
                name: "Xilews Web Services"
            });
        });

    User.sync({ force: true })
        .then(() => {
            return User.create({
                firstName: "Felix",
                middleName: "Vladimir",
                lastName: "Avelar",
                lastName2: "Cornejo",
                email: "felix@mail.com",
                password: "ZARZAB"
            });
        });
}

export default db_sync;