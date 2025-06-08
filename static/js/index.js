const themes = {
  light: {
    "--bg": "#fff",
    "--text-color": "#000",
    "--primary": "rgb(4, 76, 128)",
    "--success": "#00d390",
    "--warning": "#fcb700",
    "--error": "#ff637d",
  },
  dark: {
    "--bg": "#121212",
    "--text-color": "#fff",
    "--primary": "rgb(4, 76, 128)",
    "--success": "#00d390",
    "--warning": "#fcb700",
    "--error": "#ff637d",
  },
  solarized: {
    "--bg": "#fdf6e3",
    "--text-color": "#657b83",
    "--primary": "#b58900",
    "--success": "#00d390",
    "--warning": "#fcb700",
    "--error": "#ff637d",
  },
};

function setTheme(themeName) {
  const theme = themes[themeName];
  if (!theme) return;

  Object.keys(theme).forEach((key) => {
    document.documentElement.style.setProperty(key, theme[key]);
  });

  localStorage.setItem("theme", themeName);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);
}

function toggleMenu() {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  createCards();
  const carousel = document.querySelector(".carousel");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  nextBtn.addEventListener("click", () => updateCard(1));
  prevBtn.addEventListener("click", () => updateCard(-1));

  let startX;
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) updateCard(1);
    if (endX - startX > 50) updateCard(-1);
  });

  let autoSlideActive = true;
  setInterval(() => {
    if (autoSlideActive) {
      updateCard(1);
    }
  }, 5000);

  const toggleAutoSlide = (state) => {
    autoSlideActive = state;
  };

  [carousel, nextBtn, prevBtn].forEach((element) => {
    element.addEventListener("mouseover", () => toggleAutoSlide(false));
    element.addEventListener("mouseleave", () => toggleAutoSlide(true));
  });
});

const eventos = [
  {
    id: 1,
    title: "Semana do Software 2025",
    date: "12/05",
    time: "10:00",
    location: "Salão de Eventos",
    type: "tech",
    description:
      "Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 2,
    title: "Workshop de IoT",
    date: "12/01",
    time: "08:00",
    location: "Laboratório CS&I",
    type: "tech",
    description:
      "Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 3,
    title: "Festa dos Alunos 2025",
    date: "18/05",
    time: "19:00",
    location: "Área Esportiva do Inatel",
    type: "cultural",
    description:
      "Venha comemorar a melhor Festa dos Alunos de todos os tempos!",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400",
  },
  {
    id: 4,
    title: "Feira de Oportunidades",
    date: "04/05",
    time: "10:00",
    location: "Salão de Eventos",
    type: "academic",
    description:
      "Venha conhecer empresas e projetos com destaque na área da engenharia.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400",
  },
];

function createCards() {
  const carousel = document.querySelector(".carousel");
  eventos.forEach((event) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class="lg:flex">
      <img src="${event.image}" alt="${event.title}">
      <div class="info flex flex-col justify-center">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <p>
            <span class="material-icons icon">event</span>${event.date} às ${event.time} 
            <span class="material-icons icon">pin_drop</span> ${event.location}
          </p>
      </div>
    </div>
      
    `;
    carousel.appendChild(card);
  });
}

let index = 0;

function updateCard(direction) {
  index = (index + direction + eventos.length) % eventos.length;
  updateCarousel();
}

function updateCarousel() {
  const carousel = document.querySelector(".carousel");
  carousel.style.transform = `translateX(-${index * 100}%)`;
}
