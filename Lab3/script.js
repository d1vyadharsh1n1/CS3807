const steps = document.querySelectorAll(".form-step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
let currentStep = 0;

function showStep(step) {
  steps.forEach((s, i) => {
    s.classList.toggle("active", i === step);
  });
}

nextBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      currentStep++;
      updatePreview();
      showStep(currentStep);
    }
  })
);

prevBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);
  })
);

function validateStep(step) {
  let valid = true;
  const stepFields = steps[step].querySelectorAll("input, select");
  stepFields.forEach((field) => {
    const errorMsg =
      field.nextElementSibling?.tagName === "SMALL"
        ? field.nextElementSibling
        : null;
    field.classList.remove("invalid", "valid");

    if (field.type === "checkbox" && !field.checked) {
      if (errorMsg) errorMsg.textContent = "Please agree";
      field.classList.add("invalid");
      valid = false;
    } else if (field.value.trim() === "") {
      if (errorMsg) errorMsg.textContent = "This field is required";
      field.classList.add("invalid");
      valid = false;
    } else {
      // Additional pattern checks
      if (field.id === "name" && !/^[A-Za-z\s]{3,}$/.test(field.value)) {
        errorMsg.textContent = "Use letters only, min 3 chars";
        field.classList.add("invalid");
        valid = false;
      } else if (
        field.id === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
      ) {
        errorMsg.textContent = "Invalid email format";
        field.classList.add("invalid");
        valid = false;
      } else if (field.id === "phone" && !/^\d{10}$/.test(field.value)) {
        errorMsg.textContent = "Phone must be 10 digits";
        field.classList.add("invalid");
        valid = false;
      } else if (field.id === "age" && parseInt(field.value) < 18) {
        errorMsg.textContent = "Must be 18+";
        field.classList.add("invalid");
        valid = false;
      } else {
        if (errorMsg) errorMsg.textContent = "";
        field.classList.add("valid");
      }
    }
  });
  return valid;
}

function updatePreview() {
  document.getElementById("prevName").textContent =
    document.getElementById("name").value;
  document.getElementById("prevEmail").textContent =
    document.getElementById("email").value;
  document.getElementById("prevPhone").textContent =
    document.getElementById("phone").value;
  document.getElementById("prevAge").textContent =
    document.getElementById("age").value;
  document.getElementById("prevEvent").textContent =
    document.getElementById("eventType").value;
}

document.getElementById("registrationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateStep(currentStep)) {
    alert("🎉 Registration Successful!");
    e.target.reset();
    currentStep = 0;
    showStep(currentStep);
  }
});

showStep(currentStep);
