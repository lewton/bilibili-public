export const activeIntersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(entry.target.dataset.active || "active");
      } else {
        entry.target.classList.remove(entry.target.dataset.active || "active");
      }
    });
  }
);
