const Client = require('../../../models/model-inf-client')
const errorHandler = require('./dbErrorHandler')
const _ = require('lodash')

const create = (req, res, next) => {
    const client = new Client(req.body)
    client.save((err, result) => {
        if (err) {
            console.log("ss");
            return res.status(400).json({
            
                message: errorHandler(err)
            })
        }
        res.status(200).json({
            message: "Guardado Correctamente"
        })
    })
}

/*
    InfClient.find()
    .then(data => {
        const dbClients = data.filter(function(obj) {
        return obj.numero_cliente === newClient.numero_cliente
        })
        
        if (dbClients[0].numero_cliente === newClient.numero_cliente) {
            res.status(200).send('Parece que la Ip o Numero de Cliente ya Existe!')
        }
    })
    .catch(err => {
        newClient.save()
        res.status(200).send(newClient);
    }) */

const userByID = (req, res, next, id) => {
    Client.findById(id)
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
    Client.find((err, users) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(users)
    })
}

const update = (req, res, next) => {
    let client = req.profile
    client = _.extend(client, req.body)
    client.save((err) => {
        if (err) {
            return res.status(400).json({
                message: errorHandler(err)
            })
        }
        res.json(client)
    })
}

const remove = (req, res, next) => {
    let client = req.profile
    client.remove((err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(deletedUser)
    })
}

module.exports = { create, read, remove, update, list, userByID }