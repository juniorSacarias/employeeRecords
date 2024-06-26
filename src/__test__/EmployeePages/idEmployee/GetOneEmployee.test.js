import { GetOneEmployee } from '@/app/Employee/[id]/page';

describe('GetOneEmployees', () => {
	it('debería obtener datos de la API correctamente', async () => {
		// Simula una respuesta exitosa de la API
		const mockResponse = {
			message: 'successfull',
			status: 200,
			data: [
				{
					id: 48,
					firstName: 'antonia',
					lastName: 'Ferreira',
					birthday: '1999-06-16',
					age: 24,
					createdAt: '2024-05-22T15:02:08.000Z',
					updatedAt: '2024-05-23T12:52:45.000Z'
				}
			]
		};

		// Mockea la función fetch para devolver la respuesta simulada
		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue(mockResponse)
		});

		// Llama a la función GetAllEmployees
		const result = await GetOneEmployee(mockResponse.data[0].id);

		// Verifica que los datos se hayan obtenido correctamente
		expect(result).toEqual(mockResponse);
	});

	it('debería manejar errores correctamente', async () => {
		// Simula un error al obtener datos de la API
		const mockError = new Error('Error taking the employee with specific id');

		// Mockea la función fetch para devolver un error
		global.fetch = jest.fn().mockRejectedValue(mockError);

		// Llama a la función GetAllEmployees
		try {
			await GetOneEmployee();
		} catch (error) {
			// Verifica que se haya capturado el error correctamente
			expect(error).toEqual(mockError);
		}
	});
});
