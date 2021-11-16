const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, data })
}

const errorResponse = (res, err, errMsg = "failed operation", statusCode = 500) => {
    console.error("ERROR:", err)
    return res.status(statusCode).json({ success: false, error: errMsg })
}
  
module.exports = {  
  successResponse,
  errorResponse
}