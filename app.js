const DAILY_QUESTIONS = [
  {
    id: 'c1',
    subject: 'chinese',
    topic: '字词积累',
    icon: '语',
    prompt: '选一选：“晴朗”的“晴”字，和哪个字的意思最接近？',
    options: ['天气放晴的“晴”', '眼睛的“睛”', '心情的“情”'],
    answer: 0,
    explanation: '“晴朗”指天气清明，所以要选表示天气的“晴”。'
  },
  {
    id: 'c2',
    subject: 'chinese',
    topic: '句子练习',
    icon: '语',
    prompt: '下面哪个句子写得通顺、完整？',
    options: ['小鸟在枝头唱歌。', '唱歌在枝头小鸟。', '枝头小鸟唱歌在。'],
    answer: 0,
    explanation: '“小鸟”是做什么的？“在枝头唱歌”说清了地点和动作。'
  },
  {
    id: 'c3',
    subject: 'chinese',
    topic: '阅读小站',
    icon: '语',
    prompt: '小松鼠为什么把松果搬进洞里？',
    passage: '秋天到了，小松鼠看见树上的松果成熟了。它把一个个松果搬进洞里，准备留到冬天慢慢吃。',
    options: ['因为松果很漂亮', '因为要为冬天准备食物', '因为它不喜欢秋天'],
    answer: 1,
    explanation: '从“准备留到冬天慢慢吃”可以知道，小松鼠是在储存冬天的食物。'
  },
  {
    id: 'm1',
    subject: 'math',
    topic: '口算小达人',
    icon: '＋',
    kind: 'input',
    prompt: '算一算：38 + 24 =',
    answer: '62',
    answerText: '62',
    placeholder: '写出得数',
    explanation: '个位 8＋4＝12，写 2 向十位进 1；十位 3＋2＋1＝6，所以得 62。'
  },
  {
    id: 'm2',
    subject: 'math',
    topic: '乘法启蒙',
    icon: '＋',
    prompt: '4 个 5 相加，写成乘法算式是？',
    options: ['4 × 5 = 20', '4 + 5 = 9', '5 × 5 = 25'],
    answer: 0,
    explanation: '4 个 5 相加就是 5＋5＋5＋5，可以写成 4×5，得 20。'
  },
  {
    id: 'm3',
    subject: 'math',
    topic: '解决问题',
    icon: '＋',
    prompt: '小明有 36 张贴纸，送给同学 12 张，还剩多少张？',
    options: ['24 张', '48 张', '22 张'],
    answer: 0,
    explanation: '求还剩多少，用减法：36－12＝24（张）。'
  },
  {
    id: 'e1',
    subject: 'english',
    topic: '日常问候',
    icon: 'A',
    prompt: '当别人对你说 “Good morning!” 时，你应该说：',
    options: ['Good morning!', 'Goodbye!', 'Thank you.'],
    answer: 0,
    explanation: '早上见面时，听到 “Good morning!” 要礼貌地回应 “Good morning!”。'
  },
  {
    id: 'e2',
    subject: 'english',
    topic: '家庭成员',
    icon: 'A',
    prompt: '看句子选词：This is my _____.',
    subtext: '这是我的妈妈。',
    options: ['mother', 'run', 'blue'],
    answer: 0,
    explanation: 'mother 是“妈妈”；完整的句子是 This is my mother.'
  },
  {
    id: 'e3',
    subject: 'english',
    topic: '简单句型',
    icon: 'A',
    prompt: '“I can swim.” 的意思是：',
    options: ['我会游泳。', '我喜欢游泳。', '我不会游泳。'],
    answer: 0,
    explanation: 'can 表示“会、能够”，I can swim. 就是“我会游泳”。'
  }
];

const SUBJECTS = {
  chinese: { name: '语文', short: '语', labelClass: 'chinese-label', progressClass: 'chinese-progress' },
  math: { name: '数学', short: '＋', labelClass: 'math-label', progressClass: 'math-progress' },
  english: { name: '英语', short: 'A', labelClass: 'english-label', progressClass: 'english-progress' }
};

