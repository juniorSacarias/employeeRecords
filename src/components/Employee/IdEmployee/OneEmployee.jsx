'use client';

import IdEmployee from './IdEmployee';
import { GetOneEmployee } from '@/app/Employee/[id]/page';
import styles from '@/styles/MainPage/AllEmployee/AllEmployee.module.css';

import { useQuery } from 'react-query';
import { CircularProgress } from '@mui/material';

export default function OneEmployee({id}) {
	console.log(id);
	const { isLoading, isError, data, error } = useQuery({
		queryFn: async () => await GetOneEmployee(id),
		queryKey: 'employee'
	});
	if (isLoading) return <CircularProgress data-testid='loading-spinner' className={styles.progress}/>;
	if (isError) return <h1>Error</h1>;
	return (
		<>
			<div className={styles.div}>
				<IdEmployee data-testid="CardEmployee" employee={data} />
			</div>
		</>
	);
}
