import AllEmployee from '@/components/Employee/AllEmployee/AllEmployee';
import styles from '@/styles/MainPage/page.module.css';

// Create a async function GetALlEmployees for fetch the data of the api

export async function GetAllEmployees() {
	const options = {
		method: 'GET'
	};
	const response = fetch('http://localhost:3000/api/employees', options)
		.then(response => response.json())
		.catch(error => console.error(error));

	return response;
}

export default async function Home() {
	return (
		<main className={styles.main}>
			<AllEmployee />
		</main>
	);
}
