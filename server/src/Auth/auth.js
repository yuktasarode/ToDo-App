const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create User
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  });

  module.exports = router;
