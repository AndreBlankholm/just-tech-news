const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
   // set up method to run on instance data (per user) to check password
   checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password); //Using the keyword this, we can access this user's properties, including the password
  }
}

// create fields/columns for User model    //TABLE COLUMN DEFINITIONS GO HERE
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4],
      },
    },
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE
    hooks: {
      //beforeCreate hook is used to work with data before a new instance is created
      async beforeCreate(newUserData) {
        //encrypt password user passed in
        newUserData.password = await bcrypt.hash(newUserData.password, 10); //new user data hash
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(  //update (Put) user data, creates a hash for password
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
