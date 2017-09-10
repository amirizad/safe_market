//Creates the users table with validation and error handling
//=============================================================================================
module.exports = (sequelize,DataTypes)=>{
	const Users = sequelize.define('Users',{
		username:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:{
				args:true,
				msg:'Sorry, this username is not available. Please choose another username.'
			},
			validate:{
				len:{
					args:[1,50],
					msg:'Username cannot be empty'
				}
			}
		},
		email:{
			type:DataTypes.STRING,
			allowNull:false,
			unique:{
				args:true,
				msg:'This email is already registered. Please use the login page to sign in.'
			},
			validate:{
				isEmail:{
					args:true,
					msg:'Please enter a valid email address.'
				}
			}
		},
		password:{
			type:DataTypes.STRING,
			allowNull:false,
			validate:{
				len:{
					args:[6],
					msg:'Password must be atleast 6 characters long.'
				}
			}
		},
		role:{
			type:DataTypes.STRING,
			allowNull:false,
			defaultValue: 'user'
		},
		age: {
			 type: DataTypes.INTEGER,
			 allowNull: false,
			 validate: {
				 min: {
					 args:[18],
					 msg: "Must be 18 or over years old to create an account  " 
				 }
			 }
		},
		fname: {
			type: DataTypes.STRING,
			default: 'unknown'
		},
		lname: {
			type: DataTypes.STRING,
			default: 'unknown'
		}
   		,zip: {
			  type: DataTypes.STRING,
			  key:	true
     		//validate: {len: [1,10]}
  		},
   		phone: {
    		type: DataTypes.STRING,
     		//validate: {len: [1,15]}
		},
    	user_image_url: {
			  type: DataTypes.STRING,
			  default:'https://cdn.filestackcontent.com/pHtjny1tQqOY44A0A40s'
    	},
		verification_code: {
			type: DataTypes.STRING
		},
		verified_seller_ind: { 
			type: DataTypes.BOOLEAN,
			defaultValue: 0	
		},
		deleted_flag: { 
			type: DataTypes.BOOLEAN,
			defaultValue: 0
		}		
	},
	{
		indexes: [
			{
				unique: false,
				fields: ['zip']
		}]
	}
);

Users.associate = function(models) {
	Users.hasMany(models.items);
 	Users.hasMany(models.offers);
 	Users.hasMany(models.messages,{foreignKey: 'FromId', sourceKey: 'id'});
 	Users.hasMany(models.messages,{foreignKey: 'ToId', sourceKey: 'id'});
}

	return Users;
};