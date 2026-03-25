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

  app.use(
    "/donate",
    createProxyMiddleware({
      target: process.env.DONATION_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/donate": "" },
    })
  );

  app.use(
    "/grooming",
    createProxyMiddleware({
      target: process.env.GROOMING_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/grooming": "" },
    })
  );

  app.use(
    "/vet",
    createProxyMiddleware({
      target: process.env.VET_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/vet": "" },
    })
  );

  app.use(
    "/training",
    createProxyMiddleware({
      target: process.env.TRAINING_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/training": "" },
    })
  );

  app.use(
    "/blog",
    createProxyMiddleware({
      target: process.env.BLOG_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/blog": "" },
    })
  );

  app.use(
    "/store",
    createProxyMiddleware({
      target: process.env.STORE_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: { "^/store": "" },
    })
  );

  console.log("API Gateway routes initialized.");
};
