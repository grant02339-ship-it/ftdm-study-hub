// Full-screen "What should we call you?" step: first launch (before the event picker) and once for
// existing students who have no name yet. The name is only ever set as an input value or text.
import { h, brandMark } from './ui.js';
import { cleanName } from './store.js';

// onDone(name) runs once with the cleaned name ('' when skipped), then the layer fades out.
// step: optional eyebrow text such as 'Step 1 of 2'.
export function showNameStep({ onDone, step = '' } = {}) {
  const app = document.querySelector('.app');
  if (app) app.inert = true;
  const input = h('input', {
    class: 'nm-input', id: 'nm-input', type: 'text', maxlength: '20', autocomplete: 'given-name', autocapitalize: 'words',
    spellcheck: 'false', enterkeyhint: 'done', placeholder: 'First name', 'aria-describedby': 'nm-note',
  });
  const count = h('span', { class: 'nm-count num', 'aria-hidden': 'true' }, '0/20');
  const go = h('button', { class: 'cta nm-go', type: 'submit', disabled: true }, 'Continue');
  const skip = h('button', { class: 'nm-skip', type: 'button' }, 'Skip for now');
  let done = false;
  const finish = name => {
    if (done) return;
    done = true;
    if (app) app.inert = false;
    layer.classList.add('out');
    setTimeout(() => layer.remove(), 300);
    onDone(name);
  };
  const sync = () => {
    const name = cleanName(input.value);
    go.disabled = !name;
    count.textContent = `${[...input.value].length}/20`;
  };
  input.addEventListener('input', sync);
  skip.addEventListener('click', () => finish(''));
  const form = h('form', { class: 'nm-form', novalidate: true, onsubmit: e => {
    e.preventDefault();
    const name = cleanName(input.value);
    if (name) finish(name); else input.focus();
  } },
  h('label', { class: 'nm-field', for: 'nm-input' }, h('span', { class: 'sr-only' }, 'Your first name'), input, count),
  h('p', { class: 'nm-note', id: 'nm-note' }, 'Saved only on this device.'),
  go, skip);
  const layer = h('div', { class: 'ev-welcome nm-welcome', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'nm-title' },
    h('div', { class: 'ev-welcome-in' },
      h('div', { class: 'ev-brand' }, brandMark()),
      step ? h('p', { class: 'ev-step' }, step) : null,
      h('h1', { id: 'nm-title', class: 'ev-h' }, 'What should we call you?'),
      h('p', { class: 'ev-lede' }, 'Just your first name. We’ll use it to cheer you on.'),
      form));
  document.body.append(layer);
  requestAnimationFrame(() => layer.classList.add('in'));
  setTimeout(() => input.focus({ preventScroll: true }), 60);
}
