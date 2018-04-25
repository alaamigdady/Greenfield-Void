var bcrypt = require('bcrypt');
var Promise = require('bluebird');
const db = require('../../database/index.js')



exports.isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};



exports.createSession = function(req, res, newUser) {
  return req.session.regenerate(function() {
    req.session.user = newUser;
    res.redirect('/');
    
  });
};


exports.comparePassword = function(password,user, cb) {


 bcrypt.compare(password, user.password, function(err, isMatch) {
        if (err) return 'error';
        cb(null, isMatch);
    });

  }




  


  exports.hash = function(obj){
    bcrypt.hash(obj.password, 10, function(err, hash) {
      obj.password=hash
      db.save(obj)

    })}


    exports.retrieve = function(req,res){
      db.User.find({},function(err,data){
        res.send(data)
      })
    }


    exports.retrieveOne = function(req,res){

    }

    exports.updateOne = function(req,res){

    }

    exports.delete = function(req,res){
      exports.retrieve(req,res);
      db.User.remove({},function(err,data){
        if (err) console.log(err)
      })
    }

    exports.deleteOne = function(req,res){

    }



