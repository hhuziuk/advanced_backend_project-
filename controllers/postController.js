const PostService = require("../services/postService");
const { Post } = require("../models/models");

class PostController {
    async getAll(req, res) {
        try {
            const posts = await PostService.getAll();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getOne(req, res) {
        try {
            const post = await PostService.getOne(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async create(req, res) {
        try {
            const { title, content } = req.body;
            const image = req.file;
            const userId = req.user.id;
            //console.log(req.files)
            if (!title || title.trim().length === 0 || !content || content.trim().length === 0) {
                return res.status(400).json({ message: "Post title and content cannot be null or empty" });
            }

            const post = await PostService.create({ title, content }, req.files.image, userId);
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const post = await PostService.delete(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = new PostController();
