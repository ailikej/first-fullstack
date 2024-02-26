const express = require('express');
const pool = require('../db'); // Adjust based on your actual path
const  authenticateToken  = require('../middlewares/authMiddleware'); // Assume you have this middleware
const { postValidationRules, validate } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Create a new post
router.post('/', [authenticateToken, postValidationRules(), validate], async (req, res) => {
    const userId = req.user.userId; // Assuming JWT contains userId
    const { title, content } = req.body;
    try {
        const newPost = await pool.query(
            'INSERT INTO posts (userId, title, content) VALUES ($1, $2, $3) RETURNING *',
            [userId, title, content]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
// router.post('/', (req, res) => {
//     res.send('Post route is working');
//   });
  

// Get all posts
router.get('/', authenticateToken, async (req, res) => {
    try {
        const allPosts = await pool.query('SELECT * FROM posts');
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// Get a single post by id
router.get('/:id',authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        if (post.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a post
router.put('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body; // Assuming you want to allow updates to title and content
    try {
        const updatePost = await pool.query(
            'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [title, content, id]
        );
        if (updatePost.rows.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatePost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    // res.send('Post route is working');
});

// Delete a post
router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const deletePost = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (deletePost.rowCount === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
