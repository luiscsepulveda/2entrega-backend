import fs from "fs";

export default class ProductManager {
    constructor() {
        this.products = [];
        this.path = "./files/products.json";
    }

    getProducts = async () => {


        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, "utf-8");

            const result = JSON.parse(data);
            return result;
        } else {
            return [];
        }

    };


    addProduct = async (title, description, price, thumbnail, code, stock) => {

        const products = await this.getProducts();

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Error: All fields are mandatory")
            return;
        };

        let sameProduct = products.find((element) => element.code === code);
        if (sameProduct) {
            return `Already exist a product with this code ${code}`
        }


        const product = {
            id: products.length + 1,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
        }

    let maxId = 0;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id > maxId) {
                maxId = products[i].id;
            }
        }
        products.id = maxId + 1;

        /* if(products.length === 0){
            product.id = 1;
        }else{
            product.id = products[products.length -1].id +1
        } */

        /* const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
            const newProductId = lastProductId + 1; */

        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        return products;

    }

    getProductsById = async (id) => {
        if (fs.existsSync(this.path)) {
            let result = await this.getProducts();

            /* let productId = result.find(id  => result.id === id); */
            let productId = result.find((res) => res.id === id);

            if (!productId) {
                console.log(`Error: Product with ID ${'Id'} was not found`);
            } else {
                return productId;
            }


        }


    }


    updateProduct = async (id, code, title, description, price, thumbnail, stock) => {

        const products = await this.getProducts();

        if (products == "error") {
            return "this file is empty"
        }

        let searchProduct = products.find((product) => product.id !== id)

        if (searchProduct === undefined) {
            const changeProduct = products.filter((product) => product.id === id);

            const updatedProduct = {
                id: id,
                title: title ?? changeProduct[0].title,
                description: description ?? changeProduct[0].description,
                price: price ?? changeProduct[0].price,
                thumbnail: thumbnail ?? changeProduct[0].thumbnail,
                code: code ?? changeProduct[0].code,
                stock: stock ?? changeProduct[0].stock,

            }

            products[id - 1] = updatedProduct;

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
            return "product has been updated";
        } else {
            return `Product with id ${id} cannot be updated because it does not exist in this list`
        }
    }

    deleteProducts = async (id) => {

        const products = await this.getProducts()

        let existingProduct = products.find((product) => product.id === id);
        if (existingProduct) {
            const feature = products.filter((del) => del.id != id);

            await fs.promises.writeFile(this.path, JSON.stringify(feature, null, "\t"))
            return "product has been deleted"
        } else {
            return `Product with id ${id} cannot be deleted because it does not exist in this list`
        }

    }


}