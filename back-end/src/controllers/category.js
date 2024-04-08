import Category from "../models/Category";
import { categoryValid } from "../validations/categoryValid";

export const createCategory = async (req,res) => {
  try {

    //Check xem category đã tồn tại hay chưa

    const checkCategoryName = await Category.findOne({name: req.body.name});
    const checkCategorySlug = await Category.findOne({slug: req.body.slug});

    if(checkCategoryName || checkCategorySlug){
      return res.status(400).json({
        message : "Category already exists",
      })
    }

    const data = await Category.create(req.body);
    if(!data){
      return res.status(400).json({
        message : "Not found!",
      });
    }
    return res.status(200).json({
      message : "Successfully",
      data,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const getAllCategory = async (req,res) => {
  try {

    const data = await Category.find();
    if(!data){
      return res.status(400).json({
        message : "Not found!",
      });
    }
    return res.status(200).json({
      message : "Successfully",
      data,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const getOneCategoryById = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      return res.status(400).json({
        message: "Get category failed!",
      });
    }

    return res.status(200).json({
      message: "Get successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
};

export const getOneCategoryBySlug = async (req, res) => {
  try {
    const data = await Category.findOne({ slug: req.params.slug });
    if (!data) {
      return res.status(400).json({
        message: "Get category failed!",
      });
    }

    return res.status(200).json({
      message: "Get successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
};

export const getOneCategoryByName = async (req, res) => {
  try {
    const data = await Category.findOne({ name: req.params.name });
    if (!data) {
      return res.status(400).json({
        message: "Get category failed!",
      });
    }

    return res.status(200).json({
      message: "Get successfully!",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      name: error.name || "Error",
      message: error.message || "Server error!",
    });
  }
};

export const updateCategory = async (req,res) => {
  try {

    //Check xem category đã tồn tại hay chưa

    // const checkCategoryName = await Category.findOne({name: req.body.name});
    // const checkCategorySlug = await Category.findOne({slug: req.body.slug});

    // if(checkCategoryName || checkCategorySlug){
    //   return res.status(400).json({
    //     message : "Category already exists",
    //   })
    // }

    const data = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!data){
      return res.status(400).json({
        message : "Not found!",
      });
    }
    return res.status(200).json({
      message : "Successfully",
      data,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

export const deleteCategory = async (req,res) => {
  try {

    const data = await Category.findByIdAndDelete(req.params.id, req.body, {new: true});
    if(!data){
      return res.status(400).json({
        message : "Not found!",
      });
    }
    return res.status(200).json({
      message : "Successfully",
      data,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}