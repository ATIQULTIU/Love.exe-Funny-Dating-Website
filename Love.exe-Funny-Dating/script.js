/* =====================================================
   LOVE.EXE
   Funny Dating Website
   Developer: MD ATIQUL ISLAM (Atik)
   Email: atiksocial123@gmail.com
===================================================== */


/* ------------------------------
   BASIC SETUP
------------------------------ */

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("year").textContent =
    new Date().getFullYear();

  loadTheme();

  setupFilters();

  animateUserCount();

});


/* ------------------------------
   MOBILE MENU
------------------------------ */

function toggleMenu() {

  const nav = document.getElementById("navMenu");

  nav.classList.toggle("open");

}


/* ------------------------------
   HOME
------------------------------ */

function showHome() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ------------------------------
   SCROLL TO DISCOVER
------------------------------ */

function scrollToDiscover() {

  const section =
    document.getElementById("discover");

  section.scrollIntoView({
    behavior: "smooth"
  });

}


/* ------------------------------
   THEME
------------------------------ */

function toggleTheme() {

  document.body.classList.toggle("dark");

  const dark =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "loveTheme",
    dark ? "dark" : "light"
  );

  updateThemeIcon();

}


function loadTheme() {

  const theme =
    localStorage.getItem("loveTheme");

  if (theme === "dark") {
    document.body.classList.add("dark");
  }

  updateThemeIcon();

}


function updateThemeIcon() {

  const button =
    document.getElementById("themeButton");

  if (
    document.body.classList.contains("dark")
  ) {
    button.textContent = "☀️";
  } else {
    button.textContent = "🌙";
  }

}


/* ------------------------------
   USER COUNTER
------------------------------ */

function animateUserCount() {

  const element =
    document.getElementById("userCount");

  let value = 10200;

  const target = 10248;

  const timer = setInterval(() => {

    value += 2;

    if (value >= target) {

      value = target;

      clearInterval(timer);

    }

    element.textContent =
      value.toLocaleString();

  }, 25);

}


/* ------------------------------
   FILTERS
------------------------------ */

function setupFilters() {

  const filters =
    document.querySelectorAll(".filter");

  filters.forEach(filter => {

    filter.addEventListener("click", () => {

      filters.forEach(item =>
        item.classList.remove("active")
      );

      filter.classList.add("active");

      const category =
        filter.dataset.filter;

      const cards =
        document.querySelectorAll(".profile-card");

      cards.forEach(card => {

        if (
          category === "all" ||
          card.dataset.category === category
        ) {

          card.style.display = "";

          setTimeout(() => {
            card.style.opacity = "1";
          }, 10);

        } else {

          card.style.opacity = "0";

          setTimeout(() => {
            card.style.display = "none";
          }, 200);

        }

      });

    });

  });

}


/* ------------------------------
   LIKE PROFILE
------------------------------ */

function likeProfile(button, name) {

  button.classList.toggle("liked");

  const liked =
    button.classList.contains("liked");

  if (liked) {

    button.textContent = "♥";

    showToast(
      "💖",
      "Like sent!",
      `You liked ${name}. The algorithm is suspiciously excited.`
    );

  } else {

    button.textContent = "♡";

    showToast(
      "💔",
      "Like removed",
      `You changed your mind about ${name}. Fair enough.`
    );

  }

}


/* ------------------------------
   SEND LIKE
------------------------------ */

function sendLike(name) {

  const percentage =
    Math.floor(Math.random() * 13) + 87;

  document.getElementById("matchName")
    .textContent =
    `You + ${name} = Trouble ❤️`;

  document.getElementById("matchMessage")
    .textContent =
    getFunnyMatchMessage(name);

  document.getElementById("matchPercentage")
    .textContent =
    `${percentage}%`;

  document
    .getElementById("matchModal")
    .classList.add("show");

}


/* ------------------------------
   FUNNY MATCH MESSAGES
------------------------------ */

function getFunnyMatchMessage(name) {

  const messages = [

    `${name} has been notified. Please remain calm.`,

    `The algorithm says you should probably say hello.`,

    `Congratulations! Your awkward conversation potential is extremely high.`,

    `Cupid has entered the chat. Unfortunately, he has no idea what he's doing.`,

    `Your personalities are compatible enough to share fries.`,

    `Scientists are currently investigating this suspicious chemistry.`

  ];

  return messages[
    Math.floor(Math.random() * messages.length)
  ];

}


/* ------------------------------
   CLOSE MODAL
------------------------------ */

function closeModal() {

  document
    .getElementById("matchModal")
    .classList.remove("show");

}


document
  .getElementById("matchModal")
  .addEventListener("click", event => {

    if (
      event.target.id === "matchModal"
    ) {
      closeModal();
    }

  });


