const wheel = document.getElementById("wheel");
const ctx = wheel.getContext("2d");
const spinBtn = document.getElementById("spinBtn");
const winnerList = document.getElementById("winnerList");

const segments = [
  "1 Pcs Dimsum", 
  "Es Teh Gratis", 
  "Diskon 2 Ribu", 
  "Komik Si Lapar", 
  "Hadiah Misteri", 
  "Coba Lagi"
];
const colors = ["#fbd786", "#f7797d", "#f6f578", "#a1c4fd", "#c2b0f9", "#ffb3ba"];
const segmentAngle = 2 * Math.PI / segments.length;

let isSpinning = false;
let hasSpun = false;
let rotation = 0;

function drawWheel() {
  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.moveTo(150, 150);
    ctx.arc(150, 150, 150, segmentAngle * i, segmentAngle * (i + 1));
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(segmentAngle * (i + 0.5));
    ctx.fillStyle = "#000";
    ctx.font = "14px Fredoka";
    ctx.textAlign = "right";
    ctx.fillText(segments[i], 120, 5);
    ctx.restore();
  }
}
drawWheel();

function spinWheel() {
  if (isSpinning || hasSpun) return;

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  if (!name || !phone) {
    alert("Isi nama dan no HP kamu dulu!");
    return;
  }

  isSpinning = true;
  spinBtn.disabled = true;

  const extraRotation = 360 * 5;
  const randomRotation = Math.floor(Math.random() * 360);
  rotation = extraRotation + randomRotation;

  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    const normalized = (360 - (rotation % 360)) % 360;
    const resultIndex = Math.floor(normalized / (360 / segments.length));
    const winner = segments[resultIndex];

    const li = document.createElement("li");
    li.textContent = `${name} (${phone}): ${winner}`;
    winnerList.appendChild(li);

    localStorage.setItem(phone, winner);
    showPopup(`${name}, kamu mendapatkan: ${winner}`);
    hasSpun = true;
  }, 4000);
}

function showPopup(text) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  popupText.textContent = text;
  popup.style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

spinBtn.addEventListener("click", spinWheel);
