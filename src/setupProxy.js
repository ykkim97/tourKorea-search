//src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
            createProxyMiddleware({
            target: "https://port-0-tripstory-server-cf24lcbykckm.gksl2.cloudtype.app/",
            changeOrigin: true,
        })
    );
};