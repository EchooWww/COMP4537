import userMessages from "../lang/messages/en/user.js";

const noteContainer = document.querySelector("#noteContainer");
const bodyId = document.querySelector("body").id;
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Disclosure: I used ChatGPT here to help me organize the logic for creating the Note class
class Note {
  constructor(content = "") {
    this.content = content;
  }

  render(index) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = this.content;
    textarea.addEventListener("input", (e) => {
      notes[index].content = e.target.value;
      saveNotes();
    });

    noteDiv.appendChild(textarea);

    if (bodyId === "writer-body") {
      const removeButton = new Button(userMessages.writer.removeButton, () => {
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
      });
      noteDiv.appendChild(removeButton.render("removeButton"));
    }

    return noteDiv;
  }
}

class Button {
  constructor(label, onClick) {
    this.label = label;
    this.onClick = onClick;
  }

  render(id = "") {
    const button = document.createElement("button");
    button.textContent = this.label;
    if (id !== "") button.id = id;
    button.addEventListener("click", this.onClick);
    return button;
  }
}
const backButton = new Button(userMessages.shared.backButton, () => {
  window.location.href = "index.html";
});
document.addEventListener("DOMContentLoaded", () => {
  if (bodyId === "home-body") {
    renderIndex();
  } else if (bodyId === "writer-body") {
    renderWriter();
  } else if (bodyId === "reader-body") {
    renderReader();
  }
});

function renderIndex() {
  document.querySelector("#mainHeading").innerHTML =
    userMessages.home.mainHeading;
  document.querySelector("#subHeading").innerHTML =
    userMessages.home.subHeading;
  const links = document.querySelector("#links");
  const readerButton = new Button(userMessages.home.readerLinkText, () => {
    window.location.href = "reader.html";
  });
  const writerButton = new Button(userMessages.home.writerLinkText, () => {
    window.location.href = "writer.html";
  });
  links.appendChild(writerButton.render());
  links.appendChild(readerButton.render("reader"));
}

function renderWriter() {
  document.querySelector("#timestamp").innerHTML = `${
    userMessages.writer.savedText
  }: ${new Date().toLocaleTimeString()}`;
  renderNotes();

  const addButton = new Button(userMessages.writer.addButton, () => {
    notes.push(new Note());
    renderNotes();
    saveNotes();
  });
  document.querySelector("#buttonContainer").appendChild(addButton.render());

  document
    .querySelector("#buttonContainer")
    .appendChild(backButton.render("backButton"));
}

function renderReader() {
  notes = JSON.parse(localStorage.getItem("notes")) || [];
  renderNotes();
  updateTimestamp();
  setInterval(() => {
    notes = JSON.parse(localStorage.getItem("notes")) || [];
    renderNotes();
    updateTimestamp();
  }, 2000);

  document
    .querySelector("#buttonContainer")
    .appendChild(backButton.render("backButton"));
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  document.querySelector("#timestamp").textContent = `${
    userMessages.writer.savedText
  }: ${new Date().toLocaleTimeString()}`;
}

function renderNotes() {
  noteContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteInstance = new Note(note.content);
    noteContainer.appendChild(noteInstance.render(index));
  });
}

function updateTimestamp() {
  document.querySelector("#timestamp").textContent = `${
    userMessages.reader.updateText
  }: ${new Date().toLocaleTimeString()}`;
}
