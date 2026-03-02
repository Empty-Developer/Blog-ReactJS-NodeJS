import PostModel from '../models/Post.js'

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
                message: 'Not found create post!',
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec()

        res.json(posts)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
                message: 'Not found get posts!',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        
        const doc = await PostModel.findOneAndUpdate(
            {
            _id: postId,
            },
            {
            $inc: {viewsCount: 1},
            },
            {
            new: true,
            },)

        if (!doc) {
            return res.status(404).json({
                message: 'Post not found!'
            })
        }
        res.json(doc)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
                message: 'Not found get post!',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        const doc = await PostModel.findOneAndDelete({
            _id: postId
        })

        if (!doc) {
            return res.status(404).json({
                message: 'Not found get post!'
            })
        }

        res.json({
            success: true
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
                message: 'Not found delete post!',
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        const doc = await PostModel.updateOne({
            _id: postId
        },{
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags,
        },
        )

        res.json({
            success: true,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
                message: 'Not found update post!',
        })
    }
}