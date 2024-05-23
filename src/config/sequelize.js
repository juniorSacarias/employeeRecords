import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
	host: process.env.HOST,
	username: process.env.USERNAME,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	dialect: 'mysql',
	dialectModule: require('mysql2'),
	benchmark: true
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
		await sequelize.sync({ alter: true });
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

export default sequelize;
