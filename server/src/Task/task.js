const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create Task for a User
router.post('/addTask', async (req, res) => {
  const { text, userId, completed } = req.body;
  try {
    // Ensure the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create task for the user
    const task = await prisma.task.create({
      data: {
        text,
        completed,
        userId, // Link task to the user
      },
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});


// Get User's tasks
router.get('/:id/task', async (req, res) => {
    const userId = req.params.id;
    try {
      const tasks = await prisma.task.findMany({
        where: { userId },
      });
  
      if (tasks.length === 0) {
        return res.status(404).json({ error: 'No tasks found for this user' });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tasks' });
    }
  });
  

module.exports = router;
