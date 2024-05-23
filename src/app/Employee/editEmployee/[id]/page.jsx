import FormEditEmployee from '@/components/Employee/editEmployee/FormEditEmployee';

export default function Page({ params }) {
	return (
		<>
			<FormEditEmployee idEmployee={params.id} />
		</>
	);
}
