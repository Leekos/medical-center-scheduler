const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/route/:id": "/route?Id=:id", //zmiana id ze względu na, to że program korzysta z dwóch Id oraz id
  })
);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
});
