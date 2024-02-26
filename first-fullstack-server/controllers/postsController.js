const pool = require('../db'); // Adjust the path to your actual db.js location

// Create a new post
exports.createPost = async (req, res) => {
    const { userId, title, content } = req.body;
    try {
        const newPost = await pool.query(
            "INSERT INTO posts (userId, title, content) VALUES ($1, $2, $3) RETURNING *",
            [userId, title, content]
        );
        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM posts");
        res.json(allPosts.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Get a single post by id
exports.getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatePost = await pool.query(
            "UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *",
            [title, content, id]
        );

        if (updatePost.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(updatePost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const deletePost = await pool.query("DELETE FROM posts WHERE id = $1 RETURNING *", [id]);

        if (deletePost.rows.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

