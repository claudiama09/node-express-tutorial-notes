// const http = require("http");
// const { readFileSync } = require("fs");

// // get all files
// const homePage = readFileSync("./navbar-app/index.html");
// const homeStyles = readFileSync("./navbar-app/styles.css");
// const homeImage = readFileSync("./navbar-app/logo.svg");
// const homeLogic = readFileSync("./navbar-app/browser-app.js");

// const server = http.createServer((req, res) => {
//   console.log(req.url);
//   const url = req.url;
//   // home page
//   if (url === "/") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write(homePage);
//     res.end();
//   }
//   // about page
//   else if (url === "/about") {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>About Page</h1>");
//     res.end();
//   }
//   // css file
//   else if (url === "/styles.css") {
//     res.writeHead(200, { "content-tupe": "text/css" });
//     res.write(homeStyles);
//     res.end();
//   }
//   // image/logo
//   else if (url === "/logo.svg") {
//     res.writeHead(200, { "content-tupe": "image/svg+xml" });
//     res.write(homeImage);
//     res.end();
//   }
//   // css file
//   else if (url === "/browser-app.js") {
//     res.writeHead(200, { "content-tupe": "text/javascript" });
//     res.write(homeLogic);
//     res.end();
//   }
//   // 404
//   else {
//     res.writeHead(200, { "content-type": "text/html" });
//     res.write("<h1>Page Not Found</h1>");
//     res.end();
//   }
// });

// server.listen("5000");

// ----------------------------------------------------------------------------------------------

// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen

// const express = require("express");
// const path = require("path");

// const app = express();

// app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "./navbar-app/index.html"));
// });

// app.get("/about", (req, res) => {
//   res.status(200).send("About Page");
// });

// app.all("*", (req, res) => {
//   res.status(404).send("<h1> Page is Not Found </h1>");
// });

// app.listen(5000, () => {
//   console.log("server is listening on port 5000...");
// });

// -----------------------------------------------------------------------------------------------

// const express = require("express");
// const app = express();
// const { products } = require("./data");

// app.get("/", (req, res) => {
//   res.send("<h1>Home Page</h1><a href='/api/products'>products</a>");
// });

// app.get("/api/products", (req, res) => {
//   const newProducts = products.map((product) => {
//     const { id, name, image } = product;
//     return { id, name, image };
//   });
//   res.json(newProducts);
// });

// app.get("/api/products/:productID", (req, res) => {
//   const { productID } = req.params;
//   const singleProduct = products.find(
//     (product) => product.id === Number(productID)
//   );
//   if (!singleProduct) {
//     return res.status(404).send("Product does not exist");
//   }
//   res.json(singleProduct);
// });

// app.get("/api/v1/query", (req, res) => {
//   const { search, limit } = req.query;
//   let sortedProducts = [...products];

//   if (search) {
//     sortedProducts = sortedProducts.find((product) => {
//       return product.name.startsWith(search);
//     });
//   }

//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, Number(limit));
//   }

//   if (sortedProducts.length < 1) {
//     res.status(200).send({ success: true, data: [] });
//   }

//   res.status(200).json(sortedProducts);
// });

// app.listen(5000, () => {
//   console.log("server is listening on port 5000...");
// });

//----------------------------------------------------------------------------------------------------

// const express = require("express");
// const app = express();
// const morgan = require("morgan");
// const logger = require("./logger");
// const authorize = require("./authorize");

// // req => middleware => res

// // middleware function should
// // 1) be assigned in app.use() to be effective
// // 2) should invoke next() at the end of function's body

// // 1. app.use vs. route
// // 2. options - write our own middleware functions/ express built-in functions/ third party functions

// // app.use([logger, authorize]);

// app.use(morgan("tiny"));

// app.get("/", (req, res) => {
//   res.send("Home");
// });

// app.get("/about", (req, res) => {
//   res.send("About");
// });

// app.get("/api/products", (req, res) => {
//   res.send("Products");
// });

// app.get("/api/items", (req, res) => {
//   res.send("Items");
// });

// app.listen(5000, () => {
//   console.log("Server is listening on port 5000...");
// });

// --------------------------------------------------------------------------
const { urlencoded } = require("express");
const express = require("express");
const app = express();
let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ success: false, msg: "Please provide name value" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/login", (req, res) => {
  // because we applied middleware of urlencoded and set extended to false, so we can access whatever in the form
  const { name } = req.body;
  if (name) {
    return res.send(`Welcome ${name}`);
  }
  res.send("Please provide credentials");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});

// --------------------------------------------------------------------------------------------------------
// REDUCER EXAMPLES

// const staff = [
//   { name: "john", salary: 1000 },
//   { name: "may", salary: 2000 },
//   { name: "chloe", salary: 3000 },
//   { name: "lily", salary: 1000 },
// ];

// staff.reduce((total, currentPerson) => {
//   console.log(total);
//   total += currentPerson.salary;
//   return total;
// }, 10000);

const cart = [
  {
    title: "Samsung Galaxy S7",
    price: 599.99,
    amount: 1,
  },
  {
    title: "Google Pixel",
    price: 499.99,
    amount: 4,
  },
  {
    title: "Xiaomi Redmi Note 2",
    price: 699.99,
    amount: 5,
  },
  {
    title: "Xiaomi Redmi Note 5",
    price: 399.99,
    amount: 2,
  },
];

let { totalItems, totalPrice } = cart.reduce(
  (total, cartItem) => {
    const { amount, price } = cartItem;
    total.totalItems += amount;
    total.totalPrice += price * amount;
    return total;
  },
  {
    totalItems: 0,
    totalPrice: 0,
  }
);

totalPrice = parseFloat(totalPrice.toFixed(2));

console.log(totalItems, totalPrice);

const url = "https://api.github.com/users/john-smilga/repos?per_page=100";
