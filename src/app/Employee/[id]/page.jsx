import IdEmployee from '@/components/Employee/IdEmployee/IdEmployee';
import Styles from '@/styles/MainPage/page.module.css'

// Function for take only the user in reference of the id, export for can use it in other page

export async function GetOneEmployee(idEmployee) {
	const options = {
		method: 'GET'
	};
	const response = fetch(`http://localhost:3000/api/employees/${idEmployee}`, options)
		.then(response => response.json())
		.catch(error => console.log(error));
	return response;
}

export default function Page({ params }) {
	return (
		<>
			<div className={Styles.main}>
				<IdEmployee idEmployee={params.id} />
			</div>
		</>
	);
}
