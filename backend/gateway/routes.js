const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    "/user",
    createProxyMiddleware({
      target: process.env.AUTH_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/user": "" },
    })
  );

  app.use(
    "/pet",
    createProxyMiddleware({
      target: process.env.PET_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/pet": "" },
    })
  );

  app.use(
    "/chat",
    createProxyMiddleware({
      target: process.env.CHAT_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/chat": "" },
    })
  );

  console.log("API Gateway routes initialized.");
};
