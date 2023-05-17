const express = require("express");
const mongoose = require("mongoose");// require mongoose
const bodyParser = require("body-parser");
const { name } = require("ejs");

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//create a todolistDB database and connect it
mongoose.connect("mongodb://127.0.0.1/todolistDB", {useNewUrlParser:true,useUnifiedTopology:true});

//create a Schema of only name feild
const itemSchema = new mongoose.Schema({
     name:String
});

const Item = mongoose.model("Item", itemSchema); // create a model of Items
/*
const Item1= new Item({
  name:"Welcome to the todolist"
});

const Item2= new Item({
  name:"Click + button to add items"
});

const Item3= new Item({
  name:"click delete to remove item"
});
*/
//const n= [Item1, Item2, Item3 ]; // create a array of items doc

app.get('/',async function(req,res)
{
    // res.send("<h1>hey guys</h1>");
 /*  Item.find().then(function(n){
        console.log(n);
   })  
      console.log("item is displayed",Item);
      res.render("list",{newListItems:Item});
        
    });
 
    */
      const item = await Item.find({})
      return res.render("list",{item})
})     

    

app.post("/", function(req,res)
{
      i = req.body.n;
   // console.log(i);
   //i1.push(i);
  //res.render("list",{newListItem:i});
   
   const item = new Item({
        name:i
       
   });
   item.save();

});
/*app.get('/delete', function (req, res) {
  // get the id from query
  var id = req.query;

  // checking the number of tasks selected to delete
  var count = Object.keys(id).length;
  for (let i = 0; i < count; i++) {

      // finding and deleting tasks from the DB one by one using id
      Item.findByIdAndDelete(Object.keys(id)[i], function (err) {
          if (!err) {
              console.log('successfully deleted');
          }
      })
  }
  return res.redirect('back');
});*/
   app.post("/delete", function(req,res){
  //   console.log(req.query.id,"req");
  //      const check=req.body.checkbox;
  //       var id = req.query; 
  //       var n = Object.keys(id).length;
  //       Item.findByIdAndRemove(check,function(err,deleteitem){
  //           if(!err)
  //           {
  //               console.log("Successfully deleted",id);
                
  //               res.redirect("/");
  //           }
  //            console.log("error",err);
  //       })
  //  });
        console.log(req.body.checkbox);
   });
/*
app.post("/delete", function(req, res){
  //console.log(req.body);
  const check = req.body.checkbox;

  let Item = item.findIndex(item => item.name == name);

  if(Item!= -1){
      item.splice(item, 1);
  }

  return res.redirect('back');
});
*/
app.listen(8000, function()
{
    console.log("listening to port 8000");

})

