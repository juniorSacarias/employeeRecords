'use client';

import Styles from '@/styles/Components/Employee/IdEmployee/IdEmployee.module.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Typography from '@mui/material/Typography';

export default function IdEmployee({ employee }) {
	const queryClient = useQuery();

	const employeeData = employee.data;

	console.log(employeeData);

	const { push } = useRouter();

	const { mutate, isLoading, isError, error } = useMutation(async (idEmployee) => {
		try {
			const options = {
				method: 'DELETE'
			};
			const response = await fetch(`http://localhost:3000/api/employees/${idEmployee}`, options);
			if (!response.ok) {
				throw new Error('Error deleting employee');
			}
			return response.json();
		} catch (error) {
			throw new Error('Error deleating employee' + error.message);
		}
	});

	const handleDelete = async (idEmployee) => {
		try {
			mutate(idEmployee)
			push('/');
		} catch (error) {
			throw new Error('Error with the delete' + error.message);
		}
	};
	return (
		<div className={Styles.container} data-testid="employee-card">
			{employeeData.map(idEmployee => {
				return (
					<Card key={idEmployee.id} data-testid="employee-card" className={Styles.Card}>
						<CardContent className={Styles.CardContent}>
							<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
								First Name	console.log(employee);
							</Typography>
							<Typography variant="h5" component="div">
								{idEmployee.firstName}
							</Typography>
							<Typography sx={{ mb: 1 }} color="text.secondary">
								Last Name
							</Typography>
							<Typography variant="body2">{idEmployee.lastName}</Typography>
							<Typography sx={{ mb: 1 }} color="text.secondary">
								BirthDay
							</Typography>
							<Typography variant="body2">{idEmployee.birthday}</Typography>
							<Typography sx={{ mb: 1 }} color="text.secondary">
								Age
							</Typography>
							<Typography variant="body2">{idEmployee.age}</Typography>
						</CardContent>
						<CardActions className={Styles.CardActions}>
							<Link href={`/Employee/editEmployee/${idEmployee.id}`}>
								<Button variant="contained" data-testid="button-edit">
									Edit
								</Button>
							</Link>
							<Button
								variant="contained"
								color="error"
								data-testid="button-delete"
								onClick={() => handleDelete(idEmployee.id)}>
								Delete
							</Button>
						</CardActions>
					</Card>
				);
			})}
		</div>
	);
}
