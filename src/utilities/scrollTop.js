export function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function scrollBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}
