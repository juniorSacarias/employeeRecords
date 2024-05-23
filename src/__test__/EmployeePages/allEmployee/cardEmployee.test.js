import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardEmployee from '@/components/Employee/AllEmployee/CardEmployee';

describe('CardEmployee funcionality', () => {
	const employees = {
		message: 'successfull',
		status: 200,
		data: [
			{
				id: 41,
				firstName: 'John',
				lastName: 'Doe',
				birthday: '1990-01-01',
				age: 30,
				createdAt: '2024-05-22T14:57:27.000Z',
				updatedAt: '2024-05-22T14:57:27.000Z'
			},
			{
				id: 42,
				firstName: 'John',
				lastName: 'Doe',
				birthday: '1990-01-01',
				age: 30,
				createdAt: '2024-05-22T14:57:27.000Z',
				updatedAt: '2024-05-22T14:57:27.000Z'
			}
		]
	};

	it('Should be render elements in the card', async () => {
		render(<CardEmployee employee={employees} />);
		expect(screen.getAllByTestId('employee-card')).toHaveLength(2);
	});
	it('Should be render the label elements in the card', async () => {
		render(<CardEmployee employee={employees} />);
		expect(screen.findByText('First Name')).toBeInTheDocument;
		expect(screen.findByText('Last Name')).toBeInTheDocument;
		expect(screen.findByText('BirthDay Name')).toBeInTheDocument;
		expect(screen.findByText('Age')).toBeInTheDocument;
	});
	it('Should be render the button elements in the card', async () => {
		render(<CardEmployee employee={employees} />);
		expect(screen.getAllByTestId('button-moreInfo')).toBeInTheDocument;
	});
});
