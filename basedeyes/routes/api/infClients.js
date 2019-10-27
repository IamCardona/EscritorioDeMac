// Imports
const express = require('express')
const clientsControllers = require('./controllers/clientControllers')

// Router
const router = express.Router()

router.route('/api/clients')
.get(clientsControllers.list)
.post(clientsControllers.create)

router.route('/api/clients/:clientId')
.get(clientsControllers.read)
.put(clientsControllers.update)
.delete(clientsControllers.remove)

router.param('clientId', clientsControllers.userByID)

module.exports = router