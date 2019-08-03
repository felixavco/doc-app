import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import db from '../models'
const { User } = db;

const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.SECRET
};

const passportJWT = (passport) => {
	passport.use(
		new JwtStrategy(opts, async (jwt_payload, done) => {
			try {
				
				const user = await User.findByPk(jwt_payload.id);

				if (!user) {
					return done(null, false);
				}
				// * If user is found return the user
                return done(null, user);
                
			} catch (error) {
				console.error(error);
			}
		})
	);
};

export default passportJWT;