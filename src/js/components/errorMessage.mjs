export function displayError(error) {
  const containers = document.querySelectorAll(".form-error");
  containers.forEach((container) => {
    container.innerHTML = `${error}`;
    setTimeout(() => {
      container.innerHTML = "";
    }, 5000);
  });
}
