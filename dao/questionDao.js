const Category = require("../models/CategoriesModel");


export const createCategory = async (name) => {
    try {
        return await Category.create({
            name: name

        });
    } catch (error) {
        throw new Error(`${error},traceback  at createCategory function at category.js file`);
    }
}