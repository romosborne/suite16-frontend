const createProxyMiddleware = require("http-proxy-middleware");
const { env } = require("process");

const target = env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(";")[0]
  : "http://localhost:62109";

const context = ["/weatherforecast", "/room", "/ws"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false,
    ws: true,
    headers: {
      Connection: "Keep-Alive",
    },
  });

  app.use(appProxy);
};
