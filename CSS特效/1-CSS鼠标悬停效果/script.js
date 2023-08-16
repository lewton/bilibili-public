let cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.pageX}px`;
  cursor.style.top = `${e.pageY}px`;
});

document.querySelectorAll("ul a").forEach((text) => {
  text.innerHTML = text.innerText
    .split("")
    .map(
      (words, i) => `<span style="transition-delay:${i * 30}ms">${words}</span>`
    )
    .join("");
});
