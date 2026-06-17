const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { auth, roleCheck } = require('../middleware/auth');

const prisma = new PrismaClient();

// Update Artisan Profile
router.put('/profile', auth, roleCheck(['ARTISAN']), async (req, res) => {
  try {
    const { profileImage, coverImage, bio, location } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        profileImage,
        coverImage,
        bio,
        location
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        coverImage: true,
        bio: true,
        location: true
      }
    });
    
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// Get public artisan profile
router.get('/:id/profile', async (req, res) => {
  try {
    const artisan = await prisma.user.findUnique({
      where: { id: req.params.id, role: 'ARTISAN' },
      select: {
        id: true,
        name: true,
        profileImage: true,
        coverImage: true,
        bio: true,
        location: true,
        createdAt: true
      }
    });
    
    if (!artisan) {
      return res.status(404).json({ error: 'Artisan not found' });
    }
    
    res.json(artisan);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching artisan profile' });
  }
});

// Get all artisans
router.get('/artisans', async (req, res) => {
  try {
    const artisans = await prisma.user.findMany({
      where: { role: 'ARTISAN' },
      select: {
        id: true,
        name: true,
        profileImage: true,
        coverImage: true,
        bio: true,
        location: true,
        _count: {
          select: { products: true }
        }
      }
    });
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching artisans' });
  }
});

module.exports = router;
