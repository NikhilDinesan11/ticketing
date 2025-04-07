import express, { Request, Response } from 'express'

import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/require-auth'

// Create a router object
const router = express.Router()

// Define your route handler with proper typing and no explicit return type
router.get("/api/users/currentuser",currentUser,(req:Request,res:Response) => {
    res.send({currentUser:req.currentUser || null})
    return
})

// Export the router (not a function)
export { router as currentUserRouter }