const STORAGE_KEY = 'little-practice-station-v1';
const todayKey = () => new Date().toISOString().slice(0, 10);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      answers: saved.answers && typeof saved.answers === 'object' ? saved.answers : {},
      mistakes: Array.isArray(saved.mistakes) ? saved.mistakes.filter((id) => DAILY_QUESTIONS.some((q) => q.id === id)) : [],
      activityDates: Array.isArray(saved.activityDates) ? saved.activityDates : []
    };
  } catch (error) {
    return { answers: {}, mistakes: [], activityDates: [] };
  }
}

let state = loadState();
let currentFilter = 'all';
let currentIndex = 0;
let draftAnswer = null;
let completionFilter = null;
let toastTimer;

const questionPanel = document.querySelector('#questionPanel');
const homeView = document.querySelector('#homeView');
const subjectsView = document.querySelector('#subjectsView');
const mistakesView = document.querySelector('#mistakesView');
const toast = document.querySelector('#toast');

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // The practice flow still works if storage is unavailable.
  }
}

function getQuestions(filter = currentFilter) {
  return filter === 'all' ? DAILY_QUESTIONS : DAILY_QUESTIONS.filter((question) => question.subject === filter);
}

function getCurrentQuestion() {
  return getQuestions()[currentIndex];
}

function completedCount() {
  return DAILY_QUESTIONS.filter((question) => state.answers[question.id]).length;
}

function subjectCompleted(subject) {
  return DAILY_QUESTIONS.filter((question) => question.subject === subject && state.answers[question.id]).length;
}

function answeredCount() {
  return DAILY_QUESTIONS.filter((question) => state.answers[question.id]).length;
}

function correctCount() {
  return DAILY_QUESTIONS.filter((question) => state.answers[question.id]?.correct).length;
}

function recordActivity() {
  const today = todayKey();
  if (!state.activityDates.includes(today)) state.activityDates.push(today);
  state.activityDates = state.activityDates.slice(-60);
}

