var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var blogSchema = new Schema({
	blogTitle: {type:String, required: true},
	blogBody: {type:String, required: true},
	authorName: {type:String, required: true},
	authorAge: {type: Number, required: true },
	created:{
		type:Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Blog", blogSchema);