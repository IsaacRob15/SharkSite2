const projects = [
  {
    title: "Site de receitas",
    description: "Catálogo de receitas com busca e filtros por ingrediente.",
    category: "web",
    url: "#",
  },
  {
    title: "Identidade visual",
    description: "Logo, paleta de cores e tipografia para um pequeno negócio.",
    category: "design",
    url: "#",
  },
  {
    title: "Lista de tarefas",
    description: "Aplicativo de tarefas que salva os dados no navegador.",
    category: "web",
    url: "#",
  },
];

const THEME_KEY = "theme";

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Sem armazenamento disponível: o tema vale só para esta visita.
  }
}

function currentTheme() {
  const explicit = document.documentElement.dataset.theme;
  if (explicit) return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setupTheme() {
  const stored = readStoredTheme();
  if (stored === "light" || stored === "dark") {
    document.documentElement.dataset.theme = stored;
  }

  document.querySelector(".theme-toggle").addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storeTheme(next);
  });
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  links.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function renderProjects(filter) {
  const list = document.getElementById("project-list");
  const visible = filter === "todos" ? projects : projects.filter((p) => p.category === filter);

  list.replaceChildren(
    ...visible.map((project) => {
      const item = document.createElement("li");
      item.className = "project";

      const tag = document.createElement("span");
      tag.className = "project-tag";
      tag.textContent = project.category;

      const title = document.createElement("h3");
      title.textContent = project.title;

      const description = document.createElement("p");
      description.textContent = project.description;

      const link = document.createElement("a");
      link.href = project.url;
      link.textContent = "Ver projeto";

      item.append(tag, title, description, link);
      return item;
    }),
  );
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => {
        const active = b === button;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      renderProjects(button.dataset.filter);
    });
  });

  renderProjects("todos");
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      status.textContent = "Preencha nome, um e-mail válido e a mensagem.";
      status.classList.add("is-error");
      form.querySelector(":invalid").focus();
      return;
    }

    // Sem servidor: abre o cliente de e-mail do visitante com a mensagem pronta.
    const data = new FormData(form);
    const subject = encodeURIComponent(`Contato pelo portfólio: ${data.get("nome")}`);
    const body = encodeURIComponent(`${data.get("mensagem")}\n\n${data.get("nome")} <${data.get("email")}>`);
    window.location.href = `mailto:seu-email@exemplo.com?subject=${subject}&body=${body}`;

    status.textContent = "Abrindo seu aplicativo de e-mail…";
    status.classList.remove("is-error");
    form.reset();
  });
}

document.getElementById("ano").textContent = new Date().getFullYear();
setupTheme();
setupNav();
setupFilters();
setupContactForm();
