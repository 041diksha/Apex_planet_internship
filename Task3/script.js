// Helper utilities
function $(sel, parent = document) { return parent.querySelector(sel); }
function $all(sel, parent = document) { return Array.from(parent.querySelectorAll(sel)); }

// Nav: mobile toggle and smooth scroll with active section highlighting
const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
const navLinks = $all('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', document.body.classList.contains('nav-open'));
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href') || '#';
    if (href.startsWith('#')) {
      e.preventDefault();
      document.body.classList.remove('nav-open');
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active section highlight
const sections = $all('main .section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    if (!id) return;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '0px 0px -40% 0px', threshold: [0.5, 0.75] });
sections.forEach(s => observer.observe(s));

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Quiz: single-card flow
const quizQuestions = [
  { q: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'const', 'function'], correct: 1 },
  { q: 'typeof null equals?', options: ['"null"', '"object"', '"undefined"', '"number"'], correct: 1 },
  { q: 'Array method to filter items?', options: ['map', 'forEach', 'filter', 'reduce'], correct: 2 },
  { q: 'Method to parse JSON string?', options: ['JSON.parse', 'JSON.stringify', 'Object.parse', 'JSON.decode'], correct: 0 },
  { q: 'Strict equality operator?', options: ['==', '===', '!=', '>='], correct: 1 },
  { q: 'Add element at array end?', options: ['shift()', 'push()', 'unshift()', 'pop()'], correct: 1 },
];

let quizIndex = 0;
let quizScore = 0;
let quizSelected = null;

const quizCard = document.getElementById('quiz-card');
const quizProgress = document.getElementById('quiz-progress');
const quizSubmitBtn = document.getElementById('quiz-submit');
const quizNextBtn = document.getElementById('quiz-next');
const quizRestartBtn = document.getElementById('quiz-restart');

function renderQuizCard() {
  if (!quizCard || !quizProgress) return;
  if (quizIndex >= quizQuestions.length) return renderQuizResult();
  const item = quizQuestions[quizIndex];
  quizProgress.textContent = `Question ${quizIndex + 1}/${quizQuestions.length}`;
  quizCard.classList.remove('animate__fadeIn');
  quizCard.innerHTML = '';
  const title = document.createElement('h3');
  title.textContent = item.q;
  const list = document.createElement('div');
  list.className = 'quiz-options';
  item.options.forEach((opt, i) => {
    const label = document.createElement('label');
    label.className = 'quiz-option';
    const input = document.createElement('input');
    input.type = 'radio'; input.name = 'quiz'; input.value = String(i);
    const span = document.createElement('span'); span.textContent = opt;
    label.appendChild(input); label.appendChild(span);
    label.addEventListener('click', () => { quizSelected = i; });
    list.appendChild(label);
  });
  const feedback = document.createElement('div');
  feedback.id = 'quiz-feedback'; feedback.className = 'quiz-feedback';
  quizCard.appendChild(title);
  quizCard.appendChild(list);
  quizCard.appendChild(feedback);
  quizCard.classList.add('animate__fadeIn');
  quizNextBtn && (quizNextBtn.disabled = true);
}

function showQuizFeedback(isCorrect) {
  const el = document.getElementById('quiz-feedback');
  if (!el) return;
  el.classList.add('show');
  el.classList.toggle('correct', isCorrect);
  el.classList.toggle('incorrect', !isCorrect);
  el.textContent = isCorrect ? 'Correct!' : 'Incorrect.';
}

quizSubmitBtn && quizSubmitBtn.addEventListener('click', () => {
  if (quizIndex >= quizQuestions.length) return;
  if (quizSelected == null) return;
  const isCorrect = quizSelected === quizQuestions[quizIndex].correct;
  if (isCorrect) quizScore += 1;
  showQuizFeedback(isCorrect);
  quizNextBtn && (quizNextBtn.disabled = false);
});

quizNextBtn && quizNextBtn.addEventListener('click', () => {
  quizIndex += 1;
  quizSelected = null;
  if (quizIndex < quizQuestions.length) {
    quizCard && quizCard.classList.remove('animate__fadeIn');
    quizCard && quizCard.classList.add('animate__fadeOut');
    setTimeout(() => {
      quizCard && quizCard.classList.remove('animate__fadeOut');
      renderQuizCard();
    }, 250);
  } else {
    renderQuizResult();
  }
});

quizRestartBtn && quizRestartBtn.addEventListener('click', () => {
  quizIndex = 0; quizScore = 0; quizSelected = null;
  quizRestartBtn.hidden = true;
  quizSubmitBtn && (quizSubmitBtn.disabled = false);
  renderQuizCard();
});

function renderQuizResult() {
  if (!quizCard) return;
  quizCard.innerHTML = '';
  const title = document.createElement('h3');
  title.textContent = 'Results';
  const p = document.createElement('p');
  p.textContent = `You scored ${quizScore} out of ${quizQuestions.length}.`;
  const restart = quizRestartBtn;
  if (restart) restart.hidden = false;
  if (quizNextBtn) quizNextBtn.disabled = true;
  quizSubmitBtn && (quizSubmitBtn.disabled = true);
  quizCard.appendChild(title); quizCard.appendChild(p);
}

// Initialize quiz
renderQuizCard();

// Carousel
const images = [
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1499084732479-de2c02d45fc4?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517816428104-797678c7cf0d?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
];
let index = 0; let timer = null;
const slides = document.getElementById('slides');
const dots = document.getElementById('dots');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

function renderSlides() {
  if (!slides || !dots) return;
  slides.innerHTML = ''; dots.innerHTML = '';
  images.forEach((src, i) => {
    const s = document.createElement('div'); s.className = 'slide'; s.style.backgroundImage = `url(${src})`;
    slides.appendChild(s);
    const d = document.createElement('button'); d.className = 'dot'; d.setAttribute('aria-label', `Go to slide ${i+1}`);
    d.addEventListener('click', () => go(i)); dots.appendChild(d);
  });
  updateSlides();
}

function updateSlides() {
  if (!slides || !dots) return;
  slides.style.transform = `translateX(${-index * 100}%)`;
  $all('.dot', dots).forEach((d, i) => d.classList.toggle('active', i === index));
}

function go(i) { index = (i + images.length) % images.length; updateSlides(); restart(); }
function nextSlide() { go(index + 1); }
function prevSlide() { go(index - 1); }

function start() { stop(); timer = setInterval(nextSlide, 3500); }
function stop() { if (timer) clearInterval(timer); timer = null; }
function restart() { start(); }

prev && prev.addEventListener('click', prevSlide);
next && next.addEventListener('click', nextSlide);
const carouselEl = document.querySelector('.carousel');
if (carouselEl) {
  carouselEl.addEventListener('mouseenter', stop);
  carouselEl.addEventListener('mouseleave', start);
}
document.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') nextSlide(); if (e.key === 'ArrowLeft') prevSlide(); });

renderSlides(); start();

// Live Data (Jokes)
const jokeBtn = document.getElementById('get-joke');
const jokeText = document.getElementById('joke-text');
const jokeError = document.getElementById('joke-error');
const jokeLoader = document.getElementById('joke-loader');

function showLoader(show) { if (jokeLoader) jokeLoader.style.display = show ? 'inline-block' : 'none'; }
function setError(msg) { if (!jokeError) return; jokeError.hidden = !msg; jokeError.textContent = msg || ''; }
function setText(msg) { if (!jokeText) return; jokeText.textContent = msg || ''; }

function cacheJoke(j) { try { localStorage.setItem('lastJoke', j); } catch {} }
function readCachedJoke() { try { return localStorage.getItem('lastJoke'); } catch { return null; } }

async function getJoke() {
  setError(''); showLoader(true); setText('');
  try {
    const res = await fetch('https://official-joke-api.appspot.com/jokes/random');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const setup = data.setup || 'Here is a joke:'; const punchline = data.punchline || '';
    const j = `${setup} — ${punchline}`; setText(j); cacheJoke(j);
  } catch (e) {
    setError('Failed to fetch a joke. Please try again.');
  } finally { showLoader(false); }
}

if (jokeBtn) jokeBtn.addEventListener('click', getJoke);
const cached = readCachedJoke(); if (cached) setText(cached);


