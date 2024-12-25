import passport from "passport";
import passportJWT from "passport-jwt";
import prisma from '../../prisma/prisma_client.js';

const { Strategy: JwtStrategy, ExtractJwt } = passportJWT;

export default passport.use(
    new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    },
    async (jwtPayload, done) => {
        try{
            if(!jwtPayload) throw new Error("Custom jwt-strategy: jwtPayload parameter is not accessible");

            const user = await prisma.user.findUnique({
                where: { id: jwtPayload.id }
            });
            if (!user) {
                throw new Error("User not found");
            }
            return done(null, user);
        }
        catch(err){
            return done(err, null);
        }
    })
);