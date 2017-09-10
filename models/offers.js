//Creates the offers table with validation, error handling, and foreign key associations
//=============================================================================================
module.exports = function(sequelize, DataTypes) {
  var Offers = sequelize.define("offers", {
    ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    offer_amt:{ 
        type: DataTypes.DECIMAL(11,2),
        allowNull:false,
        defaultValue: 0
    }, 
    barter_ItemId: {
        type: DataTypes.INTEGER 
    },
    offer_accepted_ind: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
         defaultValue: 0
    },
    offer_accepted_dtm:{ 
        type: DataTypes.DATE
    },
    deleted_flag: {
        type: DataTypes.BOOLEAN,
         defaultValue: 0
    }
  });

Offers.associate = function(models) {
    Offers.belongsTo(models.items, {foreignKey: 'ItemId', targetKey: 'id'});
    Offers.belongsTo(models.items, {foreignKey: 'barter_ItemId', targetKey: 'id'});
    Offers.belongsTo(models.Users);
  }

// Syncs with DB
 return Offers;
};