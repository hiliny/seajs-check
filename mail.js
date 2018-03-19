const nodemailer = require('nodemailer');

var transPorter = nodemailer.createTransport({
	service:'qq',
	auth:{
		user:"1242043471@qq.com",
		pass:"viqffuggyjpcghid"
	}
});

var mailOptions = {
	from:'1242043471@qq.com',
	to:'1242043471@qq.com',
	subject:'send mail test',
	text:'you get it.'
};

transPorter.sendMail(mailOptions,function(err,info){
	if(err){
		console.log(err);
		return ;
	}
	console.log("you already success");
});
