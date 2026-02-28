const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/signup', async (req, res) => {
  let { name, username, email, password } = req.body;
  let emailCon=await userModel.findOne({email: email});
  if(emailCon){
    res.status(400).json({message:"Email already exists"}); 
    }else{
    let user=userModel.create({
        name:name,
        username:username,
        email:email,        
        password:password
    });
   res.json({message:"User created successfully"});
    }
});

router.post('/login', async (req, res) => {
  let { email, password } = req.body;
  let emailCon=await userModel.findOne({

    email: email,
    password: password
  });   
    if(emailCon){
    res.json({message:"Login successful"});
    }
    else{
    res.status(400).json({message:"Invalid email or password"});
    }   
});
module.exports = router;