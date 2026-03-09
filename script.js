const rides = [
  {
    name: "Skyline Wheel",
    thrill: 2,
    guidance: "All ages, kids under 10 with guardian",
    bestTime: "Sunset to late evening",
    description:
      "Signature panoramic ride with gold-lit gondolas and the best night views on the grounds.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Volt Drop Tower",
    thrill: 5,
    guidance: "Minimum height 140cm",
    bestTime: "After 8PM for full lighting effects",
    description: "A vertical rush with synchronized strobe towers and bass-reactive drops.",
    image:
      "https://images.unsplash.com/photo-1510041883845-7e76724006e9?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Golden Carousel",
    thrill: 1,
    guidance: "Family friendly",
    bestTime: "Golden hour",
    description: "Classic carnival centerpiece redesigned with regal Ghanaian trim and live strings.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Fire Loop Coaster",
    thrill: 4,
    guidance: "Minimum height 130cm",
    bestTime: "Night rides",
    description: "High-speed inversions through rings of flame-inspired projection tunnels.",
    image:
      "https://images.unsplash.com/photo-1529973565457-a60a2ccf750d?auto=format&fit=crop&w=1200&q=80",
  },
];

const experiences = [
  ["Accra Neon Parade", "Street dancers, lights, and floating stage trucks.", "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80"],
  ["Coastal Dream Fair", "Ocean-side amusement strip with premium food halls.", "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80"],
  ["Skyline Thrill District", "Tower rides and fireworks over the city horizon.", "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80"],
];

const lineup = ["Sarkodie", "Amaarae", "Stonebwoy", "King Promise", "Efya", "KiDi"];
const merch = [
  ["ALIV Gold Tee", "$39", "Limited"],
  ["Festival Windbreaker", "$89", "New"],
  ["Glow Wrist Pack", "$24", "Hot"],
  ["VIP Lanyard Set", "$29", "Drop"],
];
const sponsors = ["MTN", "Guinness", "Nike", "Spotify", "Coca-Cola", "TikTok"];
const influencers = ["@nana.travels", "@afrobeatsdaily", "@accraafterdark"];

function render() {
  const rideGrid = document.getElementById("rideGrid");
  rideGrid.innerHTML = rides
    .map(
      (ride, index) => `
      <article class="card" data-ride-index="${index}">
        <h3>${ride.name}</h3>
        <p>${ride.description.slice(0, 70)}...</p>
        <span class="badge">Thrill ${ride.thrill}/5</span>
      </article>`
    )
    .join("");

  const carousel = document.getElementById("carousel3d");
  carousel.innerHTML = experiences
    .map(
      ([name, desc, image]) => `
      <article class="carousel-item" style="background-image:linear-gradient(transparent, rgba(3,6,17,.8)), url('${image}')">
        <h3>${name}</h3>
        <p>${desc}</p>
      </article>`
    )
    .join("");

  document.getElementById("lineupGrid").innerHTML = lineup
    .map((artist) => `<article class="card"><h3>${artist}</h3><p>Live visual set + headline slot.</p></article>`)
    .join("");

  document.getElementById("merchGrid").innerHTML = merch
    .map(([item, price, tag]) => `<article class="card"><p class="badge">${tag}</p><h3>${item}</h3><p>${price}</p><button class="primary-btn">Add to cart</button></article>`)
    .join("");

  document.getElementById("ticketBars").innerHTML = [
    ["General Access", 78],
    ["VIP", 61],
    ["Backstage", 42],
  ]
    .map(
      ([name, percent]) => `<div class="ticket-row"><p>${name} • ${percent}% sold</p><div class="progress"><span style="width:${percent}%"></span></div></div>`
    )
    .join("");

  document.getElementById("sponsorWall").innerHTML = sponsors.map((s) => `<div class="pill">${s}</div>`).join("");

  document.getElementById("influencerGallery").innerHTML = influencers
    .map(
      (name, i) => `<div class="influencer" style="background-image:url('https://picsum.photos/seed/aliv${i}/500')"><span>${name}</span></div>`
    )
    .join("");
}

function initRideModal() {
  const modal = document.getElementById("rideModal");
  const modalContent = document.getElementById("modalContent");

  document.getElementById("rideGrid").addEventListener("click", (e) => {
    const card = e.target.closest("[data-ride-index]");
    if (!card) return;
    const ride = rides[card.dataset.rideIndex];
    modalContent.innerHTML = `
      <img src="${ride.image}" alt="${ride.name}" style="width:100%;height:240px;object-fit:cover;border-radius:12px;"/>
      <h2>${ride.name}</h2>
      <p>${ride.description}</p>
      <p><strong>Thrill Level:</strong> ${ride.thrill}/5</p>
      <p><strong>Guidance:</strong> ${ride.guidance}</p>
      <p><strong>Best Time:</strong> ${ride.bestTime}</p>
      <button class="primary-btn">Add to my festival plan</button>
    `;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });

  document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

function initCountdown() {
  const end = new Date("2026-08-22T18:00:00").getTime();
  const box = document.getElementById("countdown");
  const tick = () => {
    const dist = end - Date.now();
    if (dist <= 0) {
      box.textContent = "We are live now!";
      return;
    }
    const days = Math.floor(dist / 86400000);
    const hours = Math.floor((dist % 86400000) / 3600000);
    const mins = Math.floor((dist % 3600000) / 60000);
    box.textContent = `Countdown: ${days}d ${hours}h ${mins}m to ALIVFEST kickoff`;
  };
  tick();
  setInterval(tick, 30000);
}

function initMap() {
  const desc = {
    rides: "Thrill district with Skyline Wheel, Volt Drop, Fire Loop, and chill lounges.",
    music: "Main stage with headline performances, holographic visuals, and VIP decks.",
    food: "Chef rows featuring Ghanaian fusion, dessert labs, and night markets.",
    vip: "Premium suites, influencer sets, concierge lanes, and luxury seating.",
  };
  const output = document.getElementById("zoneDescription");
  output.textContent = desc.rides;

  document.querySelectorAll(".zone-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".zone-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      output.textContent = desc[btn.dataset.zone];
    });
  });
}

render();
initRideModal();
initCountdown();
initMap();
