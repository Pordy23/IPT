const roles = [
  "Front-end Developer",
  "UI Designer",
  "Fast Learner",
  "Problem Solver"
];

const typed = document.getElementById("typed-role");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typed.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let typingSpeed = isDeleting ? 100 : 200; // Slower typing & deletion

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1800); // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, 800); // Pause before typing next
  } else {
    setTimeout(typeLoop, typingSpeed);
  }
}

document.addEventListener("DOMContentLoaded", typeLoop);

// === MATRIX RAIN EFFECT ===
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = '01';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff00';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = binary[Math.floor(Math.random() * binary.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === TYPEWRITER FIX for "Jefford Wasawas" ===
document.addEventListener("DOMContentLoaded", () => {
  const target = document.getElementById("typewriter");
  const text = "JEFFORD WASAWAS";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      target.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 120);
    } else {
      target.style.borderRight = "none"; // Remove cursor after complete
    }
  }

  typeWriter();
  typeLoop(); // Start the dynamic roles
});



const contactInput = document.getElementById("phone");
const contactError = document.getElementById("phone-error");

let timeout = null;
const apiKey = "ef8dbf73e04742e198cd86c06fdbf050"; // 👈 Replace this!

contactInput.addEventListener("input", () => {
  const number = contactInput.value;

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (number.length < 10) {
      contactError.textContent = "Phone number too short.";
      contactError.style.color = "white";
      return;
    }

    fetch(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${apiKey}&phone=${number}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          contactError.textContent = "✔ Valid number";
          contactError.style.color = "green";
        } else {
          contactError.textContent = "✘ Invalid number";
          contactError.style.color = "red";
        }
      })
      .catch((err) => {
        contactError.textContent = "Error checking number.";
        contactError.style.color = "red";
      });
  }, 600);
});
