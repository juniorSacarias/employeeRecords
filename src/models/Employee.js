import { DataTypes } from 'sequelize';
import sequelize from '@/config/sequelize';

const Employee = sequelize.define('employee', {
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	birthday: {
		type: DataTypes.DATEONLY,
		allowNull: false
	},
	age: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});

export default Employee;
