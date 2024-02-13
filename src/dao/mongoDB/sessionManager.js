const UserModel = require('../../models/userModel');

async function registerUser(userData) {
    try {
        const { email } = userData;

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            throw new Error('El usuario ya está registrado');
        }

        const newUser = new UserModel(userData);
        await newUser.save();

        return newUser.toObject();
    } catch (error) {
        throw error;
    }
}

async function findOrCreateUser(profile) {
    try {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = new UserModel({
                githubId: id,
                email,
                displayName
            });
            await user.save();
        }

        return user.toObject();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    findOrCreateUser,
};
