import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import { getUserWithRolebyID, handleLogin } from "services/auth.service";


const configPassportLocal = () => {
    passport.use(new LocalStrategy({
        //usernameField: "email"
        passReqToCallback: true
    }, async function verify(req, username, password, callback) {
        //xac thuc nguoi dung 
        const { session } = req as any;
        if (session?.messages?.length) {
            session.messages = [];
        }
        return handleLogin(username, password, callback);
    }));

    //luu thong tin vao session (DB) va tra ve sessionid ve cookie (FE)
    passport.serializeUser(function (user: any, callback) {
        callback(null, { id: user.id, username: user.username });
    });

    //neu xac thuc sessionid thanh cong se thuc hien deserializeUser de nap thong tin user va tra ra thong tin user (req.user chua thong tin user)
    // => Khi do he thong se biet ai la nguoi da dang nhap 
    passport.deserializeUser(async function (user: any, callback) {
        const { id, username } = user
        //querry to database
        const userInDB = await getUserWithRolebyID(id)
        return callback(null, { ...userInDB });
    });
}

export default configPassportLocal