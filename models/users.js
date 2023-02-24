import { prismaErrorHandling, prismaInstance } from "../middlewares/handleError.middleware.js";

const UsersModel = function (user) {
    this.userName = user.userName;
    this.email = user.email;
    this.password = user.password;
    this.phone = user.phone;
    this.role = user.role;
}

UsersModel.create = async (newUser, result) => {
    try {
        const user = await prismaInstance.users.create({
            data: newUser
        });

        result(null, user);
    } catch (err) {
        console.log(prismaErrorHandling(err, result));
        prismaErrorHandling(err, result);
    }
};

UsersModel.findById = async (userId, result) => {
    try {
        const singleUser = await prismaInstance.users.findUnique({
            where: {
                userId: userId * 1
            }
        });

        if (singleUser) {
            result(null, singleUser);
        } else {
            result({
                error: "Not Found",
                code: 404,
                errorMessage: "Not Found User"
            }, null);
        }
    } catch (err) {
        console.log(prismaErrorHandling(err, result));
        prismaErrorHandling(err, result);
    }
}

UsersModel.getAll = async (result) => {
    try {
        const users = await prismaInstance.users.findMany();
        result(null, users);
    } catch (err) {
        console.log(prismaErrorHandling(err, result));
        prismaErrorHandling(err, result);
    }
}

UsersModel.updateById = async (userId, user, result) => {
    try {
        const updateUsers = await prismaInstance.users.update({
            where: { userId: userId * 1 },
            data: user
        });
        result(null, updateUsers);
    } catch (error) {
        console.log(prismaErrorHandling(error, result));
        prismaErrorHandling(error, result);
    }
}

UsersModel.remove = async (id, result) => {
    try {
        const deleteUsers = await prismaInstance.users.delete({
            where: { userId: id * 1 }
        });
        result(null, deleteUsers);
    } catch (error) {
        console.log(prismaErrorHandling(error, result));
        prismaErrorHandling(error, result);
    }
}

UsersModel.removeAll = async (result) => {
    try {
        const deleteAllUsers = await prismaInstance.users.deleteMany({});
        result(null, deleteAllUsers);
    } catch (error) {
        console.log(prismaErrorHandling(error, result));
        prismaErrorHandling(error, result);
    }
}


UsersModel.login = async (email, password, result) => {
    try {
        const user = await prismaInstance.users.findFirst({
            where: {
                OR: [
                    {
                        userName: email,
                    },
                    {
                        AND: {
                            email: email,
                            password: password,
                        },
                    },
                ],
            }
        });

        console.log(email, password);

        if (user) {
            if (user.password === password) {
                result(null, user);
            } else {
                result({
                    error: "Wrong Password",
                    code: 401,
                    errorMessage: "Wrong Password"
                }, null);
            }
        } else {
            result({
                error: "Not Found",
                code: 404,
                errorMessage: "Not Found User"
            }, null);
        }
    } catch (err) {
        console.log(prismaErrorHandling(err, result));
        prismaErrorHandling(err, result);
    }
}


UsersModel.register = async (newUser, result) => {
    try {
        const user = await prismaInstance.users.create({
            data: newUser
        });

        result(null, user);
    } catch (err) {
        console.log(prismaErrorHandling(err, result));
        prismaErrorHandling(err, result);
    }
};

export default UsersModel;