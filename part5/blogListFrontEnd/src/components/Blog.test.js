/*
Exercises 5.13.-5.16.
5.13: Blog list tests, step1
5.14: Blog list tests, step2
5.15: Blog list tests, step3
*/

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;
  let mockHandler, mockHandler2;
  beforeEach(() => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      url: true,
      likes: 5,
      author: "ajay thanki",
      user: {
        username: "akthanki",
        name: "Ajay Thanki",
      },
    };
    mockHandler = jest.fn();
    mockHandler2 = jest.fn();

    container = render(
      <Blog blog={blog} handleLike={mockHandler} handleDelete={mockHandler2} />
    ).container;
  });
  test("renders blog title and other children are not displayed", () => {

    const blogTitle = container.querySelector(".blog .blog-title");
    expect(blogTitle).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
    const div = container.querySelector(".blog .blog-content").parentElement;
    // screen.debug(div);
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, blog's URL and number of likes are shown", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".blog-content");
    expect(div).not.toHaveStyle("display: none");
  });
  test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("like");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);

  });

});
