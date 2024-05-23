import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Navigation from '@/components/Main/Navigation';

describe("Should be all the elements in the page", () => {
    it("Should be all the elements in the page", () => {
        render(<Navigation/>);
        const employeeTitle = screen.getByText("Employee Records");
        const homeButton = screen.getByText("Home");
        const recordButton = screen.getByText("Record");
        expect(employeeTitle).toBeInTheDocument();
        expect(homeButton).toBeInTheDocument();
        expect(recordButton).toBeInTheDocument();
    });
});