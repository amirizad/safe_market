//Creates the items table with validation, error handling, and foreign key associations
//=============================================================================================
module.exports = function(sequelize, DataTypes) {
  var Items = sequelize.define("items", {
      
   title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {len: [1,75]}
    },
   description: {
    type: DataTypes.STRING,
    allowNull: false,
     validate: {len: [1,255]}
    },
   category: {
     type: DataTypes.STRING,
     allowNull: false
   }, 
    item_image_url: {
      type: DataTypes.STRING,
    },
   quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.DECIMAL(11,2),
      allowNull: false, 
      defaultValue: 1
    },
    unit_type:{ 
      type: DataTypes.STRING, 
      allowNull: false,
      defaultValue: 'flat rate'
    },
     barter_ind: {
       type: DataTypes.BOOLEAN, 
       defaultValue: 0
    },
    buyer_sale_confirm: {
       type: DataTypes.BOOLEAN,
       defaultValue: 0
      },
    seller_sale_confirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    seller_rating: {
      type: DataTypes.DECIMAL(2,1),
      validation: {
        min: .5,
        max: 5
        }
    },
    deleted_flag: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    }},
    {
	indexes: [
    {
      unique: false,
      fields: ['title']
    },
    {
      unique: false,
      fields: ['category']
    }]
});

Items.associate = function(models) {
  Items.belongsTo(models.Users, {foreignKey: {allowNull: false}});
  Items.hasMany(models.offers, {foreignKey: 'ItemId', sourceKey: 'id'});  
  Items.hasMany(models.messages, {foreignKey: 'ItemId', sourceKey: 'id'});
}

// Syncs with DB
 return Items;
};