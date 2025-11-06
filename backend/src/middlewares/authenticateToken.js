import jwt from "jsonwebtoken"
import { env } from "../../env"

export const authenticateToken = (
  req,
  res,
  next
) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

  if (!token) {
    res.status(401).json({ error: "Access denied. No token provided." })
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" })
  }
}
