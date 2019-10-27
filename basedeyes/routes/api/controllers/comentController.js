const CommentModel = require('../../../models/comentariosModel')
const errorHandler = require('./dbErrorHandler')
const _ = require('lodash')

const create = (req, res, next) => {
    const comment = new CommentModel(req.body)

    comment.save((err, result) => {
        if (err) {
            return res.status(400).json({
                message: errorHandler(err)
            })
        }
        res.status(200).json({
            message: 'Guardado Correctamente'
        })
    })
}

const userByID = (req, res, next, id) => {
    CommentModel.findById(id)
    .exec((err, user) => {
        if (err || !user) return res.status(400).json({
            error: "Client not Found"
        })
        req.profile = user
        next()
    })
}

const read = (req, res) => {
    return res.json(req.profile)
}

const list = (req, res) => {
    CommentModel.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(users)
    })
}

module.exports = { create, userByID, read, list }