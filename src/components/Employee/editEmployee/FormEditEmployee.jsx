'use client';

import { GetOneEmployee } from '@/app/Employee/[id]/page';
import Styles from '@/styles/Components/Employee/FormsEmployee/FormsEmployee.module.css';

import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export default function FormEditEmployee({ idEmployee }) {
	// method push for navigate and force change the page when the update is complete

	const { push } = useRouter();

	// For get the information about one employee with id i`m use useQuery *

	const { isLoading, isError, data, error } = useQuery({
		queryFn: async () => await GetOneEmployee(idEmployee),
		queryKey: 'employee'
	});

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

	// Configuracion about update with reactQuery, need first create a method using in this case fetch for update *

	const updateEmployee = async ({ updateEmployee, id }) => {
		try {
			const options = {
				method: 'PUT',
				body: JSON.stringify(updateEmployee)
			};
			const response = await fetch(`http://localhost:3000/api/employees/${id}`, options);
			if (response.ok) {
				const data = await response.json();
				return data;
			}
			throw new Error('Error updating employee');
		} catch (error) {
			throw new Error('Error updating employee: ' + error.message);
		}
	};

	// Use Mutate and pass the argument updateEmployee for generate the change *

	const { mutate } = useMutation(updateEmployee);

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
		const id = idEmployee;
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
			if (updateEmployee.age <= 18 || updateEmployee.age == null) {
				alert('The age is less than 18 years old or is not assigned');
				return;
			}
			const result = await mutate({ updateEmployee, id });
			alert('Employee updated successfully');
			push(`/Employee/${idEmployee}`);
		} catch (error) {
			throw new Error('Error with the update' + error.message);
		}
	};

	if (isLoading) return <CircularProgress className={Styles.CircularProgress} />;
	if (isError) return <h1>Error</h1>;

	// const for use in placeholder in form

	const employeeDataPlaceHolder = data.data[0];

	return (
		<>
			<div className={Styles.container}>
				<form action="POST" className={Styles.form} onSubmit={handleSubmit}>
					<label className={Styles.label}>FirstName</label>
					<input
						type="text"
						name="firstName"
						className={Styles.input}
						onChange={handleChange}
						placeholder={employeeDataPlaceHolder.firstName}
					/>
					<label className={Styles.label}>LastName</label>
					<input
						type="text"
						name="lastName"
						className={Styles.input}
						onChange={handleChange}
						placeholder={employeeDataPlaceHolder.lastName}
					/>
					<label className={Styles.label}>Birthday</label>
					<input type="date" name="birthday" className={Styles.input} onChange={handleChange} />
					<Button variant="contained" color="success" type="submit" className={Styles.button}>
						Edit a employee
					</Button>
				</form>
			</div>
		</>
	);
}
