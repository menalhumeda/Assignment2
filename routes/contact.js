let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const contact = require("../models/contact");

// connect to our Book Model
let Business = require("../models/contact");

///let passport = require("passport");

/* GET Route for the Book List page - READ OPeration */
router.get("/", (req, res, next) => {
  Business.find((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(bookList);

      res.render("contact", { title: " Business Contact List", BusinessList: contactList });
      //render book.ejs and pass title and Booklist variable we are passing bookList object to BookList property
    }
  });
});


//  GET the faculty Details page in order to add a new faculty   -- i ADDED
router.get("/add", (req, res, next) => {
    res.render("contact-list/add", {title :"Add Contact"});
  });
  
  // POST process the faculty  Details page and create a new faculty  - CREATE
  router.post("/add", (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    let newcontact =Business({
      contactName: req.body.contactName,
     contactNumber: req.body.contactNumber,
      emailAddress: req.body.emailAddress,
      
  });
  Business.create(newcontact,(err,faculty)=>
  {
    if(err){console.log(err);res.end(err);}
    else{
      res.redirect("/contact-list");}
  });
  
  });
  
  // GET the faculty  Details page in order to edit an existing faculty
  router.get("/edit/:id", (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    
      let id =req.params.id;
      Business.findById(id, (err,contacttoedit)=>{
        if(err){
          console.log(err);
          res.end(err);  
        }
        else{
          res.render("contact-list/edit",{title: "Update Contact",contact: contacttoedit})
        }
      });
    
  
  });
  
  // POST - process the information passed from the details form and update the document
  router.post("/edit/:id", (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    let id =req.params.id; 
    
    let updateBusiness = Business({
      _id: id,
      contactName: req.body.contactName,
      contactNumber: req.body.contactNumber,
       emailAddress: req.body.emailAddress,
       
    });
  
    Business.updateOne({_id: id}, updateBusiness, (err) =>{
      if (err) {
        console.log(err);
        res.end(err);
      }
      else{
        res.redirect("/contact-list");
      }
    });
   
  });
  
  // GET - process the delete
  router.get("/delete/:id", (req, res, next) => {
    /*****************
     * ADD CODE HERE *
     *****************/
    
     let id =req.params.id;
  
     
    contact.deleteOne({_id: id}, (err) =>{
      if (err) {
        console.log(err);
        res.end(err);
      }
      else{
        res.redirect("/contact-list");
      }
    });
    
  
  }); 
  
  
  
  
  

module.exports = router;
