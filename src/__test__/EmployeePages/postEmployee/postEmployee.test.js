import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormPostEmployee from '../../../components/Employee/postEmployee/FormPostEmployee';
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
	beforeEach(() => {
		// Mockear la función mutate de useMutation
		const mutate = jest.fn();
		mutate.mockResolvedValueOnce({}); // Simular una respuesta exitosa
		useMutation.mockReturnValue({ mutate });
	});
	test('should submit form with employee data', async () => {
		render(<FormPostEmployee />);

		fireEvent.change(screen.getByLabelText('firstName'), { target: { value: 'John' } });
		fireEvent.change(screen.getByLabelText('lastName'), { target: { value: 'test mutuate' } });
		fireEvent.change(screen.getByLabelText('birthday'), { target: { value: '1990-01-01' } });

		fireEvent.submit(screen.getByTestId('formPost'));

		await waitFor(() => {
			expect(useMutation).toHaveBeenCalled();
			expect(useMutation.mock.calls[0][0]).toBeInstanceOf(Function); // Verificar que useMutation se llama con una función
		});
	});
});
