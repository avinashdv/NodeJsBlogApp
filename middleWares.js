var middleWare = {};

// Age Filter middleWare to allow person to create
// or edit the blog based on his/her age
middleWare.ageFilter = function(req, res, next){
	var age = Number(req.body.authorAge);
	if(age >= 18 && age <= 65){
		next();
	} else{
		res.send("U're not allowed to create/edit a blog, Only person with age between 18 and 65 can do");
	}
}


module.exports = middleWare;