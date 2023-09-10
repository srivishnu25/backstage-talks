const cards = document.querySelectorAll(".cover");
const cardsLink = document.querySelector(".cards-link");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const { isIntersecting, target } = entry;
      if (isIntersecting) {
        document.body.style.backgroundColor = target.dataset.bgcolor;
      }
      target.classList.toggle("active", isIntersecting);

      [...cardsLink.children].forEach((link, index) => {
        link.classList.toggle("active", index === +target.dataset.index);
      });
    });
  },
  {
    root:
      document.body.clientWidth <= 600
        ? document.body
        : document.querySelector(".wrapper"),
    threshold: 0.8,
  }
);

cards.forEach((card) => {
  observer.observe(card);
});

const resizeObserver = new ResizeObserver((entries) => {
  const { borderBoxSize } = entries[0] ?? {};
  const { inlineSize } = borderBoxSize[0] ?? {};
  const aboutCompany = document.querySelector(".about-company");
  const wrapper = document.querySelector(".wrapper-view");
  const footer = document.querySelector("footer");

  if (inlineSize <= 992) {
    console.log(aboutCompany, footer, wrapper);
    wrapper.appendChild(aboutCompany);
  } else {
    footer.appendChild(aboutCompany);
  }
});

resizeObserver.observe(document.body);
