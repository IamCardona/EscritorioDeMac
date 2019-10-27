const express = require('express')
const comentControllers = require('./controllers/comentController')

const router = express.Router()

router.route('/api/comment')
.post(comentControllers.create)
.get(comentControllers.list)

module.exports = router