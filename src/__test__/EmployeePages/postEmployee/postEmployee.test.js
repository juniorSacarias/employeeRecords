import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormPostEmployee from '@/components/Employee/postEmployee/FormPostEmployee';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query'; // Solo necesitas importar useMutation

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}));

jest.mock('react-query', () => ({
	useMutation: jest.fn()
}));

describe('FormPostEmployee', () => {
	it('should call useMutation on form submit', async () => {
		// Simular la mutación
		const mutate = jest.fn(); // Crear una función simulada para la mutación
		useMutation.mockReturnValue({ mutate }); // Devolver la función simulada cuando se llame useMutation

		// Renderizar el componente
		render(<FormPostEmployee />);

		// Simular la entrada del usuario
		fireEvent.change(screen.getByLabelText('firstName'), { target: { value: 'Juan' } });
		fireEvent.change(screen.getByLabelText('lastName'), { target: { value: 'test 3' } });
		fireEvent.change(screen.getByLabelText('birthday'), { target: { value: '1977-10-20' } });

		// Simular el envío del formulario
		fireEvent.submit(screen.getByTestId('formPost'));

		// Esperar a que useMutation sea llamado con los datos correctos
		await waitFor(() => {
			expect(useMutation).toHaveBeenCalledWith(expect.any(Function)); // Verificar que se haya llamado useMutation
			expect(mutate).toHaveBeenCalledWith({
				firstName: 'Juan',
				lastName: 'test 3',
				birthday: '1977-10-20',
				age: expect.any(Number)
			});
		});
	});
});
