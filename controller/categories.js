import CategoriesModel from "../models/categories.js";

export const createCategories = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Category
    const category = new CategoriesModel({
        categoryName: req.body.categoryName,
    });

    // Save Category in the database
    CategoriesModel.create(category, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Category.",
            });
        else res.send(data);
    });
};

export const findAllCategories = (req, res) => {
    CategoriesModel.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving categories.",
            });
        else res.send(data);
    });
};


export const findOneCategory = (req, res) => {
    CategoriesModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Category with id " + req.params.id,
                });
            }
        } else res.send(data);
    });
};

export const updateCategory = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    CategoriesModel.updateById(
        req.params.id,
        new CategoriesModel(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Category with id ${req.params.id}.`,
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Category with id " + req.params.id,
                    });
                }
            } else res.send(data);
        }
    );
};

export const deleteCategory = (req, res) => {
    CategoriesModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Category with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Category with id " + req.params.id,
                });
            }
        } else res.send({ message: `Category was deleted successfully!` });
    });
};


export const deleteAllCategories = (req, res) => {
    CategoriesModel.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all categories.",
            });
        else res.send({ message: `All Categories were deleted successfully!` });
    });
};