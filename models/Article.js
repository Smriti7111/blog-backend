const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: [160, "Title cannot be more than 160 characters"],
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        minlength: [100,"Description should have minimum 100 characters"],
        required: [true, "Description is required"]
    },
    category: {
        type: String,
        default: 'General'
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    slug: {
        type: String,
        maxlength: [100,"Slug cannot be more than 100 characters"],
        required: [true, "Slug is required"],
        unique: true
    },
    publishDate: {
        type: Date,
        default: Date.now(),
        validate: [validator.isDate, "Published date is not a valid date"]
    },
    updateDate: {
        type: Date,
        default: null
    }
})

const ArticleModel = mongoose.model('article',articleSchema);

module.exports = ArticleModel;