/* ------------------------------
   FAKE CHAT
------------------------------ */

function startChat() {

  closeModal();

  showToast(
    "💬",
    "Fake chat activated!",
    "Unfortunately, the other person is typing... forever."
  );

}


/* ------------------------------
   RANDOM MATCH
------------------------------ */

function randomMatch() {

  const names = [
    "Maya",
    "Alex",
    "Sofia",
    "Ryan",
    "Emma",
    "Daniel"
  ];

  const randomName =
    names[Math.floor(Math.random() * names.length)];

  sendLike(randomName);

}


/* ------------------------------
   SHUFFLE PROFILES
------------------------------ */

function shuffleProfiles() {

  const grid =
    document.getElementById("profilesGrid");

  const cards =
    Array.from(
      grid.querySelectorAll(".profile-card")
    );

  cards.sort(() => Math.random() - 0.5);

  cards.forEach(card => {
    grid.appendChild(card);
  });

  showToast(
    "🎲",
    "Profiles shuffled!",
    "The algorithm has made another questionable decision."
  );

}


/* ------------------------------
   TOAST
------------------------------ */

let toastTimer;


function showToast(icon, title, message) {

  const toast =
    document.getElementById("toast");

  document.getElementById("toastIcon")
    .textContent = icon;

  document.getElementById("toastTitle")
    .textContent = title;

  document.getElementById("toastMessage")
    .textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {

    hideToast();

  }, 4500);

}


function hideToast() {

  document
    .getElementById("toast")
    .classList.remove("show");

}


/* ------------------------------
   COMPATIBILITY QUIZ
------------------------------ */

let quizScore = 0;

let quizAnswers = 0;


function answerQuiz(question, score) {

  quizScore += score;

  quizAnswers++;

  const current =
    document.querySelector(
      `[data-question="${question}"]`
    );

  current.classList.remove(
    "active-question"
  );

  if (question < 3) {

    const next =
      document.querySelector(
        `[data-question="${question + 1}"]`
      );

    next.classList.add(
      "active-question"
    );

  } else {

    showQuizResult();

  }

}


function showQuizResult() {

  let percentage =
    60 + (quizScore % 41);

  const result =
    document.getElementById("quizResult");

  let title;
  let message;

  if (percentage >= 90) {

    title = "💍 Dangerously Compatible!";

    message =
      "You might actually survive a dinner together.";

  } else if (percentage >= 75) {

    title = "💕 Pretty Good Match!";

    message =
      "You both seem sufficiently weird for each other.";

  } else {

    title = "🤔 It's Complicated.";

    message =
      "The algorithm needs therapy before making another prediction.";

  }

  result.innerHTML = `
    <div class="result-heart">💖</div>

    <h3>${title}</h3>

    <p>
      Your scientifically questionable compatibility:
    </p>

    <strong
      style="
        display:block;
        font-size:42px;
        color:var(--primary);
        margin:5px 0;
      "
    >
      ${percentage}%
    </strong>

    <p>${message}</p>

    <button
      class="primary-button"
      style="margin-top:15px;"
      onclick="restartQuiz()"
    >
      🔄 Try Again
    </button>
  `;

  result.style.display = "block";

}


function restartQuiz() {

  quizScore = 0;

  quizAnswers = 0;

  document
    .getElementById("quizResult")
    .style.display = "none";

  document
    .querySelectorAll(".quiz-question")
    .forEach(q =>
      q.classList.remove("active-question")
    );

  document
    .querySelector('[data-question="1"]')
    .classList.add("active-question");

}


/* ------------------------------
   RANDOM FUNNY NOTIFICATION
------------------------------ */

setInterval(() => {

  const messages = [

    [
      "👀",
      "Someone viewed your profile!",
      "They probably liked your memes."
    ],

    [
      "💘",
      "Cupid is online.",
      "Unfortunately, he forgot his password."
    ],

    [
      "🍕",
      "Important reminder",
      "Never trust someone who doesn't share pizza."
    ],

    [
      "😂",
      "Dating tip",
      "Don't say 'you too' when the waiter says enjoy your meal."
    ]

  ];

  const random =
    messages[
      Math.floor(
        Math.random() * messages.length
      )
    ];

  /*
    Small probability so the notification
    doesn't become annoying.
  */

  if (Math.random() > 0.55) {

    showToast(
      random[0],
      random[1],
      random[2]
    );

  }

}, 15000);


/* ------------------------------
   ESCAPE KEY
------------------------------ */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeModal();
    }

  }
);


/* ------------------------------
   CONSOLE DEVELOPER CREDIT
------------------------------ */

console.log(`
❤️ Love.exe

Funny Dating Website

Developer:
MD ATIQUL ISLAM (Atik)

Email:
atiksocial123@gmail.com

This is a fictional frontend demo.
`);