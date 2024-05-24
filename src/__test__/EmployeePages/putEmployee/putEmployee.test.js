import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormEditEmployee from '@/components/Employee/editEmployee/FormEditEmployee';
import { useMutation, useQuery } from 'react-query'; // Solo necesitas importar useMutation

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}));

jest.mock('react-query', () => ({
	useMutation: jest.fn(),
	useQuery: jest.fn()
}));

// Mock para el resultado de la query
const mockData = {
	isLoading: false,
	isError: false,
	data: {
		data: [
			{
				firstName: 'antonia',
				lastName: 'Ferreira',
				birthday: '1999-06-16',
				age: 24
			}
		]
	},
	error: null
};

// Mock para la función de mutación
const mockMutate = jest.fn();

// Mock para la función de query
const mockGetOneEmployee = jest.fn();

describe('FormEditEmployee', () => {
	beforeEach(() => {
		// Resetear mocks antes de cada prueba
		useMutation.mockReturnValue({ mutate: mockMutate });
		useQuery.mockReturnValue(mockData);
		mockGetOneEmployee.mockClear();
		mockMutate.mockClear();
	});

	it('should render form with employee data and submit successfully', async () => {
		render(<FormEditEmployee idEmployee="1" />);

		// Verificar que los campos de texto se llenan con los datos del empleado
		expect(screen.getByLabelText('FirstName')).toHaveValue('antonia');
		expect(screen.getByLabelText('LastName')).toHaveValue('Ferreira');
		expect(screen.getByLabelText('Birthday')).toHaveValue('1999-06-16');

		// Simular cambio en el input de fecha de nacimiento
		fireEvent.change(screen.getByLabelText('Birthday'), { target: { value: '1996-05-05' } });

		// Simular envío del formulario
		fireEvent.submit(screen.getByText('Edit a employee'));

		// Esperar a que se llame a la mutación
		await waitFor(() => {
			expect(mockMutate).toHaveBeenCalledTimes(1);
			expect(mockMutate).toHaveBeenCalledWith({
				updateEmployee: {
					firstName: 'antonia',
					lastName: 'Ferreira',
					birthday: '1996-05-05',
					age: 28
				},
				id: '48'
			});
		});

		// Verificar que se llama a useRouter para redireccionar después de la edición
		expect(require('next/navigation').useRouter().push).toHaveBeenCalledWith('/Employee/48');
	});
});
