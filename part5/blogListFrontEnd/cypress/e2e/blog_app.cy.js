/*
Exercises 5.17.-5.23.
5.17: bloglist end to end testing, step1
5.18: bloglist end to end testing, step2
5.19: bloglist end to end testing, step3
5.20: bloglist end to end testing, step4
5.21: bloglist end to end testing, step5
5.22: bloglist end to end testing, step6
5.23: bloglist end to end testing, step7
*/

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.visit("");

    const user = {
      name: "Ajay Thanki",
      username: "akthanki",
      password: "801722",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.get("#username");
    cy.get("#password");
    cy.get("#btnLogin");
  });
  describe("Login", () => {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("akthanki");
      cy.get("#password").type("801722");
      cy.get("#btnLogin").click();
      cy.contains("Ajay Thanki logged in");
      cy.get("html")
        .should("not.contain", "username")
        .should("not.contain", "password");
    });
    it("fails with wrong credentials", function () {
      cy.get("#username").type("akthanki");
      cy.get("#password").type("wrong");
      cy.get("#btnLogin").click();
      cy.get("#notify")
        .should("contain", "invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
      cy.get("html").should("not.contain", "Ajay Thanki logged in");
    });
  });
  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "akthanki", password: "801722" });
    });

    it("A blog can be created", function () {
      const blog = {
        title:"test title",
        author: "test author",
        url: "test-url.com"
      };
      cy.contains("New Blog").click();

      cy.get("#blog-title-input").type(blog.title);
      cy.get("#blog-author-input").type(blog.author);
      cy.get("#blog-url-input").type(blog.url);
      cy.get("#btnCreate").click();

      cy.get("html")
        .should("contain", blog.title)
        .should("contain", blog.author)
        .should("contain", blog.url);
    });
    it("A blog can be liked", function () {
      const blog = {
        title:"test title",
        author: "test author",
        url: "test-url.com",
        likes: 5
      };
      cy.createBlog(blog);
      cy.get("html")
        .should("contain", blog.title)
        .should("contain", blog.author)
        .should("contain", blog.url);
      cy.contains("view").click();
      cy.get(".blog-likes").contains("5");
      cy.get("#btnLike").click();
      cy.get(".blog-likes").contains("6");
      cy.get("#btnLike").click();
      cy.get(".blog-likes").contains("7");
    });
    it("A blog can be deleted by authorized user", function () {
      const blog = {
        title:"test title2",
        author: "test author2",
        url: "test-url.com2",
        likes: 5
      };
      cy.createBlog(blog);
      cy.contains("view").click();
      cy.contains("remove").click();
    });
    it("Only the creator can see the delete/remove button of a blog", function () {
      const blog = {
        title:"test title3",
        author: "test author3",
        url: "test-url.com3",
        likes: 2
      };
      cy.createBlog(blog);
      cy.contains("Log out").click();
      const user = {
        name: "Ajay Thanki",
        username: "thanki",
        password: "801722",
      };
      cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
      cy.login({ username: "thanki", password: "801722" });

      cy.contains("view").click();
      cy.should("not.contain","remove");
    });
    it("blogs are ordered according to likes", function () {
      const blogs = [
        {
          title:"blog with 5 likes",
          author: "ajay thanki",
          url: "test-url.com",
          likes: 5,
        },
        {
          title:"blog with 15 likes",
          author: "ajay thanki",
          url: "test-url.com",
          likes: 15,
        },
        {
          title:"blog with 10 likes",
          author: "ajay thanki",
          url: "test-url.com",
          likes: 10,
        },
        {
          title:"blog with 25 likes",
          author: "ajay thanki",
          url: "test-url.com",
          likes: 25,
        },
      ];
      blogs.forEach(blog => {
        cy.createBlog(blog);
      });
      cy.get(".blog")
        .eq(0)
        .should("contain", "blog with 25 likes");
      cy.get(".blog")
        .eq(1)
        .should("contain", "blog with 15 likes");
      cy.get(".blog")
        .eq(2)
        .should("contain", "blog with 10 likes");
      cy.get(".blog")
        .eq(3)
        .should("contain", "blog with 5 likes");
    });
  });
});
