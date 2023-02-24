import OrdersModel from "../models/orders.js";

export const createOrders = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // const order = new OrdersModel({
    //     orderStatus: req.body.orderStatus,
    //     idUser: req.body.idUser,
    //     orderItems: req.body.orderItems.map((item) => ({
    //         quantity: item.quantity,
    //         idProduct: item.idProduct
    //     }))
    // })

    const order = new OrdersModel(req.body);

    OrdersModel.create(order, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        else res.send(data);
    });
}

export const findAllOrders = (req, res) => {
    OrdersModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
}


export const findOneOrder = (req, res) => {
    OrdersModel.findById(req.params.orderId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Order with id " + req.params.orderId
                });
            }
        } else res.send(data);
    });
}


export const findNewOrders = (req, res) => {
    OrdersModel.getAll((err, data) => {
        if (err) {

            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        }
        else {
            let count = 0;
            const newOrders = data.filter((order) => order.orderStatus === "NEW");
            count = newOrders.length;
            res.send({ count: count });
        }
    });
}


export const updateStatus = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    OrdersModel.update(
        req.params.orderId,
        new OrdersModel(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.params.orderId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.params.orderId
                    });
                }
            } else res.send(data);
        }
    );
}


export const deleteOrder = (req, res) => {
    OrdersModel.remove(req.params.orderId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.orderId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Order with id " + req.params.orderId
                });
            }
        } else res.send({ message: `Order was deleted successfully!` });
    });
}


export const deleteAllOrders = (req, res) => {
    OrdersModel.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all orders."
            });
        else res.send({ message: `All Orders were deleted successfully!` });
    });
}