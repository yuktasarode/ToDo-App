const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../Middleware/authMiddleware'); 

const prisma = new PrismaClient();
const router = express.Router();



// Get User's tasks
router.post('/getUser', authMiddleware, async (req, res) => {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({ 
        where: { email }
    });
        if (user) 
        {
        res.status(201).json(user);
        } else {
        res.status(401).json({ message: 'No user found' });}

      
    } catch (error) {
      res.status(500).json({ error: 'Error in finding user' });
    }
  });

module.exports = router;
