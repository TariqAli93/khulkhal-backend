import { prismaErrorHandling, prismaInstance } from "../middlewares/handleError.middleware.js";

const CategoriesModel = function (category) {
    this.categoryName = category.categoryName;
}

CategoriesModel.create = async (newCategory, result) => {
    try {
        const category = await prismaInstance.categories.create({
            data: newCategory
        });

        result(null, category);
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
};

CategoriesModel.findById = async (categoryId, result) => {
    try {
        const singleCategory = await prismaInstance.categories.findUnique({
            where: {
                categoryId: JSON.parse(categoryId)
            },
        });

        if (singleCategory) {
            result(null, singleCategory);
        } else {
            result({
                error: "Not Found",
                code: 404,
                errorMessage: "Not Found Category"
            }, null);
        }
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
};

CategoriesModel.getAll = async (result) => {
    try {
        const categories = await prismaInstance.categories.findMany({
            include: {
                _count: true,
                categories_products: {
                    include: {
                        product: true
                    }
                }
            }
        });
        result(null, categories);
    } catch (err) {
        console.log(prismaErrorHandling(err));
        result(prismaErrorHandling(err), null);
    }
};

CategoriesModel.updateById = async (categoryId, category, result) => {
    try {
        const updateCategory = await prismaInstance.categories.update({
            where: { categoryId: JSON.parse(categoryId) },
            data: category
        });
        result(null, updateCategory);
    } catch (error) {
        console.log(prismaErrorHandling(error));
        result(prismaErrorHandling(error), null);
    }
};


CategoriesModel.remove = async (id, result) => {
    try {
        const deleteCategory = await prismaInstance.categories.delete({
            where: { categoryId: JSON.parse(id) }
        });
        result(null, deleteCategory);
    } catch (error) {
        console.log(prismaErrorHandling(error));
        result(prismaErrorHandling(error), null);
    }
};


CategoriesModel.removeAll = async (result) => {
    try {
        const deleteAllCategories = await prismaInstance.categories.deleteMany({});
        result(null, deleteAllCategories);
    } catch (error) {
        console.log(prismaErrorHandling(error));
        result(prismaErrorHandling(error), null);
    }
};


export default CategoriesModel;