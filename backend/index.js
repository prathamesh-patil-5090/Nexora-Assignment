import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import rateLimit from "express-rate-limit"
import { env } from "./env.js"
import cartRoutes from "./src/routes/cart.routes.js"
import productRoutes from "./src/routes/product.routes.js"
import { prisma } from "./db.js"
const app = express()
app.use(helmet())
app.use(express.json({ limit: "50mb" }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(cookieParser())


if (env.APP_STAGE === "dev") {
    app.use(morgan("combined"))
}

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    env.FRONTEND_URL || ""
].filter(Boolean)

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)

app.use("/api/cart", cartRoutes)
app.use("/api/products", productRoutes)

app.get("/health", async (req, res) => {
    try {
        await prisma.$runCommandRaw({ ping: 1 })
        res.status(200).json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: env.APP_STAGE,
        })
    } catch (error) {
        res.status(503).json({
            status: "unhealthy",
            error: "Database connection failed",
        })
    }
})
app.get("/", (req, res) => {
    res.send("Nexora API is running successfully")
})

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" })
})

const port = env.PORT

const server = app.listen(port, () => {
    console.log(`SERVER running on http://localhost:${port} [${env.APP_STAGE}]`)
})

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully...")
    server.close(async () => {
        await prisma.$disconnect()
        console.log("Server closed")
        process.exit(0)
    })
})

process.on("SIGINT", async () => {
    console.log("SIGINT received, shutting down gracefully...")
    server.close(async () => {
        await prisma.$disconnect()
        console.log("Server closed")
        process.exit(0)
    })
})
