// Show a short commit hash for the running Pages app.
// HTML: <p class="app-version" id="app-version" hidden></p>

const APP_REPO = "vicholz/your-repo";

export function loadAppVersion() {
  fetch("https://api.github.com/repos/" + APP_REPO + "/commits/main")
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((commit) => {
      if (!commit.sha) return;
      const el = document.getElementById("app-version");
      if (!el) return;
      el.replaceChildren();
      el.append("Version ");
      const a = document.createElement("a");
      a.href = "https://github.com/" + APP_REPO + "/commit/" + commit.sha;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = commit.sha.slice(0, 7);
      el.appendChild(a);
      el.hidden = false;
    })
    .catch(() => {});
}
