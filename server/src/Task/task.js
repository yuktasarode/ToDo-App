const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('../Middleware/authMiddleware'); 

const prisma = new PrismaClient();
const router = express.Router();

// Create Task for a User
router.post('/addTask', authMiddleware, async (req, res) => {
  const { text, completed } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user ID found" });
  }
  try {

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
router.get('/tasks', async (req, res) => {
    const userId = req.user.id;
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
  
// ✅ Delete Task Route
router.delete('/deleteTask/:taskId', authMiddleware, async (req, res) => {
  const userId = req.user?.id;
  const { taskId } = req.params;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user ID found" });
  }

  try {
    // Check if the task exists and belongs to the user
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized: You can only delete your own tasks" });
    }

    // Delete the task
    await prisma.task.delete({ where: { id: taskId } });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

module.exports = router;
