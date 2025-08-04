import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "../src/HomeScreen";

test("HomeScreen renders correctly", () => {
  const { getByText } = render(<HomeScreen name="John" />);
  expect(getByText("Welcome John to the Home Screen!")).toBeTruthy();
});
test("HomeScreen renders without name", () => {
  const { getByText } = render(<HomeScreen />);
  expect(getByText("Welcome  to the Home Screen!")).toBeTruthy();
});
test("HomeScreen styles are applied correctly", () => {
  const { getByText } = render(<HomeScreen name="John" />);
  const textElement = getByText("Welcome John to the Home Screen!");
  expect(textElement.props.style).toEqual({fontSize: 20, color: "#333"});
});
export {};