'use client';

import { GetOneEmployee } from '@/app/Employee/[id]/page';
import Styles from '@/styles/Components/Employee/FormsEmployee/FormsEmployee.module.css';

import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export default function FormEditEmployee({ idEmployee }) {
	// method push for navigate and force change the page when the update is complete

	const router = useRouter();

	// For get the information about one employee with id i`m use useQuery *

	const { isLoading, isError, data, error } = useQuery({
		queryFn: async () => await GetOneEmployee(idEmployee),
		queryKey: 'employee'
	});

	// useState, set the data about employee in the form

	const [employee, setEmployee] = useState({
		id: idEmployee,
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
		if (age <= 18) {
			alert("The age is less than 18 years old or is not assigned")
			return null;
		}
		return age;
	};

	// Configuracion about update with reactQuery, need first create a method using in this case fetch for update *

	const { mutate } = useMutation(async ( updateEmployee ) => {
		try {
			const options = {
				method: 'PUT',
				body: JSON.stringify(updateEmployee)
			};
			const response = await fetch(`http://localhost:3000/api/employees/${updateEmployee.id}`, options);
			if (!response.ok) {
				throw new Error('Error updating employee');
			}
			return response.json();
		} catch (error) {
			throw new Error('Error updating employee: ' + error.message);
		}
	});

	// Set the information of the form with setEmployee

	const handleChange = e => {
		setEmployee({
			...employee,
			[e.target.name]: e.target.value
		});
	};

	// Use the employee data for launch the update handle function and push at "/Employee/id" *

	const handleSubmit = async e => {
		e.preventDefault();
		const updateEmployee = employee;
		console.log(updateEmployee);
		try {
			if (
				!updateEmployee.firstName &&
				!updateEmployee.lastName &&
				!updateEmployee.birthday &&
				!updateEmployee.age
			) {
				alert('does not meet the requirements to be edited');
				return;
			}
			mutate(updateEmployee);
			alert('Employee updated successfully');
			router.push(`/Employee/${updateEmployee.id}`);
		} catch (error) {
			throw new Error('Error with the update' + error.message);
		}
	};

	if (isLoading) return <CircularProgress className={Styles.CircularProgress} />;
	if (isError) return <h1>Error</h1>;

	return (
		<>
			<div className={Styles.container}>
				<form action="POST" className={Styles.form} onSubmit={handleSubmit}>
					<label htmlFor="FirstName" className={Styles.label}>
						FirstName
					</label>
					<input
						id="FirstName"
						type="text"
						name="firstName"
						className={Styles.input}
						onChange={handleChange}
					/>
					<label htmlFor="LastName" className={Styles.label}>
						LastName
					</label>
					<input id="LastName" type="text" name="lastName" className={Styles.input} onChange={handleChange} />
					<label htmlFor="Birthday" className={Styles.label}>
						Birthday
					</label>
					<input id="Birthday" type="date" name="birthday" className={Styles.input} onChange={handleChange} />
					<h5>The employee must be over 18 years old</h5>
					<Button variant="contained" color="success" type="submit" className={Styles.button}>
						Edit a employee
					</Button>
				</form>
			</div>
		</>
	);
}
