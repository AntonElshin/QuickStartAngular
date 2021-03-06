import Router from 'express'
import {getRandomString, getAll, create, modify, remove} from '../controllers/references.js'

const router = Router()

router.get('/', getRandomString)

router.get('/api/references', getAll)

router.post('/api/references', create)

router.delete('/api/references/:id', remove)

router.put('/api/references/:id', modify)

export default router
