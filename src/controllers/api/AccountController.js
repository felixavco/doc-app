import db from '../../models';
const { Account } = db;

/**
 * @Route '/api/account/list'
 * @Method GET
 * @Access Protected
 * @Description returns the list of all accounts
 */
class AccountController {
  getAccounts = () => async (req, res) => {
    try {

      const accounts = await Account.findAll();

      res.json(accounts);
      
    } catch (error) {
      console.error("_catch: " + error);
      res.status(500).json({ ERROR: error });
    }
  }

}

export default AccountController;

