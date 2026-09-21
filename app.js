/*
 * The question bank is deliberately tied to the checked unit/chapter names.
 *
 * Sources and version boundaries are documented in README.md and in the notice
 * on the page. In particular, Shanghai schools may use different English
 * books. The English items below only practise words that appear in the
 * publicly checked unit titles; they do not pretend to reproduce an unverified
 * text or word list.
 */
const DAILY_QUESTIONS = [
  // 统编版（2024）五四制·语文二年级上册：八个单元
  {
    id: 'ch-u1',
    subject: 'chinese',
    unit: '第一单元·阅读',
    lesson: '《我是什么》',
    topic: '课文理解',
    icon: '语',
    prompt: '《我是什么》里，“我”可以变成下面哪一种？',
    options: ['云、雨、冰雹或雪', '小鸟、树和花', '书包、铅笔和橡皮'],
    answer: 0,
    explanation: '课文里的“我”是水，水会变成云、雨、冰雹和雪。'
  },
  {
    id: 'ch-u2',
    subject: 'chinese',
    unit: '第二单元·识字',
    lesson: '《田家四季歌》',
    topic: '课文理解',
    icon: '语',
    prompt: '“秋季里，稻上场，谷像黄金粒粒香”写的是哪个季节？',
    options: ['春季', '秋季', '冬季'],
    answer: 1,
    explanation: '“稻上场，谷像黄金”写的是秋天丰收的景象。'
  },
  {
    id: 'ch-u3',
    subject: 'chinese',
    unit: '第三单元·阅读',
    lesson: '《数星星的孩子》',
    topic: '课文理解',
    icon: '语',
    prompt: '《数星星的孩子》里的孩子是谁？',
    options: ['张衡', '李白', '鲁班'],
    answer: 0,
    explanation: '课文写的是小时候喜欢观察星星、后来成为天文学家的张衡。'
  },
  {
    id: 'ch-u4',
    subject: 'chinese',
    unit: '第四单元·阅读',
    lesson: '《黄山奇石》',
    topic: '课文理解',
    icon: '语',
    prompt: '《黄山奇石》中的“仙桃石”看起来像什么？',
    options: ['一个大桃子', '一只小船', '一头狮子'],
    answer: 0,
    explanation: '课文把形状像桃子的巨石叫作“仙桃石”。'
  },
  {
    id: 'ch-u5',
    subject: 'chinese',
    unit: '第五单元·阅读',
    lesson: '《坐井观天》',
    topic: '寓言理解',
    icon: '语',
    prompt: '《坐井观天》中，青蛙认为天有多大？',
    options: ['井口那么大', '房间那么大', '大海那么大'],
    answer: 0,
    explanation: '青蛙一直坐在井里，所以它以为天只有井口那么大。'
  },
  {
    id: 'ch-u6',
    subject: 'chinese',
    unit: '第六单元·阅读',
    lesson: '《难忘的泼水节》',
    topic: '课文理解',
    icon: '语',
    prompt: '《难忘的泼水节》里，和傣族人民一起过节的伟人是？',
    options: ['周恩来', '张衡', '曹冲'],
    answer: 0,
    explanation: '课文写周恩来总理和傣族人民一起度过了难忘的泼水节。'
  },
  {
    id: 'ch-u7',
    subject: 'chinese',
    unit: '第七单元·阅读',
    lesson: '《雪孩子》',
    topic: '课文理解',
    icon: '语',
    prompt: '《雪孩子》中，雪孩子帮助了谁？',
    options: ['小白兔', '小松鼠', '小青蛙'],
    answer: 0,
    explanation: '小白兔家着火时，雪孩子勇敢地去救小白兔。'
  },
  {
    id: 'ch-u8',
    subject: 'chinese',
    unit: '第八单元·阅读',
    lesson: '《纸船和风筝》',
    topic: '课文理解',
    icon: '语',
    prompt: '《纸船和风筝》中的纸船和风筝带来了什么？',
    options: ['松鼠和小熊的友谊', '一场热闹的比赛', '一顿香甜的午餐'],
    answer: 0,
    explanation: '纸船和风筝让松鼠和小熊传递心意，重新成为好朋友。'
  },

  // 沪少儿沪教版数学（试用本）二年级第一学期：七个单元
  {
    id: 'ma-u1',
    subject: 'math',
    unit: '第一单元·100以内数的加减法（二）',
    lesson: '两位数退位减法',
    topic: '口算与笔算',
    icon: '＋',
    kind: 'input',
    prompt: '算一算：52 − 27 =',
    answer: '25',
    answerText: '25',
    placeholder: '写出得数',
    explanation: '个位 2 不够减 7，要从十位借 1 个十；52－27＝25。'
  },
  {
    id: 'ma-u2',
    subject: 'math',
    unit: '第二单元·欢乐购物街',
    lesson: '认识人民币与购物',
    topic: '生活中的数学',
    icon: '＋',
    prompt: '一支铅笔 3 元，一块橡皮 2 元，买这两样一共要几元？',
    options: ['5 元', '6 元', '1 元'],
    answer: 0,
    explanation: '把两样物品的价钱合起来：3＋2＝5（元）。'
  },
  {
    id: 'ma-u3',
    subject: 'math',
    unit: '第三单元·表内乘法',
    lesson: '乘法引入与乘法口诀',
    topic: '乘法',
    icon: '＋',
    prompt: '5 个 2 相加，5×2 的得数是多少？',
    options: ['7', '10', '12'],
    answer: 1,
    explanation: '5×2 表示 5 个 2 相加，2＋2＋2＋2＋2＝10。'
  },
  {
    id: 'ma-u4',
    subject: 'math',
    unit: '第四单元·我的学校我的家',
    lesson: '方位与位置',
    topic: '方向辨认',
    icon: '＋',
    prompt: '小明站在教室门口，图书馆在他的右边。图书馆在他的哪边？',
    options: ['右边', '左边', '后面'],
    answer: 0,
    explanation: '题目已经说明图书馆在小明的右边，所以答案是“右边”。'
  },
  {
    id: 'ma-u5',
    subject: 'math',
    unit: '第五单元·分类',
    lesson: '按特征分类',
    topic: '分类整理',
    icon: '＋',
    prompt: '下面哪一组可以分在“水果”一类？',
    options: ['苹果、香蕉', '铅笔、橡皮', '书包、尺'],
    answer: 0,
    explanation: '苹果和香蕉都有“水果”这个共同特征，可以分为一类。'
  },
  {
    id: 'ma-u6',
    subject: 'math',
    unit: '第六单元·数学广场',
    lesson: '有序思考与搭配',
    topic: '数学思考',
    icon: '＋',
    prompt: '有红、黄两顶帽子和蓝、白两条围巾，选一顶帽子和一条围巾，一共有几种搭配？',
    options: ['2 种', '4 种', '6 种'],
    answer: 1,
    explanation: '每顶帽子都能和 2 条围巾搭配：2×2＝4（种）。'
  },
  {
    id: 'ma-u7',
    subject: 'math',
    unit: '第七单元·复习',
    lesson: '本册知识回顾',
    topic: '综合复习',
    icon: '＋',
    kind: 'input',
    prompt: '复习一下：36＋24＝',
    answer: '60',
    answerText: '60',
    placeholder: '写出得数',
    explanation: '先算 30＋20＝50，再算 6＋4＝10，合起来是 60。'
  },

  // 沪教版（五四制·2024）新教材公开目录中的单元标题词。
  // 上海官方用书目录同时提示英语由学校选择版本，所以这里不扩展未核对的课文词汇。
  {
    id: 'en-u1',
    subject: 'english',
    unit: 'Unit 1 · My morning',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 1 “My morning” 里的 morning 是什么意思？',
    options: ['早晨', '房间', '水果'],
    answer: 0,
    explanation: 'morning 是“早晨”。本题只练习已核对的单元标题词。'
  },
  {
    id: 'en-u2',
    subject: 'english',
    unit: 'Unit 2 · My room',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 2 “My room” 里的 room 是什么意思？',
    options: ['房间', '海洋', '季节'],
    answer: 0,
    explanation: 'room 是“房间”。本题只练习已核对的单元标题词。'
  },
  {
    id: 'en-u3',
    subject: 'english',
    unit: 'Unit 3 · On the way',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 3 “On the way” 的意思是：',
    options: ['在路上', '在天空中', '在海里'],
    answer: 0,
    explanation: 'on the way 是“在路上”。本题只练习已核对的单元标题短语。'
  },
  {
    id: 'en-u4',
    subject: 'english',
    unit: 'Unit 4 · Playing sports',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 4 “Playing sports” 的意思和哪一项最接近？',
    options: ['做运动', '吃水果', '看星星'],
    answer: 0,
    explanation: 'playing sports 是“做运动”。本题只练习已核对的单元标题短语。'
  },
  {
    id: 'en-u5',
    subject: 'english',
    unit: 'Unit 5 · In the sky',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 5 “In the sky” 里的 sky 是什么意思？',
    options: ['天空', '房间', '水果'],
    answer: 0,
    explanation: 'sky 是“天空”。本题只练习已核对的单元标题词。'
  },
  {
    id: 'en-u6',
    subject: 'english',
    unit: 'Unit 6 · In the sea',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 6 “In the sea” 里的 sea 是什么意思？',
    options: ['海洋', '学校', '早晨'],
    answer: 0,
    explanation: 'sea 是“海洋”。本题只练习已核对的单元标题词。'
  },
  {
    id: 'en-u7',
    subject: 'english',
    unit: 'Unit 7 · Seasons',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 7 “Seasons” 主要和什么有关？',
    options: ['季节', '房间', '运动'],
    answer: 0,
    explanation: 'Seasons 是“季节”。本题只练习已核对的单元标题词。'
  },
  {
    id: 'en-u8',
    subject: 'english',
    unit: 'Unit 8 · Yummy fruit',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: 'Unit 8 “Yummy fruit” 里的 fruit 是什么意思？',
    options: ['水果', '天空', '海洋'],
    answer: 0,
    explanation: 'fruit 是“水果”。本题只练习已核对的单元标题词。'
  },
  {
    id: 'en-u9',
    subject: 'english',
    unit: 'Unit 9 · The five senses',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: '“The five senses” 里的 five 是几？',
    options: ['3', '5', '10'],
    answer: 1,
    explanation: 'five 是“5”。本题只练习已核对的单元标题词。'
  },
  {
    id: 'en-u10',
    subject: 'english',
    unit: 'Unit 10 · This is me',
    lesson: '单元标题',
    topic: '标题词义',
    icon: 'A',
    titleOnly: true,
    prompt: '“This is me” 的意思是：',
    options: ['这是我', '这是我的房间', '这是水果'],
    answer: 0,
    explanation: 'This is me 是“这是我”。本题只练习已核对的单元标题短语。'
  }
];

