var express 	= require("express");
var mongoose 	= require("mongoose");
var bodyParser  = require("body-parser");

var Blog 		= require("./blogModel.js");
var app 		= express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var dbPath = "mongodb://localhost/blog";

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function(){
	console.log("Database Connection Success");
});

var MiddleWare = require("./middleWares.js");

// Route to redirect to all blogs
app.get("/", function(req, res){
	res.redirect("/blogs");
});

// Route to view all blogs
app.get("/blogs", function(req, res){
	Blog.find( function(err, blogs){
		if(err){
			console.log(err);
		} else{
			res.send(blogs);
		}
	});
});

// Route to create a blog along with a middleware
app.post("/blogs/create", MiddleWare.ageFilter, function(req, res){
	
	Blog.create({
		blogTitle: req.body.blogTitle,
		blogBody: req.body.blogBody,
		authorName: req.body.authorName,
		authorAge: req.body.authorAge
	},function(err, blog){
		if(err){
			console.log(err);
		} else{
			res.redirect("/blogs");
		}
	});
	
});

// Route to find a particular blog
app.get("/blogs/:id", function(req, res){
	Blog.findById((req.params.id), function(err, foundBlog){
		if(err){
			console.log(err);
		} else{
			
			res.send(foundBlog);
		}
	});
});

// Route to edit a blog along with a middleware
app.put("/blogs/:id", MiddleWare.ageFilter,  function(req, res){
	var blogId = req.params.id;
	
	var blogDetails = {
		blogTitle 	: req.body.blogTitle,
		blogBody	: req.body.blogBody,
		authorName  : req.body.authorName,
		authorAge   : req.body.authorAge
		}
		
	Blog.findByIdAndUpdate(req.params.id,  { $set: blogDetails }, { upsert: true, new: true }, function(err, blogDetails){
		if(err){
			console.log(err);
			res.send(err);
		} else{
			res.redirect("/blogs");
		}
	});
});

// Route to delete a blog
app.delete("/blogs/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs");
		}
	});
});

// Route for error Handling
app.get("*", function(req, res, next){
	res.status = 400;
	next("Path not found")
});

// Error Handling MiddleWare
app.use(function(err, req, res, next){
	console.log("Error handling middleware");
	if(res.status == 400){
		res.send("Error boss");
	} else{
		next(err);
	}
});

app.listen("3000", function(req, res){
	console.log("app listening on 3000");
});