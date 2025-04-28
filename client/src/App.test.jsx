import { render, screen } from "@testing-library/react";

import Header from "./components/Header.jsx";

import { BrowserRouter } from "react-router-dom";

test("renders Task Tracker heading", () => {
	render(
		<BrowserRouter>
			<Header />
		</BrowserRouter>
	);
	expect(screen.getByText(/task tracker/i)).toBeInTheDocument();
});
