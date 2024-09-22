import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO).then(
    () => console.log('MongoDB Connected...'),
).catch(
    err => console.log(err)
)
const app = express()
app.use(express.json())

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

app.use('/api/user', userRoutes) // pokud chceme pouzit tu api skrz nejakou route tak uz to neni get jako v tech routes
// ale uz ji jen pouzivame skrz USE

app.use('/api/auth', authRoutes)