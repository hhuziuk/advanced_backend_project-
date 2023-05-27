const {Post} = require("../models/models")
const fileService = require('../services/fileService')

class PostService {
    async getAll(){
        const posts = await Post.findAll()
        return posts
    }
    async getOne(id){
        if(!id){
            throw new Error('Id does not exist')
        }
        const post = await Post.findOne({id})
        return post
    }
    async create(post, image, userId) {
        if (!post.title || !post.content) {
            throw new Error('Post title and content cannot be null');
        }

        if (!userId) {
            throw new Error('User ID is required');
        }

        const fileName = await fileService.saveFile(image);
        const createdPost = await Post.create({ ...post, image: fileName, userId });
        return createdPost;
    }
    async delete(id){
        if(!id){
            throw new Error('Id does not exist')
        }
        const deletedPost = await Post.destroy({id})
        return deletedPost
    }
}

module.exports = new PostService()