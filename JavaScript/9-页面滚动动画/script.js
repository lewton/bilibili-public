const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active");
    }
  });
});

const hiddenElements = document.querySelectorAll(".flag");
hiddenElements.forEach((el) => observer.observe(el));
