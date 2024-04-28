// tokenMiddleware.js
function checkToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
      // 如果请求头中没有 token，则返回 401 错误
      return res.status(401).send({ message: 'Unauthorized - Missing token' });
  }
  // 这里可以添加其他 token 校验逻辑，例如解析 token、验证有效性等

  // 如果 token 校验通过，则继续处理请求
  next();
}

module.exports = {
  checkToken,
};
