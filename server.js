const jsonServer = require("json-server"); // Import json-server
const server = jsonServer.create(); // stworzenie nowego serwera
const router = jsonServer.router("db.json"); // źródło danych dla serwera
const middlewares = jsonServer.defaults(); // ustawienie domyślnych parametrów serwera

server.use(middlewares);

server.use(
  jsonServer.rewriter({
    "/route/:id": "/route?Id=:id", //zmiana id ze względu na, to że program korzysta z dwóch Id oraz id
  })
);

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
server.use(router);
server.listen(5000, () => {
  console.log("JSON Server is running");
}); //ustawienie portu na którym ma działać serwer
