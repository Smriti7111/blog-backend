const ArticleModel = require("../models/Article");

const validateUpdate = (value) => {
  if (value.title === "") {
    throw Error("empty title");
  }
  if (value.description === "") {
    throw Error("empty description");
  }
  if (value.slug === "") {
    throw Error("empty slug");
  }
};

//handle errors
const handleError = (err) => {
  let errors = {
    title: "",
    description: "",
    slug: "",
    publishDate: "",
  };

  //checking for duplication of slug
  if (err.code === 11000) {
    errors.slug = "Slug already exists";
    return errors;
  }

  //check for required field while updating
  if (err.message === "empty slug") {
    errors.slug = "Slug is required";
  }

  if (err.message === "empty title") {
    errors.title = "Title is required";
  }

  if (err.message === "empty description") {
    errors.description = "Description is required";
  }

  //processing error object
  if (err._message === "article validation failed") {
    Object.values(err.errors).map(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

//get all articles
const index = async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.json(articles);
  } catch (err) {
    console.log(err);
    res.status(500).json(handleError(err));
  }
};

//get single article
const show = async (req, res) => {
  const { slug } = req.params;
  try {
    const article = await ArticleModel.findOne({ slug });
    res.json(article);
  } catch (err) {
    console.log(err);
    res.status(500).json(handleError(err));
  }
};

//create article
const store = async (req, res) => {
  try {
    const newArticle = await ArticleModel.create(req.body);
    res.json(newArticle);
  } catch (err) {
    console.log(err);
    res.status(500).json(handleError(err));
  }
};

//update article
const update = async (req, res) => {
  const { slug } = req.params;
  try {
    validateUpdate(req.body);
    const updateArticle = await ArticleModel.findOneAndUpdate(
      { slug },
      req.body,
      { new: true }
    );
    res.json(updateArticle);
  } catch (err) {
    console.log(err);
    res.status(500).json(handleError(err));
  }
};

//delete article
const destroy = async (req, res) => {
  const { slug } = req.params;
  try {
    const deleteArticle = await ArticleModel.findOneAndDelete({ slug });
    res.json(deleteArticle);
  } catch (err) {
    console.log(err);
    res.status(500).json(handleError(err));
  }
};

module.exports = { index, show, store, update, destroy };
