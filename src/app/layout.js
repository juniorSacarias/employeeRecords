import Navigation from '@/components/Main/Navigation';
import QueryProvider from '@/utils/Provider';

export const metadata = {
	title: 'Employee records',
	description: 'Training app for volenday'
};

export default function RootLayout({ children }) {
	return (
		<QueryProvider>
			<html lang="en">
				<meta name="viewport" content="initial-scale=1, width=device-width" />

				<body>
					<Navigation />
					{children}
				</body>
			</html>
		</QueryProvider>
	);
}
