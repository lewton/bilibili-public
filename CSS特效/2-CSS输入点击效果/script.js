let label = document.querySelector("label");

label.innerHTML = label.innerText
  .split("")
  .map(
    (words, i) => `<span style="transition-delay:${i * 30}ms">${words}</span>`
  )
  .join("");
