import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import IdEmployee from '@/components/Employee/IdEmployee/IdEmployee';
import { QueryClient, QueryClientProvider } from 'react-query';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

// Mock useRouter from next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn() // Mocking push function
    })
}));

describe('IdEmployee Component', () => {
    const employee = {
        message: 'successfull',
        status: 200,
        data: [
            {
                id: 51,
                firstName: 'John',
                lastName: 'Doe',
                birthday: '1990-01-01',
                age: 30
            }
        ]
    };

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should delete employee and redirect', async () => {
        const mockMutate = jest.fn(); // Mock the mutate function
        mockMutate.mockResolvedValueOnce({}); // Resolve mutate function

        render(
            <QueryClientProvider client={new QueryClient()}>
                <IdEmployee employee={employee} />
            </QueryClientProvider>
        );

        const deleteButton = screen.getByTestId('button-delete');
        fireEvent.click(deleteButton);

        await act(async () => {
            // Esperar a que se complete la llamada a mutate
            await mockMutate();
        });

        expect(fetchMock).toHaveBeenCalledWith(`http://localhost:3000/api/employees/${employee.data[0].id}`, {
            method: 'DELETE'
        });
    });
});
