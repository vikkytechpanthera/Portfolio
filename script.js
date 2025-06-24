// 🔁 Dark mode toggle — set up immediately after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");

  // Load stored preference
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // 📦 Fetch and display projects
  fetch("projects.json")
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById("projectGrid");
      if (!grid) return;

      grid.innerHTML = data.map(project => `
        <div class="project-card">
          <div class="project-thumbnail" style="
            background-image: url('${project.image}');
            background-size: cover;
            background-position: center;
          "></div>
          <h3>${project.title}</h3>
              <p>${project.description}</p>
              <div class="project-links">
                <a href="${project.github}" target="_blank">GitHub</a>
                <a href="${project.demo}" target="_blank">Live Demo</a>
              </div>

        </div>
      `).join('');
    })
    .catch(error => {
      console.error("Failed to load projects.json:", error);
      const grid = document.getElementById("projectGrid");
      if (grid) {
        grid.innerHTML = `<p>Failed to load projects.</p>`;
      }
    });
});
