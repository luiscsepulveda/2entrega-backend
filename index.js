import ProductManager from "./segundaEntrega.js";

const manager = new ProductManager();
const productManagement = async () => {

    await manager.getProducts();
    

    let firstProduct = await manager.addProduct("tshirt GOD FIRST BRO", "Show people what you believe in", 3800, "GFB.webp", "ts1", 55)

    console.log(firstProduct);

    let secondProduct = await manager.addProduct("tshirt Never Panic just pray", "NPJP", 2500, "NPJP.webp", "ts2", 55)

    console.log(secondProduct);

    let thirdProduct = await manager.addProduct("tshirt Faith", "Faith", 8900, "faith.webp", "ts3", 15)

    console.log(thirdProduct);

    let fourProduct = await manager.addProduct("tshirt test", "test", 500, "test.webp", "ts4", 10)

    console.log(fourProduct);


/* Los deje comentados porque tengo otro de tantos errores */

    let findProduct = await manager.getProductsById(3)
    console.log(findProduct);

    let updProduct = await manager.updateProduct(4, "new name", "new description", 980, "newpicture.webp", "ts2", 10);
    console.log(updProduct);

    let eraseProduct = await manager.deleteProducts(3);
    console.log(eraseProduct);

}

productManagement()