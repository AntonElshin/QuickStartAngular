import Router from 'express'
import {getRandomString, getAll, getById, create, modify, remove, checkSysname} from '../controllers/references.js'

const router = Router()

router.get('/', getRandomString)

router.get('/api/references', getAll)

router.get('/api/references/:id', getById)

router.post('/api/references', create)

router.delete('/api/references/:id', remove)

router.put('/api/references/:id', modify)

router.get('/api/references/check/:sysname', checkSysname)

export default router
