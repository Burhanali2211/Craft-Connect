const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth, roleCheck } = require('../middleware/auth');

const prisma = new PrismaClient();

// Get order history (Customer)
router.get('/my-orders', auth, roleCheck(['CUSTOMER']), async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.user.id },
      include: {
        orderItems: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching orders' });
  }
});

// Get incoming orders (Artisan)
router.get('/incoming', auth, roleCheck(['ARTISAN']), async (req, res) => {
  try {
    // Find all order items that belong to products owned by this artisan
    const orderItems = await prisma.orderItem.findMany({
      where: {
        product: {
          artisanId: req.user.id
        }
      },
      include: {
        order: {
          include: { customer: { select: { name: true, email: true } } }
        },
        product: true
      },
      orderBy: { order: { createdAt: 'desc' } }
    });
    
    // Group by order to make it cleaner
    const ordersMap = new Map();
    for (const item of orderItems) {
      if (!ordersMap.has(item.orderId)) {
        ordersMap.set(item.orderId, {
          ...item.order,
          items: []
        });
      }
      ordersMap.get(item.orderId).items.push(item);
    }
    
    res.json(Array.from(ordersMap.values()));
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching incoming orders' });
  }
});

// Place an order (Customer)
router.post('/', auth, roleCheck(['CUSTOMER']), async (req, res) => {
  try {
    const { items } = req.body; // Array of { productId, quantity }
    
    // Calculate total amount and create order items
    let totalAmount = 0;
    const orderItemsData = [];
    
    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) return res.status(404).json({ error: `Product ${item.productId} not found` });
      
      totalAmount += product.price * item.quantity;
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });
    }
    
    const order = await prisma.order.create({
      data: {
        totalAmount,
        customerId: req.user.id,
        orderItems: {
          create: orderItemsData
        }
      },
      include: { orderItems: true }
    });
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error placing order' });
  }
});

// Update order status (Artisan or Admin)
router.put('/:id/status', auth, roleCheck(['ARTISAN', 'ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Simplification: In a real app we'd verify the artisan actually owns products in this order
    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error updating order status' });
  }
});

module.exports = router;
