import "../../style/alert.css";

class MessageView extends HTMLElement {
  constructor() {
    super();
    let container = document.createElement("div");
    container.id = "container";
    container.innerText = "Teste";
    this.appendChild(container);
  }
}

customElements.define("bomb-message", MessageView);

export default MessageView;