function getStreak() {
  const dates = new Set(state.activityDates);
  let cursor = new Date(`${todayKey()}T00:00:00`);
  let streak = 0;
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function normalize(value) {
  return String(value ?? '').trim().replace(/\s+/g, '').toLowerCase();
}

function isCorrect(question, value) {
  if (question.kind === 'input') return normalize(value) === normalize(question.answer);
  return Number(value) === Number(question.answer);
}

function answerText(question) {
  if (question.kind === 'input') return question.answerText || question.answer;
  return question.options[question.answer];
}

function subjectProgressMarkup(subject) {
  const total = DAILY_QUESTIONS.filter((question) => question.subject === subject).length;
  const done = subjectCompleted(subject);
  const percent = Math.round((done / total) * 100);
  const meta = SUBJECTS[subject];
  return `<div class="mini-subject">
    <span class="mini-subject-icon ${subject}">${meta.short}</span>
    <div class="mini-subject-body">
      <div class="mini-subject-name"><span>${meta.name}</span><em>${done} / ${total}</em></div>
      <div class="mini-progress"><span class="${meta.progressClass}" style="width:${percent}%"></span></div>
    </div>
  </div>`;
}

function updateDashboard() {
  const completed = completedCount();
  const answered = answeredCount();
  const accuracy = answered ? `${Math.round((correctCount() / answered) * 100)}%` : '—';
  const progress = Math.round((completed / DAILY_QUESTIONS.length) * 100);

  document.querySelector('#completedStat').textContent = completed;
  document.querySelector('#streakStat').textContent = getStreak();
  document.querySelector('#accuracyStat').textContent = accuracy;
  document.querySelector('#taskProgress').textContent = `${completed} / ${DAILY_QUESTIONS.length} 已完成`;
  document.querySelector('#mistakeCount').textContent = state.mistakes.length;
  document.querySelector('#mistakeBigCount').textContent = state.mistakes.length;
  document.querySelector('#weekProgressBar').style.width = `${progress}%`;
  document.querySelector('#weekProgressText').textContent = `${progress}%`;
  document.querySelector('#miniSubjectList').innerHTML = Object.keys(SUBJECTS).map(subjectProgressMarkup).join('');

  Object.keys(SUBJECTS).forEach((subject) => {
    const status = document.querySelector(`#${subject}CardStatus`);
    if (status) status.textContent = `${subjectCompleted(subject)} / 3`;
  });
}

function renderQuestion() {
  const questions = getQuestions();
  if (!questions.length) return;

  if (completionFilter === currentFilter) {
    questionPanel.innerHTML = `<div class="completed-banner">
      <div class="completed-check" aria-hidden="true">✓</div>
      <div><h3>这一组完成啦！</h3><p>你已经认真走完这一小段，休息一下，再去挑战下一组吧。</p><button class="primary-button" data-action="restart" type="button">再看一遍 <span>↻</span></button></div>
    </div>`;
    return;
  }

  const question = questions[currentIndex] || questions[0];
  if (currentIndex >= questions.length) currentIndex = questions.length - 1;
  const result = state.answers[question.id];
  const isAnswered = Boolean(result);
  const pending = draftAnswer && draftAnswer.id === question.id ? draftAnswer.value : null;
  const selected = isAnswered ? result.given : pending;
  const meta = SUBJECTS[question.subject];
  const numberText = `${currentIndex + 1} / ${questions.length}`;

  let mainContent = '';
  if (question.passage) mainContent += `<div class="question-reading">${question.passage}</div>`;
  if (question.kind === 'input') {
    mainContent += `<div class="fill-answer">
      <input id="answerInput" inputmode="numeric" autocomplete="off" value="${isAnswered ? String(result.given).replace(/"/g, '&quot;') : (pending ?? '')}" placeholder="${question.placeholder || '写出答案'}" aria-label="输入答案" ${isAnswered ? 'readonly' : ''} />
      ${question.unit ? `<span class="fill-unit">${question.unit}</span>` : ''}
    </div>`;
  } else {
    const letters = ['A', 'B', 'C', 'D'];
    mainContent += `<div class="options-grid" role="radiogroup" aria-label="答案选项">${question.options.map((option, index) => {
      const isSelected = Number(selected) === index;
      const isRight = isAnswered && index === question.answer;
      const isWrong = isAnswered && isSelected && !result.correct;
      const classes = ['option-button'];
      if (isSelected && !isAnswered) classes.push('selected');
      if (isRight) classes.push('correct');
      if (isWrong) classes.push('incorrect');
      return `<button class="${classes.join(' ')}" data-option="${index}" type="button" role="radio" aria-checked="${isSelected}" ${isAnswered ? 'disabled' : ''}><span class="option-letter">${letters[index]}</span><span>${option}</span></button>`;
    }).join('')}</div>`;
  }

  let feedback = '';
  if (isAnswered) {
    if (result.correct) {
      feedback = `<div class="answer-feedback"><span class="feedback-icon">✓</span><span><strong>答对啦！</strong> ${question.explanation}</span></div>`;
    } else {
      feedback = `<div class="answer-feedback wrong"><span class="feedback-icon">!</span><span><strong>再记一记：</strong>正确答案是“${answerText(question)}”。${question.explanation}</span></div>`;
    }
  }

  const action = isAnswered
    ? `${result.correct ? '' : '<button class="ghost-button" data-action="retry" type="button">再答一次</button>'}<button class="next-button" data-action="next" type="button">${currentIndex === questions.length - 1 ? '完成这组' : '下一题'} <span>→</span></button>`
    : `<button class="check-button" data-action="check" type="button" disabled>检查答案</button>`;

  questionPanel.innerHTML = `<div class="question-top">
      <span class="question-label ${meta.labelClass}"><span class="label-icon">${question.icon}</span>${meta.name} · ${question.topic}</span>
      <span class="question-number">第 ${numberText} 题</span>
    </div>
    <h3>${question.prompt}</h3>
    ${question.subtext ? `<p class="question-subtext">${question.subtext}</p>` : ''}
    ${mainContent}
    <div class="question-bottom">
      ${feedback || '<span class="answer-feedback"></span>'}
      <div class="question-actions">
        ${currentIndex > 0 ? '<button class="ghost-button" data-action="previous" type="button">← 上一题</button>' : ''}
        ${action}
      </div>
    </div>`;

  const checkButton = questionPanel.querySelector('[data-action="check"]');
  if (checkButton) {
    const hasSelection = question.kind === 'input' ? Boolean(pending) : pending !== null;
    checkButton.disabled = !hasSelection;
  }
}

function setFilter(filter, index = 0) {
  currentFilter = filter;
  currentIndex = Math.max(0, Math.min(index, getQuestions(filter).length - 1));
  draftAnswer = null;
  completionFilter = null;
  document.querySelectorAll('.subject-tab').forEach((tab) => {
    const active = tab.dataset.filter === filter;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  renderQuestion();
}

function openPractice(filter = 'all') {
  showView('home');
  const questions = getQuestions(filter);
  const firstUnanswered = questions.findIndex((question) => !state.answers[question.id]);
  setFilter(filter, firstUnanswered >= 0 ? firstUnanswered : 0);
  questionPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function showView(viewName) {
  const views = { home: homeView, subjects: subjectsView, mistakes: mistakesView };
  Object.entries(views).forEach(([name, view]) => {
    const active = name === viewName;
    view.classList.toggle('active', active);
    view.hidden = !active;
  });
  document.querySelectorAll('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  const labels = { home: '今日练习', subjects: '按学科练习', mistakes: '错题本' };
  document.querySelector('#breadcrumbCurrent').textContent = labels[viewName];
  if (viewName === 'mistakes') renderMistakes();
  if (viewName === 'subjects') updateDashboard();
}

function checkAnswer() {
  const question = getCurrentQuestion();
  if (!question || state.answers[question.id]) return;

  let value = draftAnswer && draftAnswer.id === question.id ? draftAnswer.value : null;
  if (question.kind === 'input') {
    const input = document.querySelector('#answerInput');
    value = input ? input.value.trim() : value;
  }
  if (value === null || value === '') {
    showToast('先选一个答案，再来检查吧');
    return;
  }

  const correct = isCorrect(question, value);
  state.answers[question.id] = { correct, given: value };
  if (correct) {
    state.mistakes = state.mistakes.filter((id) => id !== question.id);
    showToast('答对啦，给自己一个小勾勾 ✓');
  } else {
    if (!state.mistakes.includes(question.id)) state.mistakes.push(question.id);
    showToast('没关系，看一看解析就会了');
  }
  recordActivity();
  saveState();
  draftAnswer = null;
  updateDashboard();
  renderQuestion();
}

function goNext() {
  const questions = getQuestions();
  if (currentIndex < questions.length - 1) {
    currentIndex += 1;
    draftAnswer = null;
    renderQuestion();
    questionPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    completionFilter = currentFilter;
    renderQuestion();
    updateDashboard();
    showToast('这一组练习完成啦！');
  }
}

function goPrevious() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    draftAnswer = null;
    completionFilter = null;
    renderQuestion();
  }
}

function retryQuestion() {
  const question = getCurrentQuestion();
  if (!question) return;
  delete state.answers[question.id];
  saveState();
  draftAnswer = null;
  completionFilter = null;
  renderQuestion();
}

function restartGroup() {
  completionFilter = null;
  currentIndex = 0;
  draftAnswer = null;
  renderQuestion();
}

function renderMistakes() {
  const list = document.querySelector('#mistakesList');
  const mistakes = state.mistakes.map((id) => DAILY_QUESTIONS.find((question) => question.id === id)).filter(Boolean);
  if (!mistakes.length) {
    list.innerHTML = `<div class="empty-mistakes"><div class="empty-doodle" aria-hidden="true">✓</div><h2>现在还没有错题</h2><p>认真作答，错题本会帮你记住需要再看一眼的题。</p></div>`;
    return;
  }
  list.innerHTML = mistakes.map((question, index) => {
    const meta = SUBJECTS[question.subject];
    return `<article class="mistake-item">
      <span class="mistake-item-number">${String(index + 1).padStart(2, '0')}</span>
      <div class="mistake-item-info"><div class="mistake-item-meta"><span class="mistake-dot"></span>${meta.name} · ${question.topic}</div><h3>${question.prompt}</h3></div>
      <button class="review-button" data-review-id="${question.id}" type="button">复习这题</button>
    </article>`;
  }).join('');
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateReport() {
  const completed = completedCount();
  const percent = Math.round((completed / DAILY_QUESTIONS.length) * 100);
  const reportPercent = document.querySelector('#reportPercent');
  const ring = document.querySelector('#reportRing');
  reportPercent.textContent = `${percent}%`;
  ring.style.borderRightColor = percent > 50 ? 'var(--teal-dark)' : '#bce2d5';
  ring.style.borderTopColor = percent > 25 ? 'var(--teal-dark)' : '#bce2d5';
  document.querySelector('#reportSummaryTitle').textContent = completed === 0 ? '还没有开始' : completed === DAILY_QUESTIONS.length ? '今日任务完成！' : `已经完成 ${completed} 道题`;
  document.querySelector('#reportSummaryText').textContent = completed === 0 ? '陪孩子先完成一道题，给今天一个轻松的开始吧。' : completed === DAILY_QUESTIONS.length ? '三科都留下了认真练习的脚印，今天表现很棒！' : '保持这个节奏，做完以后记得看一眼错题解析。';
  document.querySelector('#reportSubjects').innerHTML = Object.keys(SUBJECTS).map((subject) => {
    const done = subjectCompleted(subject);
    const percentSubject = Math.round((done / 3) * 100);
    const meta = SUBJECTS[subject];
    const color = subject === 'chinese' ? 'var(--coral)' : subject === 'math' ? 'var(--yellow)' : 'var(--lilac)';
    return `<div class="report-subject-row"><span>${meta.name}</span><div class="report-bar"><span style="width:${percentSubject}%;background:${color}"></span></div><strong>${done}/3</strong></div>`;
  }).join('');
}

// Navigation and interaction are delegated so dynamically-rendered question controls work too.
document.addEventListener('click', (event) => {
  const navItem = event.target.closest('.nav-item');
  if (navItem) {
    showView(navItem.dataset.view);
    return;
  }

  const tab = event.target.closest('.subject-tab');
  if (tab) {
    setFilter(tab.dataset.filter);
    return;
  }

  const subjectStart = event.target.closest('[data-subject-start]');
  if (subjectStart) {
    openPractice(subjectStart.dataset.subjectStart);
    return;
  }

  const option = event.target.closest('[data-option]');
  if (option && !option.disabled) {
    draftAnswer = { id: getCurrentQuestion().id, value: Number(option.dataset.option) };
    renderQuestion();
    return;
  }

  const action = event.target.closest('[data-action]');
  if (action) {
    const type = action.dataset.action;
    if (type === 'check') checkAnswer();
    if (type === 'next') goNext();
    if (type === 'previous') goPrevious();
    if (type === 'retry') retryQuestion();
    if (type === 'restart') restartGroup();
    return;
  }

  const review = event.target.closest('[data-review-id]');
  if (review) {
    const question = DAILY_QUESTIONS.find((item) => item.id === review.dataset.reviewId);
    const index = getQuestions(question.subject).findIndex((item) => item.id === question.id);
    showView('home');
    setFilter(question.subject, index);
    questionPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  if (event.target.closest('[data-close-modal]')) {
    document.querySelector('#reportModal').hidden = true;
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'answerInput') {
    draftAnswer = { id: getCurrentQuestion().id, value: event.target.value };
    const checkButton = questionPanel.querySelector('[data-action="check"]');
    if (checkButton) checkButton.disabled = !event.target.value.trim();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.id === 'answerInput') checkAnswer();
  if (event.key === 'Escape') document.querySelector('#reportModal').hidden = true;
});

document.querySelector('#startToday').addEventListener('click', () => openPractice('all'));
document.querySelector('#openReport').addEventListener('click', () => {
  updateReport();
  document.querySelector('#reportModal').hidden = false;
});

updateDashboard();
renderQuestion();
renderMistakes();
