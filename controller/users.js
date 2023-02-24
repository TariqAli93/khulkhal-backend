import UsersModel from "../models/users.js";
import jwt from "jsonwebtoken";

export const createUsers = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const users = new UsersModel({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role
    });

    try {
        await UsersModel.create(users, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Users."
        });
    }
}

export const findAllUsers = async (req, res) => {
    try {
        await UsersModel.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving users."
                });
            else res.send(data);
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }
}

export const findOneUsers = async (req, res) => {
    try {
        await UsersModel.findById(req.params.userId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Users with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Users with id " + req.params.userId
                    });
                }
            } else res.send(data);
        });
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Users with id " + req.params.userId
        });
    }
}

export const updateUsers = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    try {
        await UsersModel.updateById(
            req.params.userId,
            new UsersModel(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found Users with id ${req.params.userId}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error updating Users with id " + req.params.userId
                        });
                    }
                } else res.send(data);
            }
        );
    } catch (err) {
        res.status(500).send({
            message: "Error updating Users with id " + req.params.userId
        });
    }
}

export const deleteUsers = async (req, res) => {
    try {
        await UsersModel.remove(req.params.userId, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Users with id ${req.params.userId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Could not delete Users with id " + req.params.userId
                    });
                }
            } else res.send({ message: `Users was deleted successfully!` });
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Users with id " + req.params.userId
        });
    }
}

export const deleteAllUsers = async (req, res) => {
    try {
        await UsersModel.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while removing all users."
                });
            else res.send({ message: `All Users were deleted successfully!` });
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all users."
        });
    }
}


export const loginUsers = async (req, res) => {
    try {
        await UsersModel.login(req.body.email, req.body.password, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Users with email ${req.body.email}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving Users with email " + req.body.email
                    });
                }
            } else {
                const token = jwt.sign({
                    userName: data.userName,
                    email: data.email,
                    userId: data.userId,
                    role: data.role
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1d"
                    }
                );
                res.status(200).json({
                    message: "Auth successful",
                    token: token
                });

                console.log(token);

                res.send(data);
            }
        });
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Users with email " + req.body.email
        });
    }
}


export const registerUsers = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const users = new UsersModel({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        role: "USER"
    });

    UsersModel.create(users, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
};