const SUBJECTS = {
  chinese: { name: '语文', short: '语', labelClass: 'chinese-label', progressClass: 'chinese-progress' },
  math: { name: '数学', short: '＋', labelClass: 'math-label', progressClass: 'math-progress' },
  english: { name: '英语', short: 'A', labelClass: 'english-label', progressClass: 'english-progress' }
};
const SUBJECT_ORDER = Object.keys(SUBJECTS);
const QUESTION_BY_ID = new Map(DAILY_QUESTIONS.map((question) => [question.id, question]));
const STORAGE_KEY = 'little-practice-station-v2';

const todayKey = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function emptyState() {
  return { answers: {}, mistakes: [], activityDates: [] };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const answers = saved.answers && typeof saved.answers === 'object' ? saved.answers : {};
    const validAnswers = Object.fromEntries(Object.entries(answers).filter(([id, value]) => QUESTION_BY_ID.has(id) && value && typeof value === 'object'));
    const mistakes = Array.isArray(saved.mistakes)
      ? saved.mistakes.filter((id) => QUESTION_BY_ID.has(id))
      : [];
    const activityDates = Array.isArray(saved.activityDates)
      ? saved.activityDates.filter((date) => typeof date === 'string').slice(-60)
      : [];
    return { answers: validAnswers, mistakes: [...new Set(mistakes)], activityDates };
  } catch (error) {
    return emptyState();
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

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function getQuestions(filter = currentFilter) {
  return filter === 'all' ? DAILY_QUESTIONS : DAILY_QUESTIONS.filter((question) => question.subject === filter);
}

function getCurrentQuestion() {
  const questions = getQuestions();
  return questions[currentIndex];
}

function completedCount() {
  return DAILY_QUESTIONS.filter((question) => state.answers[question.id]).length;
}

function subjectQuestions(subject) {
  return DAILY_QUESTIONS.filter((question) => question.subject === subject);
}

function subjectCompleted(subject) {
  return subjectQuestions(subject).filter((question) => state.answers[question.id]).length;
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
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  let streak = 0;
  while (dates.has(formatDate(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
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
  const total = subjectQuestions(subject).length;
  const done = subjectCompleted(subject);
  const percent = total ? Math.round((done / total) * 100) : 0;
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
  const total = DAILY_QUESTIONS.length;
  const completed = completedCount();
  const answered = answeredCount();
  const accuracy = answered ? `${Math.round((correctCount() / answered) * 100)}%` : '—';
  const progress = total ? Math.round((completed / total) * 100) : 0;

  document.querySelector('#completedStat').textContent = completed;
  document.querySelector('#totalQuestionCount').textContent = total;
  document.querySelector('#streakStat').textContent = getStreak();
  document.querySelector('#accuracyStat').textContent = accuracy;
  document.querySelector('#taskProgress').textContent = `${completed} / ${total} 已完成`;
  document.querySelector('#mistakeCount').textContent = state.mistakes.length;
  document.querySelector('#mistakeBigCount').textContent = state.mistakes.length;
  document.querySelector('#weekProgressBar').style.width = `${progress}%`;
  document.querySelector('#weekProgressText').textContent = `${progress}%`;
  document.querySelector('#miniSubjectList').innerHTML = SUBJECT_ORDER.map(subjectProgressMarkup).join('');

  document.querySelector('#allQuestionCount').textContent = `${total} 题`;
  SUBJECT_ORDER.forEach((subject) => {
    const subjectTotal = subjectQuestions(subject).length;
    const status = document.querySelector(`#${subject}CardStatus`);
    const count = document.querySelector(`#${subject}QuestionCount`);
    if (status) status.textContent = `${subjectCompleted(subject)} / ${subjectTotal}`;
    if (count) count.textContent = `${subjectTotal} 题`;
  });
}

function renderQuestion() {
  const questions = getQuestions();
  if (!questions.length) return;
  if (currentIndex >= questions.length) currentIndex = questions.length - 1;
  if (currentIndex < 0) currentIndex = 0;

  if (completionFilter === currentFilter) {
    questionPanel.innerHTML = `<div class="completed-banner">
      <div class="completed-check" aria-hidden="true">✓</div>
      <div><h3>这一组完成啦！</h3><p>你已经认真走完这一小段，休息一下，再去挑战下一组吧。</p><button class="primary-button" data-action="restart" type="button">再看一遍 <span>↻</span></button></div>
    </div>`;
    return;
  }

  const question = questions[currentIndex];
  const result = state.answers[question.id];
  const isAnswered = Boolean(result);
  const pending = draftAnswer && draftAnswer.id === question.id ? draftAnswer.value : null;
  const selected = isAnswered ? result.given : pending;
  const meta = SUBJECTS[question.subject];
  const numberText = `${currentIndex + 1} / ${questions.length}`;

  let mainContent = '';
  if (question.passage) mainContent += `<div class="question-reading">${escapeHTML(question.passage)}</div>`;
  if (question.kind === 'input') {
    const inputValue = isAnswered ? result.given : (pending ?? '');
    mainContent += `<div class="fill-answer">
      <input id="answerInput" inputmode="numeric" autocomplete="off" value="${escapeHTML(inputValue)}" placeholder="${escapeHTML(question.placeholder || '写出答案')}" aria-label="输入答案" ${isAnswered ? 'readonly' : ''} />
      ${question.unitLabel ? `<span class="fill-unit">${escapeHTML(question.unitLabel)}</span>` : ''}
    </div>`;
  } else {
    const letters = ['A', 'B', 'C', 'D'];
    mainContent += `<div class="options-grid" role="radiogroup" aria-label="答案选项">${question.options.map((option, index) => {
      const isSelected = selected !== null && selected !== undefined && Number(selected) === index;
      const isRight = isAnswered && index === question.answer;
      const isWrong = isAnswered && isSelected && !result.correct;
      const classes = ['option-button'];
      if (isSelected && !isAnswered) classes.push('selected');
      if (isRight) classes.push('correct');
      if (isWrong) classes.push('incorrect');
      return `<button class="${classes.join(' ')}" data-option="${index}" type="button" role="radio" aria-checked="${isSelected}" ${isAnswered ? 'disabled' : ''}><span class="option-letter">${letters[index]}</span><span>${escapeHTML(option)}</span></button>`;
    }).join('')}</div>`;
  }

  let feedback = '';
  if (isAnswered) {
    if (result.correct) {
      feedback = `<div class="answer-feedback"><span class="feedback-icon">✓</span><span><strong>答对啦！</strong> ${escapeHTML(question.explanation)}</span></div>`;
    } else {
      feedback = `<div class="answer-feedback wrong"><span class="feedback-icon">!</span><span><strong>再记一记：</strong>正确答案是“${escapeHTML(answerText(question))}”。${escapeHTML(question.explanation)}</span></div>`;
    }
  }

  const action = isAnswered
    ? `${result.correct ? '' : '<button class="ghost-button" data-action="retry" type="button">再答一次</button>'}<button class="next-button" data-action="next" type="button">${currentIndex === questions.length - 1 ? '完成这组' : '下一题'} <span>→</span></button>`
    : `<button class="check-button" data-action="check" type="button" disabled>检查答案</button>`;
  const titleOnlyNote = question.titleOnly
    ? '<p class="question-subtext english-source-note">英语版本提示：本题只依据已核对的单元标题，不扩展未核对课文。</p>'
    : '';

  questionPanel.innerHTML = `<div class="question-top">
      <span class="question-label ${meta.labelClass}"><span class="label-icon">${escapeHTML(question.icon)}</span>${escapeHTML(meta.name)} · ${escapeHTML(question.unit)}</span>
      <span class="question-number">第 ${numberText} 题</span>
    </div>
    <div class="question-lesson">${escapeHTML(question.lesson)} · ${escapeHTML(question.topic)}</div>
    <h3>${escapeHTML(question.prompt)}</h3>
    ${titleOnlyNote}
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
    const hasSelection = question.kind === 'input' ? Boolean(pending) : pending !== null && pending !== undefined;
    checkButton.disabled = !hasSelection;
  }
}

function setFilter(filter, index = 0) {
  currentFilter = filter;
  const questions = getQuestions(filter);
  currentIndex = questions.length ? Math.max(0, Math.min(index, questions.length - 1)) : 0;
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
  state.mistakes = state.mistakes.filter((id) => id !== question.id);
  saveState();
  draftAnswer = null;
  completionFilter = null;
  updateDashboard();
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
  const mistakes = state.mistakes.map((id) => QUESTION_BY_ID.get(id)).filter(Boolean);
  if (!mistakes.length) {
    list.innerHTML = `<div class="empty-mistakes"><div class="empty-doodle" aria-hidden="true">✓</div><h2>现在还没有错题</h2><p>认真作答，错题本会帮你记住需要再看一眼的题。</p></div>`;
    return;
  }
  list.innerHTML = mistakes.map((question, index) => {
    const meta = SUBJECTS[question.subject];
    return `<article class="mistake-item">
      <span class="mistake-item-number">${String(index + 1).padStart(2, '0')}</span>
      <div class="mistake-item-info"><div class="mistake-item-meta"><span class="mistake-dot"></span>${escapeHTML(meta.name)} · ${escapeHTML(question.unit)}</div><h3>${escapeHTML(question.prompt)}</h3></div>
      <button class="review-button" data-review-id="${escapeHTML(question.id)}" type="button">复习这题</button>
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
  const total = DAILY_QUESTIONS.length;
  const completed = completedCount();
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const reportPercent = document.querySelector('#reportPercent');
  const ring = document.querySelector('#reportRing');
  reportPercent.textContent = `${percent}%`;
  ring.style.borderRightColor = percent > 50 ? 'var(--teal-dark)' : '#bce2d5';
  ring.style.borderTopColor = percent > 25 ? 'var(--teal-dark)' : '#bce2d5';
  document.querySelector('#reportSummaryTitle').textContent = completed === 0 ? '还没有开始' : completed === total ? '今日任务完成！' : `已经完成 ${completed} 道题`;
  document.querySelector('#reportSummaryText').textContent = completed === 0 ? '陪孩子先完成一道题，给今天一个轻松的开始吧。' : completed === total ? '三科都留下了认真练习的脚印，今天表现很棒！' : '保持这个节奏，做完以后记得看一眼错题解析。';
  document.querySelector('#reportSubjects').innerHTML = SUBJECT_ORDER.map((subject) => {
    const done = subjectCompleted(subject);
    const subjectTotal = subjectQuestions(subject).length;
    const percentSubject = subjectTotal ? Math.round((done / subjectTotal) * 100) : 0;
    const meta = SUBJECTS[subject];
    const color = subject === 'chinese' ? 'var(--coral)' : subject === 'math' ? 'var(--yellow)' : 'var(--lilac)';
    return `<div class="report-subject-row"><span>${meta.name}</span><div class="report-bar"><span style="width:${percentSubject}%;background:${color}"></span></div><strong>${done}/${subjectTotal}</strong></div>`;
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
    const question = getCurrentQuestion();
    if (!question) return;
    draftAnswer = { id: question.id, value: Number(option.dataset.option) };
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
    const question = QUESTION_BY_ID.get(review.dataset.reviewId);
    if (!question) return;
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
    const question = getCurrentQuestion();
    if (!question) return;
    draftAnswer = { id: question.id, value: event.target.value };
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
