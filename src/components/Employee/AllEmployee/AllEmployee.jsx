'use client';

import CardEmployee from './CardEmployee';
import { GetAllEmployees } from '@/app/page';
import styles from '@/styles/MainPage/AllEmployee/AllEmployee.module.css';

import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';

export default function AllEmployee() {
	const { isLoading, isError, data, error } = useQuery({
		queryFn: async () => await GetAllEmployees(),
		queryKey: 'employees'
	});
	if (isLoading) return <CircularProgress data-testid='loading-spinner' className={styles.progress}/>;
	if (isError) return <h1>Error</h1>;
	return (
		<>
			<div className={styles.div}>
				<CardEmployee data-testid="CardEmployee" employee={data} />
			</div>
		</>
	);
}
