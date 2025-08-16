const express = require('express')
const router = express.Router();

const Product = require('../../models/Products');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.log('GET Error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
        });
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        console.log('POST Error:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Product.updateOne(
            { _id: req.params.id },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                photo: req.body.photo
            },
            { upsert: true }
        );
        res.json({ success: true });
    } catch (error) {
        console.log('PUT Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id });
        res.json({ success: true });
    } catch (error) {
        console.log('DELETE Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
