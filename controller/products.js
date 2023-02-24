import ProductsModel from "../models/products.js";

export const createProducts = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const product = new ProductsModel({
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productImage: req.body.productImage,
        productCategory: req.body.productCategory,
    })

    ProductsModel.create(product, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
            });
        }
        else res.send(data);
    });
};

export const findAllProducts = (req, res) => {
    ProductsModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        else res.send(data.map((product) => {
            return {
                productId: product.productId,
                productName: product.productName,
                productDescription: product.productDescription,
                productPrice: product.productPrice,
                productImage: product.productImage,
                productCategory: product.categories_products[0].category.categoryName,
                productCategoryId: product.categories_products[0].category.categoryId,
                pcId: product.categories_products[0].pcId,
                isVisible: product.isVisible,
            }
        }));
    });
};

export const findOneProduct = (req, res) => {
    ProductsModel.findById(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Product with id " + req.params.productId
                });
            }
        } else res.send({
            productId: data.productId,
            productName: data.productName,
            productDescription: data.productDescription,
            productPrice: data.productPrice,
            productImage: data.productImage,
            productCategory: data.categories_products[0].category.categoryName,
            productCategoryId: data.categories_products[0].category.categoryId,
            pcId: data.categories_products[0].pcId,
            isVisible: data.isVisible,
        });
    });
};

export const updateProduct = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ProductsModel.updateById(
        req.params.productId,
        new ProductsModel(req.body), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.productId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
};

export const updateProductVisibility = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const visibility = req.body.isVisible;

    ProductsModel.updateVisibility(
        req.params.productId,
        visibility, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.productId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Product with id " + req.params.productId
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteProduct = (req, res) => {
    ProductsModel.remove(req.params.productId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Product with id ${req.params.productId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Product with id " + req.params.productId
                });
            }
        } else res.send({ message: `Product was deleted successfully!` });
    });
};

export const deleteAllProducts = (req, res) => {
    ProductsModel.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all products."
            });
        else res.send({ message: `All Products were deleted successfully!` });
    });
};