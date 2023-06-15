
import { Router } from 'express';

const productRoutes = Router();

import { Product } from "../schemas/product.model";

import multer from 'multer';

const upload = multer();



productRoutes.get('/create', (req, res) => {

    res.render("createProduct");

});



productRoutes.post('/create', upload.none(), async (req, res) => {

    try {

        const productNew = new Product(req.body);

        const product = await productNew.save();

        if (product) {

            res.send("success");

        } else {

            res.send("error");

        }

    } catch (err) {

        res.send("error");

    }

});



productRoutes.get('/list', async (req, res) => {

    try {

        let limit: number;

        let offset: number;

        if(!req.query.limit || !req.query.limit) {

            limit = 3;

            offset = 0;

        } else {

            limit = parseInt(req.query.limit as string);

            offset = parseInt(req.query.offset as string);

        }

        const products = await Product.find().limit(limit).skip(limit*offset);;

        res.render("listProduct", { products: products });

    } catch {

        res.render("error");

    }

});



export default productRoutes;

