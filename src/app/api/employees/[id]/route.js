import { NextResponse } from 'next/server';
import Employee from '@/models/Employee';

async function GET(req) {
	try {
		// Take the url and with the method split take only the id
		const id = req.url.split('employees/')[1];
		// Use the id in the method findByPk for take the employee with the id
		const employeeById = await Employee.findByPk(id);
		// Return the correct code status, the message and the data ( with a array )
		return NextResponse.json({
			message: 'successfull',
			status: 200,
			data: [employeeById]
		});
	} catch (error) {
		// Print a error in the console
		console.error('Error taking the employee with specific id', error);
		// Return a error code status and error message
		return NextResponse.json({
			message: 'error',
			status: 500
		});
	}
}

async function PUT(req) {
	try {
		// Take the url and with the method split take only the id
		const id = req.url.split('employees/')[1];
		console.log(id);
		// Take the body data
		const bodyRequest = await req.json();
		console.log(bodyRequest);
		// Check if the data have a minimal requeriments, if dosen`t have print a error
		if (!bodyRequest.firstName && !bodyRequest.lastName && !bodyRequest.birthday && !bodyRequest.age) {
			throw new Error('does not meet the requirements to be updates');
		}
		// Create a new Object with the data
		const putNewEmployee = {
			firstName: bodyRequest.firstName,
			lastName: bodyRequest.lastName,
			birthday: bodyRequest.birthday,
			age: bodyRequest.age
		};
		console.log(putNewEmployee);
		// Add this object at the method update with the first argument, for the second argument pass the filter id
		const putEmployee = await Employee.update(putNewEmployee, {
			where: {
				// Filter
				id: id
			}
		});
		// Response with the correct message and status code
		return NextResponse.json({
			message: 'successfull',
			status: 200
		});
	} catch (error) {
		// Print in the console a error message
		console.error('Error updating the employee with specific id', error);
		// Reponse with the error message and status code
		return NextResponse.json({
			message: 'error',
			status: 500
		});
	}
}

async function DELETE(req) {
	try {
		// Take the url and with the method split take only the id
		const id = req.url.split('employees/')[1];
		// Add the id at the method destroy at the first argument in the filter
		const employeeById = await Employee.destroy({
			where: {
				// filter
				id: id
			}
		});
		// Response with the correct message and status code
		return NextResponse.json({
			message: 'successfull',
			status: 200
		});
	} catch (error) {
		// Print the error in the console
		console.error('Error deleting the employee with specific id', error);
		// Response with the error message and status code
		return NextResponse.json({
			message: 'error',
			status: 500
		});
	}
}

module.exports = { GET, PUT, DELETE };
