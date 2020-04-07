import React from "react";
import { render } from "@testing-library/react";
import ItemList from "./components/item-list";

test("renders learn react link", () => {
  const { getByText } = render(<ItemList />);
  const linkElement = getByText(/one/i);
  expect(linkElement).toBeInTheDocument();
});
