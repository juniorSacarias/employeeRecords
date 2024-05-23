'use client';

import Styles from '@/styles/Components/Employee/CardEmployee/CardEmployee.module.css';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

export default function CardEmployee({ employee }) {
    const employees = employee.data;
	return (
		<>
			<div className={Styles.container} data-testid='employeeCard'>
				{employees.map(employee => {
					return (
						<Card key={employee.id} data-testid="employee-card" className={Styles.Card}>
							<CardContent className={Styles.CardContent}>
								<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
									First Name
								</Typography>
								<Typography variant="h5" component="div">
									{employee.firstName}
								</Typography>
								<Typography sx={{ mb: 1 }} color="text.secondary">
									Last Name
								</Typography>
								<Typography variant="body2">{employee.lastName}</Typography>
								<Typography sx={{ mb: 1 }} color="text.secondary">
									BirthDay
								</Typography>
								<Typography variant="body2">{employee.birthday}</Typography>
								<Typography sx={{ mb: 1 }} color="text.secondary">
									Age
								</Typography>
								<Typography variant="body2">{employee.age}</Typography>
							</CardContent>
							<CardActions className={Styles.CardActions}>
								<Link href={`/Employee/${employee.id}`}>
									<Button variant="contained" data-testid="button-moreInfo">More info</Button>
								</Link>
							</CardActions>
						</Card>
					);
				})}
			</div>
		</>
	);
}
