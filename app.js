const express = require('express')
let productId = 1;

const app = express()

app.use(express.json())


const products = [];

const findAllProducts = (req, res) => {
    res.json(products);
};

const createProduct = (req, res) => {
    const { name, price, description } = req.body;
    const newProduct = {
        id: productId,
        name,
        price,
        description
    };
    products.push(newProduct); // Agregamos el nuevo producto a la matriz de productos
    productId++; // incrementamos productId para el próximo producto
    res.status(201).json(newProduct);
}


const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    // buscar el producto correspondiente en la matriz de productos
    const product = products.find(p => p.id == id);

    if (!product) {
        return res.status(404).json({ message: `Producto con ID ${id} no encontrado` });
    }

    // actualizar las propiedades relevantes del producto
    if (name) {
        product.name = name;
    }
    if (price) {
        product.price = price;
    }
    if (description) {
        product.description = description;
    }

    res.json(product);
}



const deleteProduct = (req, res) => {
    const { id } = req.params;
    const index = products.findIndex((product) => product.id == id);

    if (index !== -1) {
        products.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};


app.get("/api/v1/products", findAllProducts);

app.post("/api/v1/products", createProduct);

app.patch("/api/v1/products/:id", updateProduct);

app.delete("/api/v1/products/:id", deleteProduct);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
})




