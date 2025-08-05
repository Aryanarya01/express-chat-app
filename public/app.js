const deleteForms = document.querySelectorAll("form.delete-form");

deleteForms.forEach((form) => {
  form.addEventListener("submit", function (event) {
    const shouldDelete = confirm("Do you want to delete this chat?");
    if (!shouldDelete) {
      event.preventDefault(); // Form submit rok dega agar 'No' dabaya
    }
  });
});