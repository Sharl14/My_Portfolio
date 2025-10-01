// Simple script to populate projects and wire small UI interactions
const projects = [
  {
    title: "Project Alpha",
    desc: "A fast, accessible web app that helps users track tasks and productivity.",
    link: "#",
  },
  {
    title: "Design System Kit",
    desc: "A reusable component library and tokens for consistent UI across products.",
    link: "#",
  },
  {
    title: "Portfolio Builder",
    desc: "This very site — a minimal, responsive portfolio template.",
    link: "#",
  },
  {
    title: "MERN Task Manager",
    desc: "A full-stack MERN application for creating, assigning and tracking tasks with authentication and a REST API.",
    link: "#",
  },
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";
  projects.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><a href="${p.link}" target="_blank" rel="noopener">View project →</a>`;
    grid.appendChild(card);
  });
}

// small helpers
document.addEventListener("DOMContentLoaded", () => {
  // Ensure stylesheet is loaded — helpful if the <link> was accidentally removed or blocked
  try {
    const cssHref = "css/styles.css";
    const existing = document.querySelector(`link[href="${cssHref}"]`);
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssHref;
      document.head.appendChild(link);
      console.log("styles.css was missing; dynamically injected.");
    } else {
      console.log("styles.css is present.");
    }
  } catch (err) {
    console.warn("Error while checking/injecting stylesheet", err);
  }

  renderProjects();
  document.getElementById("year").textContent = new Date().getFullYear();
  // Add reveal animations using IntersectionObserver
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Observe sections and hero
  document
    .querySelectorAll(".section, .hero-text, .hero-avatar, .card")
    .forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });

  // Animate skill bars when their container is visible
  const skillsContainer = document.querySelector(".skill-bars");
  if (skillsContainer) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".bar[data-percent]").forEach((bar) => {
              const pct = Number(bar.getAttribute("data-percent")) || 0;
              const inner = bar.querySelector(".bar-inner");
              // use transform scaleX for smoother animation
              inner.style.transform = `scaleX(${pct / 100})`;
              inner.setAttribute("aria-valuenow", pct);
            });
            skillsObserver.unobserve(skillsContainer);
          }
        });
      },
      { threshold: 0.18 }
    );
    skillsObserver.observe(skillsContainer);
  }
  // nav toggle for mobile
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  // update email link placeholder if user customizes via prompt (optional)
  const email = "sharlenepillay14@gmail.com";
  const emailLink = document.getElementById("email-link");
  if (emailLink) emailLink.href = `mailto:${email}`;

  // Reach-out form handling
  const reachForm = document.getElementById("reach-form");
  const formStatus = document.getElementById("form-status");
  if (reachForm && formStatus) {
    reachForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      formStatus.textContent = "Sending...";
      const action = reachForm.action;
      if (action.includes("YOUR_FORM_ID")) {
        formStatus.innerHTML =
          'Form not configured. Please email me directly at <a href="mailto:' +
          email +
          '">' +
          email +
          "</a>";
        return;
      }
      try {
        const formData = new FormData(reachForm);
        const res = await fetch(action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });
        if (res.ok) {
          reachForm.reset();
          formStatus.textContent =
            "Thanks! I will get back to you within 24–48 hours.";
        } else {
          const data = await res.json();
          formStatus.textContent =
            data.error ||
            "An error occurred — please try again or email me directly.";
        }
      } catch (err) {
        formStatus.textContent =
          "Network error — please email me directly at " + email;
      }
    });
  }
});
