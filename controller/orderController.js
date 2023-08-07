import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

/**
 * @desc           Create new order
 * @route          Post /api/orders
 * @access  private
 */
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(404);
        throw new Error('No order items')
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createOrder = await order.save();
        res.status(201).json(createOrder);
    }
});

/**
 * @desc         Get order by ID
 * @route        Get /api/orders/:id
 * @access  private
 */
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate (
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        throw new Error('Order not found')
    }
});

/**
 * @desc          Update order tp paid
 * @route         PUT /api/orders/:id/pay
 * @access  private
*/
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.bady.id,
            state: req.body.state,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updateOrder = await order.save();

        res.json(updateOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

/**
 * @desc          Get logged in user's orders
 * @route         Get /api/orders/myorders
 * @access  private
 */
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };