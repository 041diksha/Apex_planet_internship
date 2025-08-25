// Interactive Web Task – Forms, Layout, and DOM

document.addEventListener('DOMContentLoaded', () => {
  initializeMobileNavigation();
  initializeContactFormValidation();
  initializeTodoList();
  initializeScrollReveal();
  startHeroBounce();
});

function initializeMobileNavigation() {
  const toggleButton = document.querySelector('.nav-toggle');
  const navList = document.getElementById('nav-list');
  if (!toggleButton || !navList) return;

  toggleButton.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

function initializeContactFormValidation() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const statusEl = document.getElementById('formStatus');
  if (!form) return;

  const fieldToErrorEl = {
    name: document.querySelector('.error[data-for="name"]'),
    email: document.querySelector('.error[data-for="email"]'),
    message: document.querySelector('.error[data-for="message"]')
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    clearErrors(fieldToErrorEl);

    const errors = {};
    if (name.length < 2) {
      errors.name = 'Please enter your full name.';
    }
    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (message.length < 10) {
      errors.message = 'Message should be at least 10 characters.';
    }

    const isValid = Object.keys(errors).length === 0;
    if (!isValid) {
      for (const [key, value] of Object.entries(errors)) {
        const el = fieldToErrorEl[key];
        if (el) el.textContent = value;
      }
      statusEl.textContent = '';
      return;
    }

    // Simulate successful submission
    form.reset();
    statusEl.textContent = 'Thanks! Your message has been sent.';
    showToast(toast, 'Message sent ✅');
  });
}

function isValidEmail(email) {
  const pattern = /^(?:[a-zA-Z0-9_'^&\+`{}~!#$%*?\/=\|\-]+(?:\.[a-zA-Z0-9_'^&\+`{}~!#$%*?\/=\|\-]+)*)@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

function clearErrors(map) {
  Object.values(map).forEach((el) => {
    if (el) el.textContent = '';
  });
}

function showToast(toastEl, message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  window.setTimeout(() => {
    toastEl.classList.remove('show');
  }, 1800);
}

// To‑Do List
function initializeTodoList() {
  const input = document.getElementById('todoInput');
  const addButton = document.getElementById('addTodoBtn');
  const list = document.getElementById('todoList');
  const countEl = document.getElementById('todoCount');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');
  if (!input || !addButton || !list || !countEl) return;

  const storageKey = 'interactive-web-task.todos.v1';
  let todos = loadTodos(storageKey);
  renderTodos(list, todos);
  updateCount(countEl, todos);

  addButton.addEventListener('click', () => {
    const title = String(input.value || '').trim();
    if (!title) return;
    const todo = { id: cryptoRandomId(), title, done: false };
    todos = [todo, ...todos];
    saveTodos(storageKey, todos);
    renderTodos(list, todos);
    updateCount(countEl, todos);
    input.value = '';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addButton.click();
    }
  });

  list.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    // Toggle checkbox
    if (target.matches('input[type="checkbox"]')) {
      const id = target.closest('li')?.getAttribute('data-id');
      if (!id) return;
      todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
      saveTodos(storageKey, todos);
      renderTodos(list, todos);
      updateCount(countEl, todos);
      return;
    }

    // Delete button
    if (target.matches('.delete-btn')) {
      const id = target.closest('li')?.getAttribute('data-id');
      if (!id) return;
      todos = todos.filter((t) => t.id !== id);
      saveTodos(storageKey, todos);
      renderTodos(list, todos);
      updateCount(countEl, todos);
      return;
    }
  });

  if (clearCompletedBtn) {
    clearCompletedBtn.addEventListener('click', () => {
      todos = todos.filter((t) => !t.done);
      saveTodos(storageKey, todos);
      renderTodos(list, todos);
      updateCount(countEl, todos);
    });
  }
}

function renderTodos(listEl, todos) {
  listEl.innerHTML = todos
    .map((t) => {
      const checked = t.done ? 'checked' : '';
      const doneClass = t.done ? 'done' : '';
      return `
        <li class="todo-item ${doneClass}" data-id="${t.id}">
          <input type="checkbox" ${checked} aria-label="Mark task done" />
          <div class="title" title="${escapeHtml(t.title)}">${escapeHtml(t.title)}</div>
          <button class="delete-btn" aria-label="Delete task">✕</button>
        </li>
      `;
    })
    .join('');
}

function updateCount(el, todos) {
  const count = todos.length;
  el.textContent = count === 1 ? '1 item' : `${count} items`;
}

function saveTodos(key, todos) {
  try {
    localStorage.setItem(key, JSON.stringify(todos));
  } catch (_) {
    // ignore storage errors
  }
}

function loadTodos(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter((t) => typeof t === 'object' && t && 'id' in t && 'title' in t && 'done' in t);
  } catch (_) {
    return [];
  }
}

function cryptoRandomId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return 'id-' + Math.random().toString(36).slice(2, 10);
}

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

// Scroll reveal using IntersectionObserver
function initializeScrollReveal() {
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const target = entry.target;
        const delay = Number(target.getAttribute('data-reveal-delay') || 0);
        setTimeout(() => target.classList.add('visible'), delay);
        io.unobserve(target);
      }
    }
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
}

// Gentle periodic bounce for hero CTA
function startHeroBounce() {
  const cta = document.querySelector('.hero .btn.primary');
  if (!cta) return;
  let timer = null;
  const loop = () => {
    const rect = cta.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    if (onScreen) {
      cta.classList.add('jump');
      setTimeout(() => cta.classList.remove('jump'), 800);
    }
    timer = setTimeout(loop, 3500);
  };
  timer = setTimeout(loop, 1800);
  window.addEventListener('beforeunload', () => timer && clearTimeout(timer));
}


