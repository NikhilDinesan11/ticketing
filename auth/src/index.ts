import express from 'express'
import "express-async-errors"
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user'
import { signinRouter } from './routes/sigin'
import { signupRouter } from './routes/signup'
import { signoutRouter } from './routes/signout'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'
import mongoose from 'mongoose'

const app = express()
app.use(json())


app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all("*", async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

const start = async () => {
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
        console.log("Connected to Auth Mongo")
    } catch (error) {
        console.error(error)
    }
    app.listen(3000, () => {
        console.log("listening on port 3000!!!!!!!")
    })
}

start()
