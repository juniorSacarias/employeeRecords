import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IdEmployee from '@/components/Employee/IdEmployee/IdEmployee';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: jest.fn()
	})
}));

jest.mock('react-query', () => ({
	useQuery: jest.fn(),
	useMutation: jest.fn()
}));

describe('IdEmployee funcionality', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('Should be render elements in the card', () => {
		const data = {
			message: 'successfull',
			status: 200,
			data: [
				{
					id: 51,
					firstName: 'John',
					lastName: 'Doe',
					birthday: '1990-01-01',
					age: 30,
					createdAt: '2024-05-22T15:07:58.000Z',
					updatedAt: '2024-05-22T15:07:58.000Z'
				}
			]
		};

		render(<IdEmployee employee={data} />);
		expect(screen.getAllByTestId('employee-card')).toHaveLength(2);
	});
	it('Should render the label elements in the card', () => {
		const data = {
			message: 'successfull',
			status: 200,
			data: [
				{
					id: 51,
					firstName: 'John',
					lastName: 'Doe',
					birthday: '1990-01-01',
					age: 30,
					createdAt: '2024-05-22T15:07:58.000Z',
					updatedAt: '2024-05-22T15:07:58.000Z'
				}
			]
		};

		render(<IdEmployee employee={data} />);
		expect(screen.getByText('First Name')).toBeInTheDocument();
		expect(screen.getByText('Last Name')).toBeInTheDocument();
		expect(screen.getByText('BirthDay')).toBeInTheDocument();
		expect(screen.getByText('Age')).toBeInTheDocument();
	});
	it('Should be render the button elements in the card', async () => {
		const data = {
			message: 'successfull',
			status: 200,
			data: [
				{
					id: 51,
					firstName: 'John',
					lastName: 'Doe',
					birthday: '1990-01-01',
					age: 30,
					createdAt: '2024-05-22T15:07:58.000Z',
					updatedAt: '2024-05-22T15:07:58.000Z'
				}
			]
		};

		render(<IdEmployee employee={data} />);
		expect(screen.getAllByTestId('button-edit')).toBeInTheDocument;
		expect(screen.getAllByTestId('button-delete')).toBeInTheDocument;
	});
});
