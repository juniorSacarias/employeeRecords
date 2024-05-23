'use client';

import Styles from '@/styles/Components/Employee/FormsEmployee/FormsEmployee.module.css';

import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

export default function FormPostEmployee() {
	// method push for navigate and force change the page when the update is complete

	let { push } = useRouter();

	// useState, set the data about employee in the form

	const [employee, setEmployee] = useState({
		firstName: '',
		lastName: '',
		birthday: '',
		age: 0
	});

	// When employee.birthday change executed the function calculateAge and set the new data of age

	useEffect(() => {
		if (employee.birthday) {
			const age = calculateAge(employee.birthday);
			if (age != null) {
				setEmployee(prevState => ({
					...prevState,
					age
				}));
			}
		}
	}, [employee.birthday]);

	// Function calculateAge recibe one argumente a Date of birthday, and compare with today date and calculate the age

	const calculateAge = birthday => {
		const birthDate = new Date(birthday);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();
		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		if (age >= 18) {
			return age;
		}
		alert('The age does not meet the requirements, it must be over 18 years old');
		return null;
	};

	// Configuracion about posting with reactQuery, need first create a method using in this case fetch for post

	const createEmployee = async employeeData => {
		try {
			const options = {
				method: 'POST',
				body: JSON.stringify(employeeData)
			};
			const response = await fetch('http://localhost:3000/api/employees', options);
			if (response.ok) {
				const data = await response.json();
				return data;
			}
			throw new Error('Error creating employee');
		} catch (error) {
			throw new Error('Error creating employee: ' + error.message);
		}
	};

	// Use Mutate and pass the argument updateEmployee for generate the change *

	const { mutate } = useMutation(createEmployee);

	// Set the information of the form with setEmployee

	const handleChange = async e => {
		setEmployee({
			...employee,
			[e.target.name]: e.target.value
		});
	};

	// Use the employee data for launch the post handle function and push at "/" *

	const handleSubmit = async e => {
		e.preventDefault();
		const employeeData = employee;
		try {
			if (!employeeData.firstName && !employeeData.lastName && !employeeData.birthday && !employeeData.age) {
				alert('does not meet the requirements to be edited');
				return;
			}
			if (employeeData.age <= 18 || employeeData.age == null) {
				alert('The age is less than 18 years old or is not assigned');
				return;
			}
			const result = await mutate(employeeData);
			alert('Employee created successfully');
			push('/');
		} catch (error) {
			throw new Error('Error with the post' + error.message);
		}
	};

	return (
		<>
			<div className={Styles.container}>
				<form action="POST" id="formPost" className={Styles.form} onSubmit={handleSubmit}>
					<label className={Styles.label}>FirstName</label>
					<input type="text" name="firstName" className={Styles.input} onChange={handleChange} />
					<label className={Styles.label}>LastName</label>
					<input type="text" name="lastName" className={Styles.input} onChange={handleChange} />
					<label className={Styles.label}>Birthday</label>
					<input type="date" name="birthday" className={Styles.input} onChange={handleChange} />
					<Button variant="contained" color="success" type="submit" className={Styles.button}>
						Record a employee
					</Button>
				</form>
			</div>
		</>
	);
}
