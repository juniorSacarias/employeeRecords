'use client';

import Styles from '@/styles/Components/Employee/FormsEmployee/FormsEmployee.module.css';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';

export default function FormPostEmployee() {
	const router = useRouter();

	const [employee, setEmployee] = useState({
		firstName: '',
		lastName: '',
		birthday: '',
		age: 0
	});

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

	const calculateAge = birthday => {
		const birthDate = new Date(birthday);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();
		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		if (age < 18) {
			return null;
		}

		return age;
	};

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

	const { mutate } = useMutation(createEmployee);

	const handleChange = async e => {
		setEmployee({
			...employee,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const employeeData = employee;
		console.log(employeeData);
		try {
			if (!employeeData.firstName || !employeeData.lastName || !employeeData.birthday || employeeData.age === 0) {
				alert('does not meet the requirements to be edited');
				return;
			}
			if (employeeData.age < 18 || employeeData.age == null) {
				alert('The age is less than 18 years old or is not assigned');
				return;
			}
			mutate(employeeData);
			alert('Employee created successfully');
			router.push('/');
		} catch (error) {
			throw new Error('Error with the post' + error.message);
		}
	};

	return (
		<>
			<div className={Styles.container} data-testid="formPost">
				<form action="POST" id="formPost" className={Styles.form} onSubmit={handleSubmit}>
					<label htmlFor="firstName" className={Styles.label}>
						firstName
					</label>
					<input
						id="firstName"
						type="text"
						name="firstName"
						className={Styles.input}
						onChange={handleChange}
					/>
					<label htmlFor="lastName" className={Styles.label}>
						lastName
					</label>
					<input id="lastName" type="text" name="lastName" className={Styles.input} onChange={handleChange} />
					<label htmlFor="birthday" className={Styles.label}>
						birthday
					</label>
					<input id="birthday" type="date" name="birthday" className={Styles.input} onChange={handleChange} />

					<Button variant="contained" color="success" type="submit">
						Record an employee
					</Button>
				</form>
			</div>
		</>
	);
}
