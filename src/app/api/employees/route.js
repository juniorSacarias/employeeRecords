import { NextResponse } from 'next/server';
import Employee from '@/models/Employee';

// API for take and post employees

async function GET() {
	try {
		// Using the method findAll for take all the employees
		const allEmployee = await Employee.findAll();
		// Return a object with the status code, message and the data
		return NextResponse.json({
			message: 'successfull',
			status: 200,
			data: allEmployee
		});
	} catch (error) {
		// Take the error and print in the console
		console.error('Error taking the data', error);
		// Return a error code status and message
		return NextResponse.json({
			message: 'error',
			status: 500
		});
	}
}

async function POST(req) {
	try {
		// Take the body data
		const bodyRequest = await req.json();
		// Check if the data have a minimal requeriments, if dosen`t have print a error
		if (!bodyRequest.firstName && !bodyRequest.lastName && !bodyRequest.birthday && !bodyRequest.age) {
			throw new Error('does not meet the requirements to be saved');
		}
		// Create a new Object with the data
		const newEmployee = {
			firstName: bodyRequest.firstName,
			lastName: bodyRequest.lastName,
			birthday: bodyRequest.birthday,
			age: bodyRequest.age
		};
		// Add this object at the method create
		const postEmployee = await Employee.create(newEmployee);
		// Response whit the correct status code and message
		return NextResponse.json({
			message: 'Successfully created employee',
			status: 200,
		});
	} catch (error) {
		// Print in the console a error
		console.error('Error taking the data', error);
		// Return a error code status and message
		return NextResponse.json({
			message: 'error created employee',
			status: 500
		});
	}
}

module.exports = { GET, POST };
