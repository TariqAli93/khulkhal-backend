import { prismaInstance, prismaErrorHandling } from "../middlewares/handleError.middleware.js";

const OrdersModel = function (order) {
    this.orderStatus = order.orderStatus;
    this.idUser = order.idUser;
    this.orderItems = order.orderItems;
    this.closestPoint = order.closestPoint;
    this.district = order.district;
    this.province = order.province;
    this.customerName = order.customerName;
    this.customerPhone = order.customerPhone;
    this.totalPrice = order.totalPrice;
}

OrdersModel.create = async (newOrder, result) => {
    try {
        const order = await prismaInstance.orders.create({
            data: {
                orderStatus: newOrder.orderStatus,
                idUser: newOrder.idUser,
                closestPoint: newOrder.closestPoint,
                district: newOrder.district,
                province: newOrder.province,
                customerName: newOrder.customerName,
                customerPhone: newOrder.customerPhone,
                order_items: {
                    createMany: {
                        data: newOrder.orderItems.map((item) => ({
                            quantity: item.quantity,
                            idProduct: item.idProduct,
                            discount: item.discount,
                            totalPrice: item.totalPrice
                        }))
                    }
                }
            }
        });

        result(null, order);
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
};


OrdersModel.findById = async (id, result) => {
    try {
        const order = await prismaInstance.orders.findFirst({
            where: {
                orderId: JSON.parse(id)
            },

            include: {
                order_items: {
                    include: {
                        product: {
                            include: {
                                categories_products: {
                                    include: {
                                        category: true,
                                        product: true
                                    }
                                }
                            }
                        }
                    }
                },

                user: true
            }
        });

        result(null, order);
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
};

OrdersModel.update = async (id, order, result) => {
    try {
        const updatedOrder = await prismaInstance.orders.update({
            where: { orderId: JSON.parse(id) },
            data: order
        });

        result(null, updatedOrder);
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
}


OrdersModel.getAll = async (result) => {
    try {
        const orders = await prismaInstance.orders.findMany({
            include: {
                order_items: {
                    include: {
                        product: {
                            include: {
                                categories_products: {
                                    include: {
                                        category: true,
                                        product: true
                                    }
                                }
                            }
                        }
                    }
                },

                user: true
            }
        });

        result(null, orders);
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
}


OrdersModel.remove = async (id, result) => {
    try {
        const orderItems = await prismaInstance.order_items.deleteMany({
            where: {
                idOrder: JSON.parse(id)
            }
        });
        const deletedOrder = await prismaInstance.orders.delete({
            where: { orderId: JSON.parse(id) },
        });

        result(null, { deletedOrder, orderItems });
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
}


OrdersModel.removeAll = async (result) => {
    try {
        const orderItems = await prismaInstance.order_items.deleteMany({});
        const deletedOrders = await prismaInstance.orders.deleteMany({});

        result(null, { deletedOrders, orderItems });
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
}

export default OrdersModel;