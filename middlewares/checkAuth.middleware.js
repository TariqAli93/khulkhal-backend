import jwt from 'jsonwebtoken'

const check = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)

    next()
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Auth failed',
    })
  }
}

export default check