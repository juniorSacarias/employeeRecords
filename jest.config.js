const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: './'
});

// Add any custom config to be passed to Jest
const config = {
	coverageProvider: 'v8',
	testEnvironment: 'jsdom',
	// Transforma archivos JS utilizando Babel
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
		// Si tienes un transformador de CSS personalizado, especifica la ruta aquí
		// De lo contrario, puedes eliminar esta línea
		// '\\.css$': '<rootDir>/path/to/css-transformer.js'
	}
	
};

// Exporta la configuración de Jest
module.exports = {
	// Merge la configuración de Jest con la configuración personalizada
	...config,
	// Mapea archivos CSS utilizando identity-obj-proxy
	moduleNameMapper: {
		'\\.(css|scss)$': 'identity-obj-proxy',
		// Agrega un mapeo para resolver el alias @ en las rutas de importación
		'^@/(.*)$': '<rootDir>/src/$1'
	}
};
