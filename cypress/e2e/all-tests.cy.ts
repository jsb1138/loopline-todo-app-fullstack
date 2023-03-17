/// <reference types="cypress" />

describe("Visual tests", () => {
  it("loads the page", () => {
    cy.visit("http://localhost:3001/");
  });

  it("displays the h1", () => {
    cy.visit("http://localhost:3001/");
    cy.get("h1");
  });

  it("h1 should say 'To Do List", () => {
    cy.visit("http://localhost:3001/");
    cy.get("h1").contains("To Do List");
  });

  it("should display an element with class 'todo-form'", () => {
    cy.visit("http://localhost:3001/");
    cy.get("form").should("have.id", "todo-form");
  });

  it("should display two text inputs in the todo-form", () => {
    cy.visit("http://localhost:3001/");
    cy.get("form").find("input").should("have.length", 2);
  });

  it("clicking the submit button with no input should display text which says 'Please fill in both inputs!' ", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".add-btn").click();
    cy.get("p").contains("Please fill in both inputs!");
  });

  it("should make visible the text 'Please fill in both inputs!' after clicking the add-btn button", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".add-btn").click();
    cy.get("p").contains("Please fill in both inputs!").should("be.visible");
  });

  it("should not have visible text that says 'Please fill in both inputs!' without clicking the add-btn button", () => {
    cy.visit("http://localhost:3001/");
    cy.get("p")
      .contains("Please fill in both inputs!")
      .should("not.be.visible");
  });

  it("should display the todo-list section", () => {
    cy.visit("http://localhost:3001/");
    cy.get("section").should("have.class", "todo-list");
  });

  it("should display four todos with class 'todo-content' inside the todo-list section", () => {
    cy.visit("http://localhost:3001/");
    cy.get("section").find(".todo-content").should("have.length", 4);
  });

  it("should display only 8 buttons inside the todo-list section", () => {
    cy.visit("http://localhost:3001/");
    cy.get("section").find("button").should("have.length", 8);
  });
});

describe("Interaction tests", () => {
  it("should remove one element of class 'todo' after pressing button with id 'delete-btn' ", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").should("have.length", 4);
    cy.get("#delete-btn").click();
    cy.get(".todo").should("have.length", 3);
  });

  it("should remove all elements of class 'todo' after pressing all buttons with id 'delete-btn' ", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").should("have.length", 4);
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get(".todo").should("have.length", 0);
  });

  it("should delete all preset todos, and add a new one when add button is clicked", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").should("have.length", 4);
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get(".todo").should("have.length", 0);
    cy.get("#title").type("this is a new todo");
    cy.get("#todo-desc").type("and here is a todo description");
    cy.get("#add-btn").click();
    cy.get(".todo").should("have.length", 1);
    cy.get(".todo").contains("this is a new todo");
    cy.get(".todo").contains("and here is a todo description");
  });

  it("should delete all preset todos, and add a new one, then edit it", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").should("have.length", 4);
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get(".todo").should("have.length", 0);
    cy.get("#title").type("this is a new todo");
    cy.get("#todo-desc").type("and here is a todo description");
    cy.get("#add-btn").click();
    cy.get(".todo").should("have.length", 1);
    cy.get(".todo").contains("this is a new todo");
    cy.get(".todo").contains("and here is a todo description");
    cy.get("#edit-btn").click();
    cy.get("#title-edit").clear().type("this was edited");
    cy.get("#desc-edit").clear().type("also edited {enter}");
    cy.get(".todo").contains("this was edited");
    cy.get(".todo").contains("also edited");
  });

  it("should delete all preset todos, add a new one, then edit it, and add another new one", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").should("have.length", 4);
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get("#delete-btn").click();
    cy.get(".todo").should("have.length", 0);
    cy.get("#title").type("this is a new todo");
    cy.get("#todo-desc").type("and here is a todo description");
    cy.get("#add-btn").click();
    cy.get(".todo").should("have.length", 1);
    cy.get(".todo").contains("this is a new todo");
    cy.get(".todo").contains("and here is a todo description");
    cy.get("#edit-btn").click();
    cy.get("#title-edit").clear().type("this was edited");
    cy.get("#desc-edit").clear().type("also edited {enter}");
    cy.get(".todo").contains("this was edited");
    cy.get(".todo").contains("also edited");
    cy.get("#title").type("this is a new todo");
    cy.get("#todo-desc").type("and here is a todo description");
    cy.get("#add-btn").click();
    cy.get(".todo").should("have.length", 2);
    cy.get(".todo").contains("this is a new todo");
    cy.get(".todo").contains("and here is a todo description");
  });

  it("should not reveal the batch delete button", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".batch-del-btn").should("not.be.visible");
  });

  it("should reveal the batch delete button after ctrl-clicking a todo", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").contains("is a to-do").click({ ctrlKey: true });
    cy.get(".batch-del-btn").should("be.visible");
  });

  it("should delete all todos after ctrl-clicking all of them and clicking the batch delete button", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").contains("is a to-do").click({ ctrlKey: true });
    cy.get(".todo").contains("done with").click({ ctrlKey: true });
    cy.get(".todo").contains("can edit").click({ ctrlKey: true });
    cy.get(".todo").contains("can even").click({ ctrlKey: true });
    cy.get(".batch-del-btn").click();
    cy.get(".todo").should("not.exist");
  });

  it("should delete all but one todos after ctrl-clicking three of them and clicking the batch delete button", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").contains("done with").click({ ctrlKey: true });
    cy.get(".todo").contains("can edit").click({ ctrlKey: true });
    cy.get(".todo").contains("can even").click({ ctrlKey: true });
    cy.get(".batch-del-btn").click();
    cy.get(".todo").should("have.length", 1);
  });

  it("should batch delete three todos and edit the remainder and the todo should persist after refreshing the page", () => {
    cy.visit("http://localhost:3001/");
    cy.get(".todo").contains("done with").click({ ctrlKey: true });
    cy.get(".todo").contains("can edit").click({ ctrlKey: true });
    cy.get(".todo").contains("can even").click({ ctrlKey: true });
    cy.get(".batch-del-btn").click();
    cy.get(".todo").should("have.length", 1);
    cy.get("#edit-btn").click();
    cy.get("#title-edit").clear().type("This is the final test!");
    cy.get("#desc-edit")
      .clear()
      .type("End to end tests successfully done. {enter}");
    cy.reload();
    cy.get(".todo").contains("the final test!");
    cy.get(".todo").contains("End to end tests successfully done.");
  });
});

export {};
