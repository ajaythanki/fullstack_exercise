// 5.16: Blog list tests, step4

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("<BlogForm /> updates parent state and calls onSubmit", async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm handleCreateBlog={createBlog} />);

    const titleInput = container.querySelector("#blog-title-input");
    const authorInput = container.querySelector("#blog-author-input");
    const urlInput = container.querySelector("#blog-url-input");
    const sendButton = screen.getByText("Create");

    await user.type(titleInput, "test title...");
    await user.type(authorInput, "test author...");
    await user.type(urlInput, "https://www.test-url.com");
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("test title...");
    expect(createBlog.mock.calls[0][0].author).toBe("test author...");
    expect(createBlog.mock.calls[0][0].url).toBe("https://www.test-url.com");
  });

});