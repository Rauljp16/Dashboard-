import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import styled from "styled-components";
import Button from "./components/Button";

test("test button green", () => {
  render(<Button color="green" />);
  screen.debug();
  const button = screen.getByText("Click");
  expect(button).toHaveStyle("border-color: #55c255");
});

test("test button red", () => {
  render(<Button color="red" />);
  screen.debug();
  const button = screen.getByText("Click");
  expect(button).toHaveStyle("border-color: #dc3545");
});
