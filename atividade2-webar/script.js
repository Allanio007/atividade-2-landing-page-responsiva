const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const cards = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);

cards.forEach((card) => observer.observe(card));

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const nome = String(formData.get("nome") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const mensagem = String(formData.get("mensagem") || "").trim();

    if (!nome || !email || !mensagem) {
      formStatus.textContent = "Preencha todos os campos antes de enviar.";
      formStatus.style.color = "#b42318";
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      formStatus.textContent = "Informe um email valido.";
      formStatus.style.color = "#b42318";
      return;
    }

    formStatus.textContent = "Mensagem enviada com sucesso.";
    formStatus.style.color = "#067647";
    contactForm.reset();
  });
}
