const app = require("./app");

// setup port
const port = process.env.PORT;

// setup listner
app.listen(port, () =>
  console.log("Server is Running on port : ", port)
);