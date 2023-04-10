describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Ajay Thanki",
      username: "akthanki",
      password: "801722",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user);
    cy.visit("");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2023"
    );
  });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });
  it("user can login", function () {
    cy.contains("log in").click();
    cy.login({ username: "akthanki", password: "801722" });

    cy.contains("Ajay Thanki logged in");
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "akthanki", password: "801722" });
    });
    it("a new note can be created", function () {
      cy.createNote({ content: "a note created by cypress", important: true });
      cy.contains("a note created by cypress");
    });
    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({ content: "another note cypress", important: true });
      });

      it("it can be made not important", function () {
        cy.contains("another note cypress")
          .parent()
          .contains("make not important")
          .click();

        cy.contains("another note cypress").parent().contains("make important");
      });
    });
    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note")
          .parent()
          .find("button")
          .as("theButton")
          .click();
        // cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    // cy.login({ username: "akthanki", password: "wrong" });

    cy.get("#username").type("akthanki");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get(".error")
      .should("contain", "wrong credentials")
      .and("have.css", "color", "rgb(255, 0, 0)")
      .and("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Ajay Thanki logged in");
  });
  it("then example", function () {
    cy.get("button").then((buttons) => {
      console.log("number of buttons", buttons.length);
      cy.wrap(buttons[0]).click();
    });
  });
});