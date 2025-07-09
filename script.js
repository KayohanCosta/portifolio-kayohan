// Inicializar AOS (Animate on Scroll)
AOS.init({
  duration: 1000,
  once: true,
})

// Toggle Theme
const themeSwitch = document.querySelector(".ui-switch input")

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)

  // Atualizar estado do switch
  themeSwitch.checked = theme === "dark"
}

// Verificar preferência salva ou do sistema
const savedTheme = localStorage.getItem("theme")
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

// Definir tema inicial
if (savedTheme) {
  setTheme(savedTheme)
} else if (prefersDarkScheme.matches) {
  setTheme("dark")
} else {
  setTheme("light")
}

// Event listener para o switch de tema
themeSwitch.addEventListener("change", () => {
  setTheme(themeSwitch.checked ? "dark" : "light")
})

// Event listener para mudanças na preferência do sistema
prefersDarkScheme.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light")
  }
})

// Smooth Scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  })
})

// Formulário de Newsletter com Netlify Forms
const newsletterForm = document.querySelector("form[name='newsletter']");
const responseMessage = document.getElementById("newsletter-response-message");

newsletterForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(newsletterForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(() => {
    responseMessage.textContent = "Inscrição realizada com sucesso!";
    responseMessage.style.color = "green";
    newsletterForm.reset();
  })
  .catch((error) => {
    responseMessage.textContent = "Erro ao enviar. Tente novamente.";
    responseMessage.style.color = "red";
    console.error(error);
  });
});



// Animação de digitação para o título
const titleElement = document.querySelector(".hero-content h1")
const originalText = titleElement.textContent
titleElement.textContent = ""

function typeWriter(text, element, i = 0) {
  if (i < text.length) {
    element.textContent += text.charAt(i)
    setTimeout(() => typeWriter(text, element, i + 1), 100)
  }
}

// Iniciar animação quando a página carregar
window.addEventListener("load", () => {
  typeWriter(originalText, titleElement)
})

// Adicionar classe active no link da navegação baseado na seção visível
const sections = document.querySelectorAll("section")
const navLinks = document.querySelectorAll(".nav-links a")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active")
    }
  })
})

