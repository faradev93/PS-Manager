const fs = require("fs");
const rl = require("readline");
const filePath = "./products.json";

//InterFace Setup
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Menu InterFace
function ShowMenu() {
  console.log(`\n🔨 Product Manager Application BY FERI 🔨`);
  console.log(`1- Show All Product `);
  console.log(`2- Add a Product`);
  console.log(`3- Remove a Product`);
  console.log(`0- Exit`);

  readline.question("Choose an option: ", (choice) => {
    handleMenu(choice);
  });
}

//Menu Handle

function handleMenu(input) {
  switch (input) {
    case "1":
      ShowProduct();
      break;
    case "2":
      AddProduct();
      break;
    case "3":
      RemoveProduct();
      break;
    case "0":
      rl.close();
      break;
    default:
      console.log("Eshtebah");
      ShowMenu();
      break;
  }
}

//Read Product

function ReadProduct() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, "utf8");
  const dataToJson = JSON.parse(data || []);
  return dataToJson;
}

//Save Product
function SaveProduct(products) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

//Show Product
function ShowProduct() {
  const product = ReadProduct();
  if (product.length === 0) {
    console.log(`No product found`);
  } else {
    console.log(`\n Product List: 👌`);
    product.forEach((product, index) => {
      console.log(
        `${index + 1}-${product.name}     >>Price:  (${product.price})`
      );
    });
  }
  ShowMenu();
}

//Add Product
function AddProduct(product) {
  readline.question("Enter Your Product Name: ", (name) => {
    readline.question("Enter The Product Price: ", (price) => {
      console.log(`New  Product ${name}-${price}`);
      //
      const products = ReadProduct();
      const newProduct = { name, price };
      products.push(newProduct);
      SaveProduct(products);
      console.log(`Product ${product} added successfully! :))`);
      ShowMenu();
    });
  });
}

//Remove Product

function RemoveProduct(input) {
  const products = ReadProduct();
  if (products.length === 0) {
    console.log(`Entered number is wrong ✖`);
    return ShowMenu();
  }
  readline.question("Enter the product number to remove: ", (num) => {
    const index = Number(num) - 1;
    if (index >= 0 && index < products.length) {
      const removed = products.splice(index, 1);
      SaveProduct(products);
      console.log(`Removed product :${removed[0].name}`);
      ShowMenu();
    } else {
      console.log(`invalid product number`);
      ShowMenu();
    }
  });
}
ShowMenu();
