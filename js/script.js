// Simple script to populate projects and wire small UI interactions
const projects = [
  {
    title: "Resume & Cover Letter App",
    desc: "An app that helps users create tailored resumes and cover letters quickly, with templates, export and personalization features.",
    link: "https://letter-perfect-resumes.vercel.app/",
  },
  {
    title: "Business Website",
    desc: "A responsive business website template focused on conversion and clean branding, built with modern web practices.",
    link: "https://web-test-bice.vercel.app/",
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

    const title = document.createElement("h3");
    title.textContent = p.title;

    const desc = document.createElement("p");
    desc.textContent = p.desc;

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const view = document.createElement("a");
    view.href = p.link || "#";
    view.target = "_blank";
    view.rel = "noopener";
    view.className = "view-link";
    view.textContent = "View project →";
    actions.appendChild(view);

    // show a small Vercel badge if the link points to vercel.app
    if (p.link && p.link.includes("vercel.app")) {
      const badge = document.createElement("a");
      badge.href = p.link;
      badge.target = "_blank";
      badge.rel = "noopener noreferrer";
      badge.className = "vercel-badge";
      badge.setAttribute("aria-label", "Open deployment on Vercel");
      // simple triangle + label
      badge.innerHTML =
        '<span class="vercel-triangle" aria-hidden="true">▲</span><span class="vercel-text">Vercel</span>';
      actions.appendChild(badge);

      // GitHub badge: link to repo if provided, otherwise show a 'Private' badge that opens mail
      const githubBadge = document.createElement("a");
      if (p.repo) {
        githubBadge.href = p.repo;
        githubBadge.setAttribute("aria-label", "Open repository on GitHub");
        githubBadge.target = "_blank";
        githubBadge.rel = "noopener noreferrer";
        githubBadge.innerHTML =
          '<span class="gh-icon" aria-hidden="true">🐙</span><span class="gh-text">GitHub</span>';
      } else {
        githubBadge.href = "mailto:sharlenepillay14@gmail.com";
        githubBadge.setAttribute(
          "aria-label",
          "Private repository — request access"
        );
        githubBadge.innerHTML =
          '<span class="gh-icon" aria-hidden="true">🔒</span><span class="gh-text">Private</span>';
      }
      githubBadge.className = "github-badge";
      actions.appendChild(githubBadge);

      // VSCode badge: link to the live demo if present (visual indicator)
      const vscBadge = document.createElement("a");
      vscBadge.className = "vscode-badge";
      if (p.link) {
        vscBadge.href = p.link;
        vscBadge.target = "_blank";
        vscBadge.rel = "noopener noreferrer";
        vscBadge.setAttribute(
          "aria-label",
          "Open project demo (open in browser)"
        );
        vscBadge.innerHTML =
          '<span class="vsc-icon" aria-hidden="true">🧑‍💻</span><span class="vsc-text">VSCode</span>';
      } else {
        vscBadge.href = "mailto:sharlenepillay14@gmail.com";
        vscBadge.setAttribute(
          "aria-label",
          "No demo available — request access"
        );
        vscBadge.innerHTML =
          '<span class="vsc-icon" aria-hidden="true">🧑‍💻</span><span class="vsc-text">VSCode</span>';
      }
      actions.appendChild(vscBadge);
    }

    card.appendChild(title);
    card.appendChild(desc);
    card.appendChild(actions);
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
