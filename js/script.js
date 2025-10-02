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
      // vercel SVG icon + label
      badge.innerHTML =
        '<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 3l10 17H2L12 3z"/></svg><span class="vercel-text" style="margin-left:0.45rem">Vercel</span>';
      // stagger entrance for badges
      badge.style.transitionDelay = "120ms";
      actions.appendChild(badge);

      // GitHub badge: link to repo if provided, otherwise show a 'Private' badge that opens mail
      const githubBadge = document.createElement("a");
      if (p.repo) {
        githubBadge.href = p.repo;
        githubBadge.setAttribute("aria-label", "Open repository on GitHub");
        githubBadge.target = "_blank";
        githubBadge.rel = "noopener noreferrer";
        githubBadge.innerHTML =
          '<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12 2C7.03 2 3 6.03 3 11c0 4 2.53 7.4 6.04 8.6.44.08.6-.2.6-.44 0-.22-.01-.8-.01-1.57-2.45.53-2.96-.97-2.96-.97-.4-1.02-.98-1.29-.98-1.29-.8-.55.06-.54.06-.54.9.06 1.38.93 1.38.93.78 1.34 2.05.95 2.55.73.08-.57.31-.95.56-1.17-1.96-.22-4.02-.98-4.02-4.34 0-.96.34-1.74.9-2.35-.09-.22-.39-1.12.09-2.33 0 0 .74-.24 2.44.9.7-.2 1.45-.3 2.2-.3.75 0 1.5.1 2.2.3 1.7-1.14 2.44-.9 2.44-.9.48 1.21.18 2.11.09 2.33.56.61.9 1.39.9 2.35 0 3.36-2.06 4.12-4.02 4.34.32.28.6.82.6 1.66 0 1.2-.01 2.17-.01 2.47 0 .24.16.53.61.44C18.47 18.4 21 15 21 11c0-4.97-4.03-9-9-9z"/></svg><span class="gh-text" style="margin-left:0.45rem">GitHub</span>';
        githubBadge.style.transitionDelay = "200ms";
      } else {
        githubBadge.href = "mailto:sharlenepillay14@gmail.com";
        githubBadge.setAttribute(
          "aria-label",
          "Private repository — request access"
        );
        githubBadge.innerHTML =
          '<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17 8V7a5 5 0 00-10 0v1H5v12h14V8h-2zM9 7a3 3 0 016 0v1H9V7z"/></svg><span class="gh-text" style="margin-left:0.45rem">Private</span>';
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
          '<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 4l7 5-7 5V4z"/><path d="M20 4l-8.5 6L20 16V4z" opacity="0.9"/></svg><span class="vsc-text" style="margin-left:0.45rem">VSCode</span>';
        vscBadge.style.transitionDelay = "280ms";
      } else {
        vscBadge.href = "mailto:sharlenepillay14@gmail.com";
        vscBadge.setAttribute(
          "aria-label",
          "No demo available — request access"
        );
        vscBadge.innerHTML =
          '<svg class="icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 4l7 5-7 5V4z"/><path d="M20 4l-8.5 6L20 16V4z" opacity="0.9"/></svg><span class="vsc-text" style="margin-left:0.45rem">VSCode</span>';
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
