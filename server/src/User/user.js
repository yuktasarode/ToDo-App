const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();



// Get User's tasks
router.post('/getUser', async (req, res) => {
    const { email } = req.body;
    try {
      const user = await prisma.user.findMany({
        where: { email }
    });
        if (user.length > 0) 
        {
        res.status(201).json(user);
        } else {
        res.status(401).json({ message: 'No user found' });}

      
    } catch (error) {
      res.status(500).json({ error: 'Error in fincing user' });
    }
  });

module.exports = router;
