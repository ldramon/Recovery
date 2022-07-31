const Product = require("../models/Product");

exports.createProduct = async (req, res) => {

    try {
        let product;

        // We create our product
        product = new Product(req.body);

        await product.save();
        res.send(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake');
    }
}

exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find();
        res.json(products);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake');
    }

}

exports.updateProduct = async (req, res) => {

    try {
        const { name, category, location, price } = req.body;
        let product = await Product.findById(req.params.id);

        if(!product) {
            res.status(404).json({ msg: 'The product does not exist' })
        }

        product.name = name;
        product.category = category;
        product.location = location;
        product.price = price;

        product = await Product.findOneAndUpdate({ _id: req.params.id },product, { new: true} )
        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake');
    }
}


exports.getProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);

        if(!product) {
            res.status(404).json({ msg: 'The product does not exist' })
        }
       
        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake');
    }
}

exports.removeProduct = async (req, res) => {

    try {
        let product = await Product.findById(req.params.id);

        if(!product) {
            res.status(404).json({ msg: 'The product does not exist' })
        }
       
        await Product.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Product removed successfully' });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was a mistake');
    }
}