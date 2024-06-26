// Importa la función GetAllEmployees
import { GetAllEmployees } from '@/app/page'; // Asegúrate de proporcionar la ruta correcta

describe('GetAllEmployees', () => {
	it('debería obtener datos de la API correctamente', async () => {
		// Simula una respuesta exitosa de la API
		const mockResponse = {
			message: 'successfull',
			status: 200,
			data: [
				{
					id: 40,
					firstName: '',
					lastName: '',
					birthday: '1990-01-01',
					age: 30,
					createdAt: '2024-05-22T14:57:27.000Z',
					updatedAt: '2024-05-22T14:57:27.000Z'
				},
			]
		};

		// Mockea la función fetch para devolver la respuesta simulada
		global.fetch = jest.fn().mockResolvedValue({
			json: jest.fn().mockResolvedValue(mockResponse)
		});

		// Llama a la función GetAllEmployees
		const result = await GetAllEmployees();

		// Verifica que los datos se hayan obtenido correctamente
		expect(result).toEqual(mockResponse);
	});

	it('debería manejar errores correctamente', async () => {
		// Simula un error al obtener datos de la API
		const mockError = new Error('Error al obtener datos');

		// Mockea la función fetch para devolver un error
		global.fetch = jest.fn().mockRejectedValue(mockError);

		// Llama a la función GetAllEmployees
		try {
			await GetAllEmployees();
		} catch (error) {
			// Verifica que se haya capturado el error correctamente
			expect(error).toEqual(mockError);
		}
	});
});
