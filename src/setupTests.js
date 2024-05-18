// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import Modal from "react-modal";

// Create a root element for modal
const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

// Set the app element for react-modal
Modal.setAppElement("#root");
