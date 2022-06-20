async function cargarDatos() {
  const url = "https://dataserverdaw.herokuapp.com/escritores/xml";

  try {
    let response = await fetch(url);
    let data = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");

    const writers = xml.querySelectorAll("escritor");
    const container = document.querySelector("select");

    writers.forEach((writer) => {
      let name = writer.querySelector("nombre").textContent;
      let id = writer.querySelector("id").textContent;

      container.innerHTML += `
      <option value="${id}">
        ${name}
      </option>`;
    });
  } catch (error) {
    console.log(error);
  }
}

const cleanContainer = (container) => {
  container.innerHTML = "";
};

async function setWriterContent() {
  const url = "https://dataserverdaw.herokuapp.com/escritores/frases";

  const phrasesContainer = document.querySelector("#frases");

  const options = document.querySelector("select").options;
  const currentOption = options[options.selectedIndex];
  const currentWriterID = currentOption.value;
  const currentWriterName = currentOption.textContent;

  try {
    let response = await fetch(url);
    let data = await response.json();

    let frases = data["frases"];

    cleanContainer(phrasesContainer);

    frases.forEach((frase) => {
      let writerID = frase["id_autor"];
      let text = frase["texto"];
      if (writerID == currentWriterID) {
        phrasesContainer.innerHTML += `
          <div class="col-lg-3">
            <div class="test-inner ">
              <div class="test-author-thumb d-flex">
                <div class="test-author-info">
                  <h4>${currentWriterName}</h4>
                </div>
              </div>
              <span>${text}</span>
              <i class="fa fa-quote-right"></i>
            </div>
          </div>`;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  cargarDatos();

  const selectContainer = document.querySelector("select");
  selectContainer.addEventListener("change", () => {
    setWriterContent();
  });
});
