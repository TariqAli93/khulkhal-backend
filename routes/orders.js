import { createOrders, findAllOrders, deleteAllOrders, deleteOrder, findOneOrder, findNewOrders, updateStatus } from '../controller/orders.js'

const OrdersRoute = (app) => {
    app.post('/api/orders', createOrders);
    app.get('/api/orders', findAllOrders);
    app.get('/api/orders/new', findNewOrders);
    app.get('/api/orders/:orderId', findOneOrder);
    app.patch('/api/orders/:orderId', updateStatus)
    app.delete('/api/orders/:orderId', deleteOrder);
    app.delete('/api/orders', deleteAllOrders);
}

export default OrdersRoute;