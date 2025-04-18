import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { waitFor } from "@testing-library/react";

test("renders Task Tracker heading", () => {
	render(<App />);
	expect(screen.getByText(/task tracker/i)).toBeInTheDocument();
});

test("creates and deletes a task", async () => {
	render(<App />);

	const input = screen.getByPlaceholderText(/enter a task/i);
	fireEvent.change(input, { target: { value: "Buy milk" } });
	fireEvent.click(screen.getByText(/add task/i));

	const taskItem = await screen.findByText("Buy milk");
	expect(taskItem).toBeInTheDocument();

	const deleteButton = screen.getByText("Delete");
	fireEvent.click(deleteButton);

	await waitFor(() => {
		expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
	});
});
