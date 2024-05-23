import Navigation from "@/components/Main/Navigation"
import QueryProvider from "@/utils/Provider";

export const metadata = {
	title: 'Employee records',
	description: 'Training app for volenday'
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<QueryProvider>
				<body>
					<Navigation />
					{children}
				</body>
			</QueryProvider>
		</html>
	);
}
