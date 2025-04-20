import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import Header from "./components/Header.jsx";
import { waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

test("renders Task Tracker heading", () => {
	render(
		<BrowserRouter>
			<Header />
		</BrowserRouter>
	);
	expect(screen.getByText(/task tracker/i)).toBeInTheDocument();
});
