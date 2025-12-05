const auth = require('../auth')
const User = require('../models/user-model')
const bcrypt = require('bcryptjs')

getLoggedIn = async (req, res) => {
    try {
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }

        const loggedInUser = await User.findOne({ _id: userId });
        console.log("loggedInUser: " + loggedInUser);

        return res.status(200).json({
            loggedIn: true,
            user: {
                userName: loggedInUser.userName,
                email: loggedInUser.email,
                avatar: loggedInUser.avatar
            }
        })
    } catch (err) {
        console.log("err: " + err);
        res.json(false);
    }
}

loginUser = async (req, res) => {
    console.log("loginUser");
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }

        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (!existingUser) {
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        console.log("provided password: " + password);
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect) {
            console.log("Incorrect password");
            return res
                .status(401)
                .json({
                    errorMessage: "Wrong email or password provided."
                })
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);
        console.log(token);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true
        }).status(200).json({
            success: true,
            user: {
                userName: existingUser.userName,
                email: existingUser.email,
                avatar: existingUser.avatar              
            }
        })

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

logoutUser = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
}

registerUser = async (req, res) => {
    console.log("REGISTERING USER IN BACKEND");
    try {
        const { userName, email, password, passwordConfirm, avatar } = req.body;
        console.log("create user: " + userName + " " + email + " " + password + " " + passwordConfirm + " " + avatar);
        if (!userName || !email || !password || !passwordConfirm || !avatar) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordConfirm) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password confirm match");
        const existingUser = await User.findOne({ email: email });
        console.log("existingUser: " + existingUser);
        if (existingUser) {
            return res
                .status(400)
                .json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);

        const newUser = new User({userName, email, passwordHash, avatar});
        const savedUser = await newUser.save();
        console.log("new user saved: " + savedUser._id);

        return res.status(200).json({
            success: true,
            user: {
                userName: savedUser.userName,
                email: savedUser.email,
                avatar: savedUser.avatar              
            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

existingUser = async (req, res) => {
    try {
        const { email } = req.query;
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("existingUser: " + existingUser);
        }
        if (!existingUser) {
            return res
                .status(200).json({
                    success: true
                })
        } else {
            return res
                .status(200).json({
                    success: false,
                    errorMessage: "An account with this email address already exists."
                })
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

updateUser = async (req, res) => {
    try {
        console.log("UPDATING USER IN BACKEND");
        let userId = auth.verifyUser(req);
        if (!userId) {
            return res.status(200).json({
                loggedIn: false,
                user: null,
                errorMessage: "?"
            })
        }
        const existingUser = await User.findOne({ _id: userId });
        const { userName, password, passwordConfirm, avatar } = req.body;
        console.log("update user: " + userName + " " + password + " " + passwordConfirm + " " + avatar);
        if (!userName || !password || !passwordConfirm || !avatar) {
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });
        }
        console.log("all fields provided");
        if (userName.trim() === "") {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a username that is not all whitespace."
                });
        }
        if (password.length < 8) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter a password of at least 8 characters."
                });
        }
        console.log("password long enough");
        if (password !== passwordConfirm) {
            return res
                .status(400)
                .json({
                    errorMessage: "Please enter the same password twice."
                })
        }
        console.log("password and password confirm match");
        console.log("existingUser: " + existingUser);

        existingUser.userName = userName;
        existingUser.avatar = avatar;

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log("passwordHash: " + passwordHash);
        existingUser.passwordHash = passwordHash;

        const updatedUser = await existingUser.save();
        console.log("user updated: " + updatedUser._id);

        return res.status(200).json({
            success: true,
            user: {
                userName: updatedUser.userName,
                email: updatedUser.email,
                avatar: updatedUser.avatar

            }
        })
    } catch (err) {
        console.error(err);
        res.status(500).send();  
    }
}

module.exports = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    existingUser,
    updateUser
}