var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../model/User')
const tokenMiddlewear = require('../middlewear/auth')
const Book = require('../model/Book')

// signup with crybt password
router.post('/addUser',(req,res)=>{
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err){
      console.log(err);
    }else{
      const user = new User({
        name : req.body.name,
        phone : req.body.phone,
        password: hash
      })
      user.save()
      .then(doc=>{
        res.send(doc)
      })
      .catch(err=>{
        console.log(err);
      })
    }
  })
})

// login and return token 
router.post('/login',(req,res)=>{
  User.findOne({name:req.body.name})
  .then(user=>{
    if(user){
      bcrypt.compare(req.body.password,user.password,(err,result)=>{
        if(result){
          const token = user.generateToken()
          res.send({
            user : user,
            token : token
          })
        }else{
          res.status(401).send("email or password not correct")
        }
      })
    }else{
      res.status(403).send("you don't have an account")
    }
  })
  .catch(err=>{
    console.log(err);
  })
})


// add book 
router.post('/addBook',tokenMiddlewear,(req,res)=>{
  const book = new Book({
    name : req.body.name,
    author : req.body.author,
    price: req.body.price
  })
  book.save()
  .then(doc=>{
    res.status(200).send(doc)
  })
  .catch(err=>{
    res.status(404).console.log(err);
  })
})


// get all books 
router.get('/getAll',tokenMiddlewear,(req,res)=>{
  Book.find()
  .then(books=>{
    res.status(200).send(books)
  }).catch(err=>{
    res.status(404).console.log(err);
  })
})
module.exports = router;
