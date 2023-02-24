import { prismaErrorHandling, prismaInstance } from '../middlewares/handleError.middleware.js';

const ProductsModel = function (product) {
    this.productName = product.productName;
    this.productDescription = product.productDescription;
    this.productPrice = product.productPrice;
    this.productImage = product.productImage;
    this.productCategory = product.productCategory;
    this.pcId = product.pcId;
    this.isVisable = true;
};

async function checkCategoryExists(itemId) {
    try {
        const item = await prismaInstance.categories.findFirst({
            where: {
                categoryId: itemId
            }
        });
        return item !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const updateProductCategory = async (newCategory) => {
    try {
        await prismaInstance.categories_products.update({
            data: {
                idCategory: newCategory.productCategory
            },

            where: {
                pcId: newCategory.pcId
            }
        });
    } catch (error) {
        console.error(error);
    }
}

ProductsModel.create = async (newProduct, result) => {
    try {
        const categoryExists = await checkCategoryExists(newProduct.productCategory);
        if (!categoryExists) {
            result({
                error: 'Not Found',
                code: 404,
                errorMessage: 'Not Found Category'
            }, null);
            return;
        }

        const product = await prismaInstance.products.create({
            data: {
                productName: newProduct.productName,
                productDescription: newProduct.productDescription,
                productPrice: newProduct.productPrice,
                productImage: newProduct.productImage,

                categories_products: {
                    create: {
                        idCategory: newProduct.productCategory
                    }
                },
            },
        });
        result(null, product);
    } catch (error) {
        console.error(error);
        result(prismaErrorHandling(error), null);
    }
};

ProductsModel.findById = async (productId, result) => {
    try {
        const singleProduct = await prismaInstance.products.findUnique({
            where: {
                productId: JSON.parse(productId)
            },

            include: {
                categories_products: {
                    where: {
                        idProduct: JSON.parse(productId),
                    },

                    include: {
                        category: {
                            select: {
                                categories_products: {
                                    select: {
                                        idCategory: true,
                                        idProduct: true,
                                        product: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (singleProduct) {
            result(null, singleProduct);
        } else {
            result({
                error: 'Not Found',
                code: 404,
                errorMessage: 'Not Found Product'
            }, null);
        }
    } catch (error) {
        console.error(error);
        result(prismaErrorHandling(error), null);
    }
}

ProductsModel.getAll = async (result) => {
    try {
        const products = await prismaInstance.products.findMany({
            include: {
                categories_products: {
                    include: {
                        category: true
                    }
                }
            }
        });
        result(null, products);
    } catch (error) {
        console.error(error);
        result(prismaErrorHandling(error), null);
    }
}

ProductsModel.updateById = async (productId, product, result) => {
    try {
        const updateProduct = await prismaInstance.products.update({
            where: { productId: JSON.parse(productId) },
            data: {
                productName: product.productName,
                productDescription: product.productDescription,
                productPrice: product.productPrice,
                productImage: product.productImage,
            }
        });

        updateProductCategory(product);
        result(null, updateProduct);
    } catch (error) {
        console.error(error);
        result(prismaErrorHandling(error), null);
    }
}

ProductsModel.updateVisibility = async (productId, visable, result) => {
    try {
        const updateProduct = await prismaInstance.products.update({
            where: { productId: JSON.parse(productId) },
            data: {
                isVisible: visable,
            }
        });
        result(null, updateProduct);
    } catch (error) {
        console.error(error);
        result(prismaErrorHandling(error), null);
    }
}

ProductsModel.remove = async (id, result) => {
    try {
        const removeProductCategory = await prismaInstance.categories_products.deleteMany({
            where: {
                idProduct: JSON.parse(id)
            }
        });
        const deleteProduct = await prismaInstance.products.delete({
            where: { productId: JSON.parse(id) }
        });
        result(null, { deleteProduct, removeProductCategory });
    } catch (error) {
        console.error(error);
        result(prismaErrorHandling(error), null);
    }
}

ProductsModel.removeAll = async (result) => {
    try {
        const deleteAllProductsCategories = await prismaInstance.categories_products.deleteMany({});
        const deleteAllProducts = await prismaInstance.products.deleteMany({});
        result(null, { deleteAllProducts, deleteAllProductsCategories });
    } catch (error) {
        console.error(error);
        result(prismaErrorHandling(error), null);
    }
}

export default ProductsModel;