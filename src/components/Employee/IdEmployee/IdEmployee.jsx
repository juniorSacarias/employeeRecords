'use client';

import { GetOneEmployee } from '@/app/Employee/[id]/page';
import Styles from '@/styles/Components/Employee/IdEmployee/IdEmployee.module.css';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Typography from '@mui/material/Typography';

export default function IdEmployee({ idEmployee }) {
	const queryClient = useQueryClient();

	const { isLoading, isError, data, error } = useQuery({
		queryFn: async () => await GetOneEmployee(idEmployee),
		queryKey: 'employee'
	});

	const { push } = useRouter();

	const deleteEmployee = async idEmployee => {
		try {
			const options = {
				method: 'DELETE'
			};
			const response = await fetch(`http://localhost:3000/api/employees/${idEmployee}`, options);
			if (response.ok) {
				const data = await response.json();
				return data;
			}
			throw new Error('Error deleting employee');
		} catch (error) {
			throw new Error('Error deleting employee: ' + error.message);
		}
	};

	const deleteEmployeMutation = useMutation(deleteEmployee, {
		onSuccess: () => {
			queryClient.invalidateQueries('employees');
		}
	});

	const handleDelete = idEmployee => {
		try {
			deleteEmployeMutation.mutate(idEmployee);
			push('/');
		} catch (error) {
			console.error(error);
		}
	};

	if (isLoading) return <CircularProgress data-testid="loading-spinner" className={Styles.CircularProgress} />;
	if (isError) return <h1>Error</h1>;

	const employeeData = data.data;

	return (
		<>
			<div className={Styles.container} data-testid="employee-card">
				{employeeData.map(idEmployee => {
					return (
						<Card key={idEmployee.id} data-testid="employee-card" className={Styles.Card}>
							<CardContent className={Styles.CardContent}>
								<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
									First Name
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
									<Button variant="contained">Edit</Button>
								</Link>
								<Button variant="contained" color="error" onClick={() => handleDelete(idEmployee.id)}>
									Delete
								</Button>
							</CardActions>
						</Card>
					);
				})}
			</div>
		</>
	);
}
