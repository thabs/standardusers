'use strict';

const db = require('../models');
const User = db.user;

module.exports.createUser = async (req, res) => {
  try{
    const { firstName, lastName, cellPhone } = req.body;

    const user = await User.create({
      firstName, 
      lastName, 
      cellPhone
    });

    //! Lets return basic user details
    return res.status(201).send(user);
  }catch(err){
    res.status(400).send(err.message);
  }
};

module.exports.updateUser = async (req, res) => {
  try{
    const { firstName, lastName, cellPhone } = req.body;
    const { userId } = req.params;

    const user = await User.update(
      { firstName, lastName, cellPhone }, 
      { where: { id: userId} }
    ); 

    return res.status(200).send(user);     
  }catch(err){
    console.log(err.message);
    res.status(400).send(err.message);
  }
};

module.exports.readAll = async (req, res) => {
  try{
    const roles = await User.findAll();
    res.send(roles);
  }catch(error){
    res.send(error);
  }
};

module.exports.deleteUser = async (req, res) => {
  try{
    const { userId } = req.params;
    
    await User.destroy({ where: { id: userId} });
    return res.send({Id: userId});
  }catch(err){
    return res.send(err.message);
  }
};
  







