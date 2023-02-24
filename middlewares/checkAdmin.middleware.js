import jwt from 'jsonwebtoken'

const checkAdmin = (req, res, next) => {
  let isAdmin = false;

  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    isAdmin = decoded.role === 'ADMIN' || decoded.role === 'MODERATOR'

    if (!isAdmin) return res.status(401).json({
      success: false,
      message: 'Auth failed',
    })

    else next()

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Auth failed',
    })
  }
}

export default checkAdmin