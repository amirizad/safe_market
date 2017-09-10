//Creates the messages table with validation, error handling, and foreign key associations
//=============================================================================================
module.exports = function(sequelize, DataTypes) {
  var Messages = sequelize.define("messages", {
    ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FromId:{ 
        type: DataTypes.INTEGER,
        allowNull:false,
    }, 
    ToId: {
        type: DataTypes.INTEGER, 
        allowNull:false,
    },
    ItemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    message_text:{ 
        type: DataTypes.STRING
    },
    read_ind:{ 
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    deleted_flag: {
        type: DataTypes.BOOLEAN,
         defaultValue: 0
    }
  });

Messages.associate = function(models) {
    Messages.belongsTo(models.items,{foreignKey: 'ItemId', targetKey: 'id'});
    Messages.belongsTo(models.Users,{foreignKey: 'FromId', targetKey: 'id'});
    Messages.belongsTo(models.Users,{foreignKey: 'ToId', targetKey: 'id'});
  }

// Syncs with DB
 return Messages;
};