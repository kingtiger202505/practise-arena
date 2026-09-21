/*
 * Unit practice packs. The first three units of each subject are the active
 * beginning-of-term scope requested by the parent. Most active units have twenty
 * 5-point items; the math Unit 1 extension pack uses mixed points but still
 * totals 100 points.
 *
 * Chinese questions use checked 2024 textbook texts and stories. Mathematics
 * questions use the checked unit lesson topics. The English school version has
 * been confirmed as the Shanghai five-four 2024 new textbook, but the public
 * sources do not expose its full student word lists; therefore the first three
 * English packs remain explicitly title-word practice rather than invented
 * textbook dialogues.
 */
const SUBJECTS = {
  chinese: { name: '语文', short: '语', labelClass: 'chinese-label', progressClass: 'chinese-progress' },
  math: { name: '数学', short: '＋', labelClass: 'math-label', progressClass: 'math-progress' },
  english: { name: '英语', short: 'A', labelClass: 'english-label', progressClass: 'english-progress' }
};
const SUBJECT_ORDER = Object.keys(SUBJECTS);

const UNIT_CATALOG = {
  chinese: [
    { id: 'ch-u1', title: '第一单元·阅读', lessons: '小蝌蚪找妈妈、我是什么、植物妈妈有办法', available: true },
    { id: 'ch-u2', title: '第二单元·识字', lessons: '场景歌、树之歌、拍手歌、田家四季歌', available: true },
    { id: 'ch-u3', title: '第三单元·阅读', lessons: '彩虹、去外婆家、数星星的孩子', available: true },
    { id: 'ch-u4', title: '第四单元·阅读', lessons: '古诗二首、黄山奇石、日月潭、葡萄沟', available: false },
    { id: 'ch-u5', title: '第五单元·阅读', lessons: '坐井观天、寒号鸟、我要的是葫芦', available: false },
    { id: 'ch-u6', title: '第六单元·阅读', lessons: '八角楼上、朱德的扁担、难忘的泼水节、刘胡兰', available: false },
    { id: 'ch-u7', title: '第七单元·阅读', lessons: '古诗二首（江雪、敕勒歌）、雾在哪里、雪孩子', available: false },
    { id: 'ch-u8', title: '第八单元·阅读', lessons: '称赞、纸船和风筝、快乐的小河', available: false }
  ],
  math: [
    { id: 'ma-u1', title: '第一单元·100以内数的加减法（二）', lessons: '两位数加减、进退位、错例辨析与拓展', available: true },
    { id: 'ma-u2', title: '第二单元·欢乐购物街', lessons: '认识人民币、一起来购物', available: true },
    { id: 'ma-u3', title: '第三单元·表内乘法', lessons: '乘法引入、5的乘法、2、4、8的乘法、7的乘法', available: true },
    { id: 'ma-u4', title: '第四单元·我的学校我的家', lessons: '方位与位置', available: false },
    { id: 'ma-u5', title: '第五单元·分类', lessons: '按特征分类', available: false },
    { id: 'ma-u6', title: '第六单元·数学广场', lessons: '有序思考与搭配', available: false },
    { id: 'ma-u7', title: '第七单元·复习', lessons: '本册知识回顾', available: false }
  ],
  english: [
    { id: 'en-u1', title: 'Unit 1 · My morning', lessons: '标题词义100分入门练习', available: true, titleOnly: true },
    { id: 'en-u2', title: 'Unit 2 · My room', lessons: '标题词义100分入门练习', available: true, titleOnly: true },
    { id: 'en-u3', title: 'Unit 3 · On the way', lessons: '标题词义100分入门练习', available: true, titleOnly: true },
    { id: 'en-u4', title: 'Unit 4 · Playing sports', lessons: '待按课本正文核对', available: false, titleOnly: true },
    { id: 'en-u5', title: 'Unit 5 · In the sky', lessons: '待按课本正文核对', available: false, titleOnly: true },
    { id: 'en-u6', title: 'Unit 6 · In the sea', lessons: '待按课本正文核对', available: false, titleOnly: true },
    { id: 'en-u7', title: 'Unit 7 · Seasons', lessons: '待按课本正文核对', available: false, titleOnly: true },
    { id: 'en-u8', title: 'Unit 8 · Yummy fruit', lessons: '待按课本正文核对', available: false, titleOnly: true },
    { id: 'en-u9', title: 'Unit 9 · The five senses', lessons: '待按课本正文核对', available: false, titleOnly: true },
    { id: 'en-u10', title: 'Unit 10 · This is me', lessons: '待按课本正文核对', available: false, titleOnly: true }
  ]
};
const UNIT_INFO = Object.fromEntries(SUBJECT_ORDER.flatMap((subject) => UNIT_CATALOG[subject].map((unit) => [unit.id, { ...unit, subject }])));
const STARTER_UNIT_IDS = SUBJECT_ORDER.map((subject) => UNIT_CATALOG[subject][0].id);
const ACTIVE_UNIT_IDS = SUBJECT_ORDER.flatMap((subject) => UNIT_CATALOG[subject].filter((unit) => unit.available).map((unit) => unit.id));

function makeChoice(id, unitId, lesson, prompt, options, answer, explanation, extra = {}) {
  const info = UNIT_INFO[unitId];
  return {
    id,
    subject: info.subject,
    unitId,
    unit: info.title,
    lesson,
    topic: extra.topic || '单元练习',
    icon: SUBJECTS[info.subject].short,
    points: 5,
    typeLabel: extra.typeLabel || '选择题',
    prompt,
    options,
    answer,
    explanation,
    ...extra
  };
}

function makeInput(id, unitId, lesson, prompt, answer, explanation, extra = {}) {
  const info = UNIT_INFO[unitId];
  return {
    id,
    subject: info.subject,
    unitId,
    unit: info.title,
    lesson,
    topic: extra.topic || '单元练习',
    icon: SUBJECTS[info.subject].short,
    points: 5,
    typeLabel: extra.typeLabel || '填空题',
    kind: 'input',
    prompt,
    answer: String(answer),
    answerText: String(answer),
    placeholder: '写出答案',
    explanation,
    ...extra
  };
}

function makeTextInput(id, unitId, lesson, prompt, answer, explanation, extra = {}) {
  return makeInput(id, unitId, lesson, prompt, answer, explanation, { inputMode: 'text', ...extra });
}

function makeJudge(id, unitId, lesson, prompt, isTrue, explanation, extra = {}) {
  return makeChoice(id, unitId, lesson, prompt, ['正确', '错误'], isTrue ? 0 : 1, explanation, { kind: 'judge', typeLabel: '判断题', ...extra });
}

function makeOrder(id, unitId, lesson, prompt, items, answer, explanation, extra = {}) {
  const info = UNIT_INFO[unitId];
  return {
    id,
    subject: info.subject,
    unitId,
    unit: info.title,
    lesson,
    topic: extra.topic || '单元练习',
    icon: SUBJECTS[info.subject].short,
    points: 5,
    typeLabel: extra.typeLabel || '排序题',
    kind: 'order',
    prompt,
    items,
    answer,
    answerText: answer.map((index) => items[index]).join(' → '),
    explanation,
    ...extra
  };
}

const DAILY_QUESTIONS = [
  // 语文第一单元：小蝌蚪找妈妈、我是什么、植物妈妈有办法
  makeChoice('ch-u1-01', 'ch-u1', '《小蝌蚪找妈妈》', '小蝌蚪在找妈妈的过程中，先长出了哪一部分？', ['两条后腿', '两条前腿', '一条长尾巴'], 0, '课文按成长顺序写到：小蝌蚪先长出两条后腿，后来又长出两条前腿。', { topic: '课文理解' }),
  makeChoice('ch-u1-02', 'ch-u1', '《小蝌蚪找妈妈》', '小蝌蚪最先遇到了谁？', ['鲤鱼妈妈', '乌龟', '青蛙妈妈'], 0, '小蝌蚪先看见鲤鱼妈妈在教小鲤鱼捕食。', { topic: '课文理解' }),
  makeChoice('ch-u1-03', 'ch-u1', '《小蝌蚪找妈妈》', '鲤鱼妈妈告诉小蝌蚪，青蛙妈妈有什么特点？', ['四条腿、宽嘴巴', '长长的尾巴、黑灰色身子', '一对翅膀、尖尖的嘴'], 0, '“四条腿、宽嘴巴”是鲤鱼妈妈说的青蛙特征。', { topic: '课文理解' }),
  makeChoice('ch-u1-04', 'ch-u1', '《小蝌蚪找妈妈》', '最后，小蝌蚪长成了什么？', ['小青蛙', '小鲤鱼', '小乌龟'], 0, '小蝌蚪经过成长变化，最后长成了小青蛙。', { topic: '课文理解' }),
  makeChoice('ch-u1-05', 'ch-u1', '《我是什么》', '《我是什么》里的“我”指的是什么？', ['水', '风', '树叶'], 0, '课文中的“我”会变成云、雨、冰雹和雪，所以“我”是水。', { topic: '课文理解' }),
  makeChoice('ch-u1-06', 'ch-u1', '《我是什么》', '水可以变成下面哪一组事物？', ['云、雨、冰雹和雪', '花、草、树和鸟', '书、笔、本和尺'], 0, '课文写到水在不同情况下会变成云、雨、冰雹和雪。', { topic: '课文理解' }),
  makeChoice('ch-u1-07', 'ch-u1', '《我是什么》', '课文说“我有时候很温和，有时候很暴躁”，这里的“我”是谁？', ['水', '星星', '植物'], 0, '水有温和的一面，也有可能带来洪水等暴躁的一面。', { topic: '课文理解' }),
  makeChoice('ch-u1-08', 'ch-u1', '《植物妈妈有办法》', '蒲公英妈妈靠什么传播种子？', ['降落伞', '带刺的铠甲', '豆荚'], 0, '蒲公英的种子像降落伞，靠风把它们吹走。', { topic: '课文理解' }),
  makeChoice('ch-u1-09', 'ch-u1', '《植物妈妈有办法》', '苍耳妈妈给孩子准备了什么？', ['带刺的铠甲', '轻轻的翅膀', '一把小雨伞'], 0, '苍耳的种子带刺，容易挂在动物的皮毛上。', { topic: '课文理解' }),
  makeChoice('ch-u1-10', 'ch-u1', '《植物妈妈有办法》', '豌豆妈妈让豆荚怎样帮助孩子？', ['晒在太阳底下炸开', '放在水里漂走', '藏进泥土里'], 0, '豌豆妈妈把豆荚晒在太阳底下，豆荚炸开，种子就蹦着离开。', { topic: '课文理解' }),

  // 语文第二单元：识字
  makeChoice('ch-u2-01', 'ch-u2', '《场景歌》', '“一只海鸥，一条帆船”中，帆船的量词是哪个？', ['条', '只', '座'], 0, '“一条帆船”是课文中的量词搭配。', { topic: '量词识字' }),
  makeChoice('ch-u2-02', 'ch-u2', '《场景歌》', '课文中“一艘军舰，一处港湾”的量词分别是？', ['艘、处', '只、条', '方、块'], 0, '军舰用“艘”，港湾用“处”。', { topic: '量词识字' }),
  makeChoice('ch-u2-03', 'ch-u2', '《树之歌》', '“杨树高，榕树壮”写出了榕树什么特点？', ['粗壮', '很矮', '叶子红'], 0, '“壮”说明榕树长得粗壮。', { topic: '树木识字' }),
  makeChoice('ch-u2-04', 'ch-u2', '《树之歌》', '哪一种树的叶子像手掌？', ['梧桐树', '枫树', '松树'], 0, '课文写“梧桐树叶像手掌”。', { topic: '树木识字' }),
  makeChoice('ch-u2-05', 'ch-u2', '《树之歌》', '“枫树秋天叶儿红”写的是哪个季节？', ['秋天', '春天', '冬天'], 0, '枫树在秋天叶子变红。', { topic: '树木识字' }),
  makeChoice('ch-u2-06', 'ch-u2', '《树之歌》', '“松柏四季披绿装”说明松柏有什么特点？', ['四季常绿', '秋天结果', '春天开花'], 0, '“四季披绿装”说明松柏一年四季都是绿色的。', { topic: '树木识字' }),
  makeChoice('ch-u2-07', 'ch-u2', '《拍手歌》', '“孔雀锦鸡是伙伴”中，孔雀和锦鸡是什么关系？', ['伙伴', '敌人', '老师和学生'], 0, '课文把孔雀和锦鸡写成一起生活的伙伴。', { topic: '动物识字' }),
  makeChoice('ch-u2-08', 'ch-u2', '《拍手歌》', '“天空雁群会写字”中的“写字”指雁群怎样飞？', ['排成队形飞过天空', '停在树上不动', '钻进水里游'], 0, '雁群排成队形飞行，看起来像在天空写字。', { topic: '动物识字' }),
  makeChoice('ch-u2-09', 'ch-u2', '《田家四季歌》', '“春季里，春风吹”写的是哪个季节？', ['春季', '夏季', '秋季'], 0, '句子中直接出现了“春季”。', { topic: '四季识字' }),
  makeChoice('ch-u2-10', 'ch-u2', '《田家四季歌》', '“稻上场，谷像黄金粒粒香”写的是哪个季节？', ['秋季', '冬季', '春季'], 0, '稻谷成熟、丰收的景象出现在秋季。', { topic: '四季识字' }),

  // 语文第三单元：彩虹、去外婆家、数星星的孩子
  makeChoice('ch-u3-01', 'ch-u3', '《彩虹》', '《彩虹》中，孩子想拿什么帮爸爸浇田？', ['水壶', '镜子', '秋千'], 0, '孩子想提着爸爸浇花用的水壶，把水洒下来帮爸爸浇田。', { topic: '课文理解' }),
  makeChoice('ch-u3-02', 'ch-u3', '《彩虹》', '《彩虹》中，孩子想把什么挂到彩虹桥上？', ['妈妈的镜子', '爸爸的水壶', '哥哥的书包'], 0, '孩子想把妈妈梳头用的镜子挂在彩虹桥上。', { topic: '课文理解' }),
  makeChoice('ch-u3-03', 'ch-u3', '《彩虹》', '《彩虹》中，孩子想坐着什么荡来荡去？', ['秋千', '小船', '木马'], 0, '孩子想坐着秋千在彩虹桥上荡来荡去。', { topic: '课文理解' }),
  makeChoice('ch-u3-04', 'ch-u3', '《去外婆家》', '《去外婆家》中提到的果子有哪一组？', ['山楂、柿子、毛栗子', '苹果、香蕉、西瓜', '桃子、葡萄、草莓'], 0, '山楂、柿子和毛栗子是课文中写到的果子。', { topic: '课文理解' }),
  makeChoice('ch-u3-05', 'ch-u3', '《去外婆家》', '去外婆家的路上，孩子看到了哪种小鸟？', ['小山雀', '小燕子', '小白兔'], 0, '课文写到路上遇见了小山雀。', { topic: '课文理解' }),
  makeChoice('ch-u3-06', 'ch-u3', '《去外婆家》', '课文中提到的花是？', ['杜鹃花', '荷花', '菊花'], 0, '杜鹃花是《去外婆家》中出现的花。', { topic: '课文理解' }),
  makeChoice('ch-u3-07', 'ch-u3', '《数星星的孩子》', '《数星星的孩子》中的孩子是谁？', ['张衡', '曹冲', '李白'], 0, '课文写的是小时候喜欢观察星星的张衡。', { topic: '课文理解' }),
  makeChoice('ch-u3-08', 'ch-u3', '《数星星的孩子》', '张衡数的星星中，哪一组像一把勺子？', ['北斗七星', '北极星', '太阳'], 0, '北斗七星排列起来像一把勺子。', { topic: '课文理解' }),
  makeChoice('ch-u3-09', 'ch-u3', '《数星星的孩子》', '课文中提到的北极星有什么特点？', ['位置好像不动', '每天都会落下', '会变成月亮'], 0, '课文通过观察说明北极星的位置好像不动。', { topic: '课文理解' }),
  makeChoice('ch-u3-10', 'ch-u3', '《数星星的孩子》', '张衡长大后成了什么样的人？', ['著名的天文学家', '一名船夫', '一位画家'], 0, '张衡长大后成了著名的天文学家。', { topic: '课文理解' }),

  // 数学第一单元：100以内数的加减法（二）
  makeInput('ma-u1-01', 'ma-u1', '两位数退位减法', '算一算：52 − 27 =', 25, '个位 2 不够减 7，要从十位借 1 个十；52－27＝25。'),
  makeInput('ma-u1-02', 'ma-u1', '两位数不退位减法', '算一算：68 − 24 =', 44, '个位 8－4＝4，十位 6－2＝4，所以得 44。'),
  makeInput('ma-u1-03', 'ma-u1', '两位数减一位数', '算一算：75 − 8 =', 67, '个位 5 不够减 8，要借 1 个十，75－8＝67。'),
  makeInput('ma-u1-04', 'ma-u1', '两位数减整十数', '算一算：63 − 40 =', 23, '减去 4 个十，十位 6－4＝2，个位不变，得 23。'),
  makeInput('ma-u1-05', 'ma-u1', '两位数退位减法', '算一算：94 − 36 =', 58, '个位 4 不够减 6，借位后计算，94－36＝58。'),
  makeChoice('ma-u1-06', 'ma-u1', '解决问题：比多与少', '小红有 42 张贴纸，小明有 35 张。小红比小明多几张？', ['7 张', '77 张', '6 张'], 0, '求相差多少用减法：42－35＝7（张）。'),
  makeInput('ma-u1-07', 'ma-u1', '两位数退位减法', '算一算：57 − 29 =', 28, '57－29＝28，个位退位后再计算十位。'),
  makeChoice('ma-u1-08', 'ma-u1', '解决问题：比多与少', '54 −（　）＝27，括号里应填几？', ['27', '81', '17'], 0, '被减数减差等于减数：54－27＝27。'),
  makeChoice('ma-u1-09', 'ma-u1', '解决问题：比多与少', '图书角有 63 本书，借走 28 本，还剩多少本？', ['35 本', '91 本', '45 本'], 0, '求还剩多少用减法：63－28＝35（本）。'),
  makeInput('ma-u1-10', 'ma-u1', '两位数退位减法', '算一算：80 − 36 =', 44, '80－36＝44，个位 0 不够减 6，需要连续退位。'),

  // 数学第一单元拓展：两位数加减法的算理、错例辨析和解决问题
  makeInput('ma-u1-21', 'ma-u1', '两位数进位加法·拓展', '算一算：38 ＋ 27 =', 65, '个位8＋7＝15，写5进1；十位3＋2＋1＝6，所以得65。', { topic: '进位加法拓展' }),
  makeInput('ma-u1-22', 'ma-u1', '两位数退位减法·拓展', '算一算：72 − 38 =', 34, '个位2不够减8，要从十位借1个十；12－8＝4，6－3＝3，所以得34。', { topic: '退位减法拓展' }),
  makeJudge('ma-u1-23', 'ma-u1', '进位加法·拓展', '46 ＋ 27 = 63。', false, '个位6＋7＝13，要进1，正确答案是73。', { topic: '错例辨析' }),
  makeInput('ma-u1-24', 'ma-u1', '进位加法·拓展', '25 ＋（　）＝63，括号里应填几？', 38, '63－25＝38，所以括号里填38。', { topic: '逆向思考' }),
  makeInput('ma-u1-25', 'ma-u1', '退位减法·拓展', '（　）−27＝45，括号里应填几？', 72, '45＋27＝72，所以括号里填72。', { topic: '逆向思考' }),
  makeJudge('ma-u1-26', 'ma-u1', '退位减法·拓展', '54 − 28时，个位4不够减8，需要从十位借1个十。', true, '个位不够减时，要从十位借1个十，54变成4个十和14个一。', { topic: '算理判断' }),
  makeOrder('ma-u1-27', 'ma-u1', '进位加法·拓展', '请按计算36 ＋ 28的主要步骤排列。', ['个位6＋8＝14', '个位写4并向十位进1', '十位3＋2＋1＝6', '得64'], [0, 1, 2, 3], '先算个位并进位，再算十位，最后得到64。', { topic: '计算步骤' }),
  makeOrder('ma-u1-28', 'ma-u1', '退位减法·拓展', '请按计算52 − 27的主要步骤排列。', ['个位2不够减7', '从十位借1个十，个位变成12', '12－7＝5', '十位退位后5－2＝3', '得35'], [0, 1, 2, 3, 4], '退位减法先借1个十，再算个位和十位，结果是35。', { topic: '计算步骤' }),
  makeInput('ma-u1-29', 'ma-u1', '解决问题·拓展', '小红有36张贴纸，又得到23张。现在一共有多少张？', 59, '36＋23＝59（张）。先算个位6＋3，再算十位3＋2。', { topic: '加法应用' }),
  makeInput('ma-u1-30', 'ma-u1', '解决问题·拓展', '一本书有85页，小明看了38页，还剩多少页？', 47, '85－38＝47（页），求还剩多少用减法。', { topic: '减法应用' }),

  // 数学第二单元：欢乐购物街
  makeChoice('ma-u2-01', 'ma-u2', '认识人民币', '1 元等于多少角？', ['10 角', '1 角', '100 角'], 0, '人民币单位换算中，1 元＝10 角。'),
  makeChoice('ma-u2-02', 'ma-u2', '认识人民币', '下面哪一项表示 2 元 5 角？', ['25 角', '2 角 5 分', '205 元'], 0, '2 元＝20 角，再加 5 角就是 25 角。'),
  makeChoice('ma-u2-03', 'ma-u2', '一起来购物', '5 元的本子和 2 元的橡皮一共要多少元？', ['7 元', '3 元', '10 元'], 0, '5＋2＝7（元）。'),
  makeChoice('ma-u2-04', 'ma-u2', '一起来购物', '买 3 元的尺子，付 10 元，应找回多少元？', ['7 元', '13 元', '3 元'], 0, '找回的钱是10－3＝7（元）。'),
  makeChoice('ma-u2-05', 'ma-u2', '一起来购物', '8 元的文具，可以用哪组钱正好付清？', ['5 元＋2 元＋1 元', '5 元＋1 元', '10 元＋1 元'], 0, '5＋2＋1＝8（元），正好付清。'),
  makeChoice('ma-u2-06', 'ma-u2', '认识人民币', '3 元 5 角和哪一个金额相同？', ['35 角', '8 角', '305 元'], 0, '3 元＝30 角，30＋5＝35 角。'),
  makeChoice('ma-u2-07', 'ma-u2', '一起来购物', '小明有 10 元，买了 4 元的本子，还剩多少元？', ['6 元', '14 元', '4 元'], 0, '10－4＝6（元）。'),
  makeChoice('ma-u2-08', 'ma-u2', '一起来购物', '一支笔 3 元，一块橡皮 2 元，一个本子 4 元，一共多少元？', ['9 元', '8 元', '10 元'], 0, '3＋2＋4＝9（元）。'),
  makeChoice('ma-u2-09', 'ma-u2', '一起来购物', '小红有 9 元，买了 6 元的玩具，还剩多少元？', ['3 元', '15 元', '6 元'], 0, '9－6＝3（元）。'),
  makeChoice('ma-u2-10', 'ma-u2', '一起来购物', '下面哪种情况钱不够？商品 8 元，小朋友带着……', ['5 元和 2 元', '5 元、2 元和 1 元', '10 元'], 0, '5＋2＝7 元，小于 8 元，所以钱不够。'),

  // 数学第三单元：表内乘法
  makeChoice('ma-u3-01', 'ma-u3', '乘法引入', '2＋2＋2＋2 可以写成哪一个乘法算式？', ['4×2＝8', '2×2＝4', '4＋2＝6'], 0, '4 个 2 相加，可以写成 4×2，得 8。'),
  makeChoice('ma-u3-02', 'ma-u3', '5的乘法', '5×4 的得数是多少？', ['20', '9', '25'], 0, '5 的乘法口诀：四五二十。'),
  makeChoice('ma-u3-03', 'ma-u3', '2、4、8的乘法', '2×4 的得数是多少？', ['8', '6', '12'], 0, '二四得八。'),
  makeChoice('ma-u3-04', 'ma-u3', '2、4、8的乘法', '4×8 的得数是多少？', ['32', '24', '12'], 0, '四八三十二。'),
  makeChoice('ma-u3-05', 'ma-u3', '7的乘法', '7×5 的得数是多少？', ['35', '12', '30'], 0, '五七三十五。'),
  makeChoice('ma-u3-06', 'ma-u3', '2、4、8的乘法', '8×2 的得数是多少？', ['16', '10', '18'], 0, '二八十六。'),
  makeChoice('ma-u3-07', 'ma-u3', '乘法引入', '4 个 7 相加，正确的乘法算式是？', ['4×7＝28', '4＋7＝11', '7×7＝49'], 0, '4 个 7 相加写成 4×7，得 28。'),
  makeChoice('ma-u3-08', 'ma-u3', '5的乘法', '5×3 表示几个几相加？', ['3 个 5', '5 个 3', '5 个 5'], 0, '5×3 表示 3 个 5 相加，结果是 15。'),
  makeChoice('ma-u3-09', 'ma-u3', '2、4、8的乘法', '2×8 的得数是多少？', ['16', '10', '18'], 0, '二八十六。'),
  makeChoice('ma-u3-10', 'ma-u3', '5的乘法', '（　）×5＝25，括号里应填几？', ['5', '4', '6'], 0, '五五二十五，所以括号里填 5。'),

  // 英语第一至第三单元：当前公开可核对范围为单元标题词义练习
  makeChoice('en-u1-01', 'en-u1', 'Unit 1 · My morning', 'morning 的意思是？', ['早晨', '房间', '路上'], 0, 'morning 是“早晨”。本套题严格只使用已核对的单元标题词。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u1-02', 'en-u1', 'Unit 1 · My morning', 'my 的意思是？', ['我的', '你的', '他们的'], 0, 'my 是“我的”。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u1-03', 'en-u1', 'Unit 1 · My morning', '“My morning” 的意思是？', ['我的早晨', '我的房间', '在路上'], 0, 'My morning 可理解为“我的早晨”。', { titleOnly: true, topic: '标题短语' }),
  makeChoice('en-u1-04', 'en-u1', 'Unit 1 · My morning', '“早晨”对应哪个英文词？', ['morning', 'room', 'way'], 0, '“早晨”对应 morning。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u1-05', 'en-u1', 'Unit 1 · My morning', '下面哪个短语含有 morning？', ['My morning', 'My room', 'On the way'], 0, 'Unit 1 的标题是 My morning。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u1-06', 'en-u1', 'Unit 1 · My morning', '下面哪个词表示“我的”？', ['my', 'morning', 'room'], 0, 'my 表示“我的”。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u1-07', 'en-u1', 'Unit 1 · My morning', 'Unit 1 的标题中，表示时间段的词是？', ['morning', 'my', 'room'], 0, 'morning 表示早晨，是时间词。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u1-08', 'en-u1', 'Unit 1 · My morning', '哪一个是 Unit 1 的正确标题？', ['My morning', 'My room', 'In the sea'], 0, 'Unit 1 的公开目录标题是 My morning。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u1-09', 'en-u1', 'Unit 1 · My morning', 'My 后面接的是哪个标题词？', ['morning', 'room', 'way'], 0, '标题组合是 My morning。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u1-10', 'en-u1', 'Unit 1 · My morning', '下面哪一项不是 Unit 1 标题中的词？', ['room', 'my', 'morning'], 0, 'room 属于 Unit 2 My room，不在 Unit 1 标题中。', { titleOnly: true, topic: '标题辨认' }),

  makeChoice('en-u2-01', 'en-u2', 'Unit 2 · My room', 'room 的意思是？', ['房间', '早晨', '水果'], 0, 'room 是“房间”。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u2-02', 'en-u2', 'Unit 2 · My room', 'my 的意思是？', ['我的', '我们的', '他的'], 0, 'my 是“我的”。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u2-03', 'en-u2', 'Unit 2 · My room', '“My room” 的意思是？', ['我的房间', '我的早晨', '在路上'], 0, 'My room 可理解为“我的房间”。', { titleOnly: true, topic: '标题短语' }),
  makeChoice('en-u2-04', 'en-u2', 'Unit 2 · My room', '“房间”对应哪个英文词？', ['room', 'morning', 'way'], 0, '“房间”对应 room。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u2-05', 'en-u2', 'Unit 2 · My room', '下面哪个短语含有 room？', ['My room', 'My morning', 'On the way'], 0, 'Unit 2 的标题是 My room。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u2-06', 'en-u2', 'Unit 2 · My room', '下面哪个词表示“我的”？', ['my', 'room', 'on'], 0, 'my 表示“我的”。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u2-07', 'en-u2', 'Unit 2 · My room', 'Unit 2 的标题中，表示房间的词是？', ['room', 'my', 'morning'], 0, 'room 表示“房间”。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u2-08', 'en-u2', 'Unit 2 · My room', '哪一个是 Unit 2 的正确标题？', ['My room', 'My morning', 'Yummy fruit'], 0, 'Unit 2 的公开目录标题是 My room。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u2-09', 'en-u2', 'Unit 2 · My room', 'My 后面接的是哪个标题词？', ['room', 'morning', 'way'], 0, '标题组合是 My room。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u2-10', 'en-u2', 'Unit 2 · My room', '下面哪一项不是 Unit 2 标题中的词？', ['morning', 'my', 'room'], 0, 'morning 属于 Unit 1 My morning，不在 Unit 2 标题中。', { titleOnly: true, topic: '标题辨认' }),

  makeChoice('en-u3-01', 'en-u3', 'Unit 3 · On the way', '“On the way” 的意思是？', ['在路上', '在房间里', '在海里'], 0, 'on the way 是“在路上”。', { titleOnly: true, topic: '标题短语' }),
  makeChoice('en-u3-02', 'en-u3', 'Unit 3 · On the way', '“在路上”对应哪个英文短语？', ['On the way', 'My room', 'My morning'], 0, '“在路上”对应 On the way。', { titleOnly: true, topic: '标题短语' }),
  makeChoice('en-u3-03', 'en-u3', 'Unit 3 · On the way', 'way 在标题短语中和什么有关？', ['路、道路', '房间', '早晨'], 0, 'way 在 on the way 中表示路、道路。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u3-04', 'en-u3', 'Unit 3 · On the way', 'Unit 3 的标题开头是哪一个词？', ['On', 'My', 'In'], 0, 'Unit 3 标题是 On the way。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u3-05', 'en-u3', 'Unit 3 · On the way', 'Unit 3 的标题一共有几个英文词？', ['3 个', '2 个', '4 个'], 0, 'On、the、way 一共 3 个词。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u3-06', 'en-u3', 'Unit 3 · On the way', '下面哪个是 Unit 3 的正确标题？', ['On the way', 'My room', 'In the sky'], 0, 'Unit 3 的公开目录标题是 On the way。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u3-07', 'en-u3', 'Unit 3 · On the way', '下面哪一个词不在 On the way 中？', ['room', 'on', 'way'], 0, 'room 属于 Unit 2 的标题 My room。', { titleOnly: true, topic: '标题辨认' }),
  makeChoice('en-u3-08', 'en-u3', 'Unit 3 · On the way', '“路”在标题中对应哪个词？', ['way', 'my', 'morning'], 0, 'way 可以表示“路”。', { titleOnly: true, topic: '标题词义' }),
  makeChoice('en-u3-09', 'en-u3', 'Unit 3 · On the way', '哪一个标题和“在路上”意思相同？', ['On the way', 'My morning', 'My room'], 0, 'On the way 的意思是“在路上”。', { titleOnly: true, topic: '标题短语' }),
  makeChoice('en-u3-10', 'en-u3', 'Unit 3 · On the way', 'On the way 属于哪一个单元？', ['Unit 3', 'Unit 1', 'Unit 2'], 0, '公开目录中 On the way 是 Unit 3。', { titleOnly: true, topic: '标题辨认' })
];



// 每个开放单元补充 10 道不同题型：填空、判断和排序与选择题混合。
const EXTRA_QUESTIONS = [
  // 语文第一单元
  makeTextInput('ch-u1-11', 'ch-u1', '《小蝌蚪找妈妈》', '小蝌蚪最后长成了什么？请写出答案。', '小青蛙', '小蝌蚪经过成长变化，最后长成了小青蛙。', { topic: '课文填空' }),
  makeJudge('ch-u1-12', 'ch-u1', '《小蝌蚪找妈妈》', '小蝌蚪先长出了两条前腿。', false, '课文写的是先长出两条后腿，后来才长出两条前腿。', { topic: '课文判断' }),
  makeOrder('ch-u1-13', 'ch-u1', '《小蝌蚪找妈妈》', '请按小蝌蚪成长的先后顺序排列。', ['长出两条后腿', '长出两条前腿', '尾巴变短', '长成青蛙'], [0, 1, 2, 3], '小蝌蚪先长后腿，再长前腿，尾巴变短，最后长成青蛙。', { topic: '成长顺序' }),
  makeJudge('ch-u1-14', 'ch-u1', '《我是什么》', '《我是什么》中的“我”指的是水。', true, '水会变成云、雨、冰雹和雪，所以“我”指水。', { topic: '课文判断' }),
  makeTextInput('ch-u1-15', 'ch-u1', '《我是什么》', '水变成的小花朵是____。', '雪', '课文把雪比作从空中飘下来的小花朵。', { topic: '课文填空' }),
  makeJudge('ch-u1-16', 'ch-u1', '《我是什么》', '水有时候很温和，有时候很暴躁。', true, '课文既写水温和的一面，也写水暴躁时可能带来的灾害。', { topic: '课文判断' }),
  makeOrder('ch-u1-17', 'ch-u1', '《植物妈妈有办法》', '请把这句话按正确顺序排列。', ['植物妈妈有办法', '蒲公英妈妈', '靠风传播种子'], [0, 1, 2], '课文先总说植物妈妈有办法，再写蒲公英妈妈借助风传播种子。', { topic: '句子排序' }),
  makeTextInput('ch-u1-18', 'ch-u1', '《植物妈妈有办法》', '蒲公英的种子像什么？请写出答案。', '降落伞', '蒲公英的种子像降落伞，靠风传播。', { topic: '课文填空' }),
  makeJudge('ch-u1-19', 'ch-u1', '《植物妈妈有办法》', '苍耳是靠太阳把种子传播出去的。', false, '苍耳的种子带刺，容易挂在动物的皮毛上。', { topic: '课文判断' }),
  makeTextInput('ch-u1-20', 'ch-u1', '《植物妈妈有办法》', '豌豆豆荚晒在太阳底下会怎样？请写出答案。', '炸开', '豌豆豆荚晒在太阳底下会炸开，种子就蹦着离开。', { topic: '课文填空' }),

  // 语文第二单元
  makeTextInput('ch-u2-11', 'ch-u2', '《场景歌》', '“一____鱼塘”中应该填哪个量词？', '方', '课文中的搭配是“一方鱼塘”。', { topic: '量词填空' }),
  makeJudge('ch-u2-12', 'ch-u2', '《场景歌》', '“一艘军舰”中的量词使用正确。', true, '军舰可以用量词“艘”。', { topic: '量词判断' }),
  makeOrder('ch-u2-13', 'ch-u2', '《场景歌》', '请按课文海边场景的先后顺序排列。', ['一只海鸥', '一条帆船', '一艘军舰', '一处港湾'], [0, 1, 2, 3], '《场景歌》先写海鸥、帆船，再写军舰和港湾。', { topic: '课文排序' }),
  makeTextInput('ch-u2-14', 'ch-u2', '《树之歌》', '“木棉喜暖在____”中应该填什么？', '南方', '木棉喜欢温暖的南方。', { topic: '课文填空' }),
  makeJudge('ch-u2-15', 'ch-u2', '《树之歌》', '梧桐树的叶子像手掌。', true, '课文中有“梧桐树叶像手掌”的句子。', { topic: '课文判断' }),
  makeTextInput('ch-u2-16', 'ch-u2', '《树之歌》', '哪种树秋天叶儿红？请写出树名。', '枫树', '课文写“枫树秋天叶儿红”。', { topic: '课文填空' }),
  makeJudge('ch-u2-17', 'ch-u2', '《树之歌》', '松柏四季都是绿色的。', true, '“松柏四季披绿装”说明松柏四季常绿。', { topic: '课文判断' }),
  makeTextInput('ch-u2-18', 'ch-u2', '《拍手歌》', '“____在竹林嬉戏”中应该填什么动物？', '熊猫', '课文写熊猫在竹林嬉戏。', { topic: '课文填空' }),
  makeJudge('ch-u2-19', 'ch-u2', '《拍手歌》', '“天空雁群会写字”是说雁群真的拿笔写字。', false, '“写字”是形象地说雁群排成队形飞过天空。', { topic: '课文判断' }),
  makeTextInput('ch-u2-20', 'ch-u2', '《田家四季歌》', '“夏季里，农事____”中应该填什么？', '忙', '夏季里农事忙，课文用这句话写农民的劳动。', { topic: '课文填空' }),

  // 语文第三单元
  makeTextInput('ch-u3-11', 'ch-u3', '《彩虹》', '孩子想提着水壶帮爸爸做什么？', '浇田', '孩子想提着水壶把水洒下来帮爸爸浇田。', { topic: '课文填空' }),
  makeJudge('ch-u3-12', 'ch-u3', '《彩虹》', '课文把雨后的彩虹想象成了一座桥。', true, '孩子把彩虹想象成一座美丽的桥。', { topic: '课文判断' }),
  makeOrder('ch-u3-13', 'ch-u3', '《彩虹》', '请按孩子在彩虹桥上的三个愿望排列。', ['帮爸爸浇田', '把镜子挂在彩虹上', '坐秋千荡来荡去'], [0, 1, 2], '课文先写帮爸爸，再写帮妈妈，最后写陪哥哥。', { topic: '课文排序' }),
  makeTextInput('ch-u3-14', 'ch-u3', '《去外婆家》', '去外婆家的路上，孩子遇到了哪种小鸟？', '小山雀', '课文写去外婆家的路上遇到了小山雀。', { topic: '课文填空' }),
  makeJudge('ch-u3-15', 'ch-u3', '《去外婆家》', '《去外婆家》中提到了杜鹃花。', true, '杜鹃花是课文中写到的花。', { topic: '课文判断' }),
  makeTextInput('ch-u3-16', 'ch-u3', '《去外婆家》', '课文中的果子有山楂、____和毛栗子。', '柿子', '课文写到山楂、柿子和毛栗子。', { topic: '课文填空' }),
  makeJudge('ch-u3-17', 'ch-u3', '《数星星的孩子》', '北斗七星排列起来像一把勺子。', true, '课文把北斗七星的形状写成像一把勺子。', { topic: '课文判断' }),
  makeTextInput('ch-u3-18', 'ch-u3', '《数星星的孩子》', '张衡长大后成了什么家？', '天文学家', '张衡长大后成了著名的天文学家。', { topic: '课文填空' }),
  makeOrder('ch-u3-19', 'ch-u3', '《数星星的孩子》', '请按张衡成长和观察的内容排列。', ['数星星', '发现北斗七星像勺子', '知道北极星位置好像不动', '长大成为天文学家'], [0, 1, 2, 3], '课文先写小时候数星星和观察，再写张衡长大后的成就。', { topic: '课文排序' }),
  makeJudge('ch-u3-20', 'ch-u3', '《数星星的孩子》', '北极星的位置每天都在变化。', false, '课文写北极星的位置好像不动。', { topic: '课文判断' }),

  // 数学第一单元
  makeInput('ma-u1-11', 'ma-u1', '两位数退位减法', '算一算：46 − 19 =', 27, '46－19＝27，个位退位后再计算十位。', { topic: '计算填空' }),
  makeJudge('ma-u1-12', 'ma-u1', '两位数退位减法', '73 − 28 = 45。', true, '73－28＝45。', { topic: '计算判断' }),
  makeInput('ma-u1-13', 'ma-u1', '两位数退位减法', '算一算：90 − 47 =', 43, '90－47＝43。', { topic: '计算填空' }),
  makeJudge('ma-u1-14', 'ma-u1', '两位数减法', '64 − 32 = 22。', false, '64－32＝32，不是22。', { topic: '计算判断' }),
  makeOrder('ma-u1-15', 'ma-u1', '两位数退位减法', '请按计算 52 − 27 的主要步骤排列。', ['个位2减7不够减', '从十位借1个十', '12－7＝5', '十位退位后5－2＝3', '得35'], [0, 1, 2, 3, 4], '退位减法要先借1个十，再计算个位和十位。', { topic: '计算步骤' }),
  makeInput('ma-u1-16', 'ma-u1', '两位数减一位数', '算一算：57 − 8 =', 49, '57－8＝49。', { topic: '计算填空' }),
  makeJudge('ma-u1-17', 'ma-u1', '两位数减整十数', '86 − 40 = 46。', true, '86－40＝46。', { topic: '计算判断' }),
  makeInput('ma-u1-18', 'ma-u1', '解决问题：比多与少', '42 −（　）＝18，括号里应填几？', 24, '42－18＝24，所以括号里填24。', { topic: '算式填空' }),
  makeJudge('ma-u1-19', 'ma-u1', '解决问题：比多与少', '求两个数相差多少，通常用加法。', false, '求相差多少通常用减法。', { topic: '方法判断' }),
  makeInput('ma-u1-20', 'ma-u1', '解决问题：比多与少', '61 本书借走一些后还剩29本，借走了多少本？', 32, '61－29＝32（本）。', { topic: '解决问题' }),

  // 数学第二单元
  makeInput('ma-u2-11', 'ma-u2', '认识人民币', '1 元等于多少角？请填数。', 10, '1元＝10角。', { topic: '单位换算' }),
  makeJudge('ma-u2-12', 'ma-u2', '认识人民币', '2 元 3 角等于 23 角。', true, '2元＝20角，20角＋3角＝23角。', { topic: '单位换算判断' }),
  makeInput('ma-u2-13', 'ma-u2', '认识人民币', '4 元 5 角等于多少角？', 45, '4元＝40角，40角＋5角＝45角。', { topic: '单位换算' }),
  makeJudge('ma-u2-14', 'ma-u2', '认识人民币', '30 角等于 3 元。', true, '10角是1元，30角就是3元。', { topic: '单位换算判断' }),
  makeInput('ma-u2-15', 'ma-u2', '一起来购物', '20 元买12元的书，应找回多少元？', 8, '20－12＝8（元）。', { topic: '购物计算' }),
  makeInput('ma-u2-16', 'ma-u2', '一起来购物', '6 元、3 元和2元的商品合起来要多少元？', 11, '6＋3＋2＝11（元）。', { topic: '购物计算' }),
  makeJudge('ma-u2-17', 'ma-u2', '一起来购物', '5 元和4元合起来可以买8元的商品，还剩1元。', true, '5＋4＝9（元），买8元商品还剩1元。', { topic: '购物判断' }),
  makeOrder('ma-u2-18', 'ma-u2', '一起来购物', '请按购物时的合理步骤排列。', ['看清商品价格', '想好要买什么', '付款并核对找零'], [0, 1, 2], '购物时要先看价格，再决定购买，最后付款并核对找零。', { topic: '生活排序' }),
  makeInput('ma-u2-19', 'ma-u2', '一起来购物', '10 元买7元的橡皮，应找回多少元？', 3, '10－7＝3（元）。', { topic: '购物计算' }),
  makeJudge('ma-u2-20', 'ma-u2', '一起来购物', '带着5元和3元，正好可以买8元的文具。', true, '5＋3＝8（元），钱正好够。', { topic: '购物判断' }),

  // 数学第三单元
  makeInput('ma-u3-11', 'ma-u3', '乘法引入', '算一算：3×4 =', 12, '3个4相加是12。', { topic: '乘法填空' }),
  makeJudge('ma-u3-12', 'ma-u3', '5的乘法', '4×5 = 20。', true, '四五二十。', { topic: '口诀判断' }),
  makeInput('ma-u3-13', 'ma-u3', '7的乘法', '算一算：7×4 =', 28, '四七二十八。', { topic: '乘法填空' }),
  makeJudge('ma-u3-14', 'ma-u3', '2、4、8的乘法', '8×2 = 18。', false, '二八十六，8×2＝16。', { topic: '口诀判断' }),
  makeOrder('ma-u3-15', 'ma-u3', '乘法引入', '请把加法表示改写成乘法的步骤排列。', ['2＋2＋2＋2', '4个2相加', '4×2＝8'], [0, 1, 2], '先看出有4个2，再写成4×2，结果是8。', { topic: '算式排序' }),
  makeInput('ma-u3-16', 'ma-u3', '5的乘法', '算一算：5×7 =', 35, '五七三十五。', { topic: '乘法填空' }),
  makeJudge('ma-u3-17', 'ma-u3', '2、4、8的乘法', '2×8 = 16。', true, '二八十六。', { topic: '口诀判断' }),
  makeInput('ma-u3-18', 'ma-u3', '5的乘法', '（　）×4＝20，括号里应填几？', 5, '五四二十，所以括号里填5。', { topic: '算式填空' }),
  makeJudge('ma-u3-19', 'ma-u3', '乘法引入', '7×3表示3个7相加。', true, '7×3表示3个7相加，结果是21。', { topic: '意义判断' }),
  makeInput('ma-u3-20', 'ma-u3', '乘法引入', '4＋4＋4＋4＋4可以写成几×几？', 5, '5个4相加，可以写成5×4。', { topic: '算式填空' }),

  // 英语第一单元：只使用已核对的标题词
  makeTextInput('en-u1-11', 'en-u1', 'Unit 1 · My morning', '请写出表示“早晨”的英文词。', 'morning', '“早晨”是morning。', { titleOnly: true, topic: '标题词拼写' }),
  makeJudge('en-u1-12', 'en-u1', 'Unit 1 · My morning', '在“My morning”中，my表示“我的”。', true, 'my表示“我的”。', { titleOnly: true, topic: '标题判断' }),
  makeOrder('en-u1-13', 'en-u1', 'Unit 1 · My morning', '请把标题词按正确顺序排列。', ['My', 'morning'], [0, 1], '正确标题是My morning。', { titleOnly: true, topic: '标题排序' }),
  makeInput('en-u1-14', 'en-u1', 'Unit 1 · My morning', '“My morning”一共有几个英文词？', 2, 'My morning一共有2个英文词。', { titleOnly: true, topic: '标题辨认' }),
  makeJudge('en-u1-15', 'en-u1', 'Unit 1 · My morning', 'room在Unit 1标题“My morning”中。', false, 'room属于Unit 2标题“My room”。', { titleOnly: true, topic: '标题判断' }),
  makeTextInput('en-u1-16', 'en-u1', 'Unit 1 · My morning', '请写出“My morning”中的第一个词。', 'my', '标题的第一个词是my。', { titleOnly: true, topic: '标题填空' }),
  makeJudge('en-u1-17', 'en-u1', 'Unit 1 · My morning', '“My room”是Unit 1的标题。', false, 'Unit 1的标题是“My morning”。', { titleOnly: true, topic: '标题判断' }),
  makeOrder('en-u1-18', 'en-u1', 'Unit 1 · My morning', '请把打乱的标题词排成正确顺序。', ['morning', 'My'], [1, 0], '正确标题是My morning。', { titleOnly: true, topic: '标题排序' }),
  makeTextInput('en-u1-19', 'en-u1', 'Unit 1 · My morning', '请写出Unit 1的英文标题。', 'My morning', 'Unit 1的标题是My morning。', { titleOnly: true, topic: '标题填空' }),
  makeJudge('en-u1-20', 'en-u1', 'Unit 1 · My morning', 'Unit 1标题中包含morning。', true, 'Unit 1的标题是My morning。', { titleOnly: true, topic: '标题判断' }),

  // 英语第二单元：只使用已核对的标题词
  makeTextInput('en-u2-11', 'en-u2', 'Unit 2 · My room', '请写出表示“房间”的英文词。', 'room', '“房间”是room。', { titleOnly: true, topic: '标题词拼写' }),
  makeJudge('en-u2-12', 'en-u2', 'Unit 2 · My room', '在“My room”中，my表示“我的”。', true, 'my表示“我的”。', { titleOnly: true, topic: '标题判断' }),
  makeOrder('en-u2-13', 'en-u2', 'Unit 2 · My room', '请把标题词按正确顺序排列。', ['My', 'room'], [0, 1], '正确标题是My room。', { titleOnly: true, topic: '标题排序' }),
  makeInput('en-u2-14', 'en-u2', 'Unit 2 · My room', '“My room”一共有几个英文词？', 2, 'My room一共有2个英文词。', { titleOnly: true, topic: '标题辨认' }),
  makeJudge('en-u2-15', 'en-u2', 'Unit 2 · My room', 'morning在Unit 2标题“My room”中。', false, 'morning属于Unit 1标题“My morning”。', { titleOnly: true, topic: '标题判断' }),
  makeTextInput('en-u2-16', 'en-u2', 'Unit 2 · My room', '请写出“My room”中的第一个词。', 'my', '标题的第一个词是my。', { titleOnly: true, topic: '标题填空' }),
  makeJudge('en-u2-17', 'en-u2', 'Unit 2 · My room', '“My room”是Unit 2的标题。', true, 'Unit 2的标题是“My room”。', { titleOnly: true, topic: '标题判断' }),
  makeOrder('en-u2-18', 'en-u2', 'Unit 2 · My room', '请把打乱的标题词排成正确顺序。', ['room', 'My'], [1, 0], '正确标题是My room。', { titleOnly: true, topic: '标题排序' }),
  makeTextInput('en-u2-19', 'en-u2', 'Unit 2 · My room', '请写出Unit 2的英文标题。', 'My room', 'Unit 2的标题是My room。', { titleOnly: true, topic: '标题填空' }),
  makeJudge('en-u2-20', 'en-u2', 'Unit 2 · My room', 'way在Unit 2标题“My room”中。', false, 'way属于Unit 3标题“On the way”。', { titleOnly: true, topic: '标题判断' }),

  // 英语第三单元：只使用已核对的标题词
  makeTextInput('en-u3-11', 'en-u3', 'Unit 3 · On the way', '请写出表示“路”的英文词。', 'way', '在标题短语中，way可以表示“路”。', { titleOnly: true, topic: '标题词拼写' }),
  makeJudge('en-u3-12', 'en-u3', 'Unit 3 · On the way', '“On the way”一共有3个英文词。', true, 'On、the、way一共有3个词。', { titleOnly: true, topic: '标题判断' }),
  makeOrder('en-u3-13', 'en-u3', 'Unit 3 · On the way', '请把标题词按正确顺序排列。', ['On', 'the', 'way'], [0, 1, 2], '正确标题是On the way。', { titleOnly: true, topic: '标题排序' }),
  makeInput('en-u3-14', 'en-u3', 'Unit 3 · On the way', '“On the way”一共有几个英文词？', 3, 'On、the、way一共有3个英文词。', { titleOnly: true, topic: '标题辨认' }),
  makeJudge('en-u3-15', 'en-u3', 'Unit 3 · On the way', 'room在Unit 3标题“On the way”中。', false, 'room属于Unit 2标题“My room”。', { titleOnly: true, topic: '标题判断' }),
  makeTextInput('en-u3-16', 'en-u3', 'Unit 3 · On the way', '请写出“On the way”的第一个词。', 'on', '标题的第一个词是On。', { titleOnly: true, topic: '标题填空' }),
  makeTextInput('en-u3-17', 'en-u3', 'Unit 3 · On the way', '请写出“On the way”的第二个词。', 'the', '标题的第二个词是the。', { titleOnly: true, topic: '标题填空' }),
  makeJudge('en-u3-18', 'en-u3', 'Unit 3 · On the way', 'way在标题短语中和“路”有关。', true, 'way在on the way中可以表示“路”。', { titleOnly: true, topic: '标题判断' }),
  makeOrder('en-u3-19', 'en-u3', 'Unit 3 · On the way', '请把反向排列的标题词排成正确顺序。', ['way', 'the', 'On'], [2, 1, 0], '正确标题是On the way。', { titleOnly: true, topic: '标题排序' }),
  makeTextInput('en-u3-20', 'en-u3', 'Unit 3 · On the way', '请写出Unit 3的英文标题。', 'On the way', 'Unit 3的标题是On the way。', { titleOnly: true, topic: '标题填空' })
];

DAILY_QUESTIONS.push(...EXTRA_QUESTIONS);

// 按单元交错排列基础题和补充题，让孩子从每单元一开始就遇到不同题型。
// 数学第一单元的基础题和拓展题按不同分值合计100分：基础20题×3分，拓展10题×4分。
DAILY_QUESTIONS.filter((question) => question.unitId === 'ma-u1').forEach((question) => {
  const number = Number(question.id.split('-').pop());
  question.points = number >= 21 ? 4 : 3;
});

const MIXED_QUESTIONS = ACTIVE_UNIT_IDS.flatMap((unitId) => {
  const unitQuestions = DAILY_QUESTIONS.filter((question) => question.unitId === unitId);
  const groups = [];
  for (let start = 0; start < unitQuestions.length; start += 10) groups.push(unitQuestions.slice(start, start + 10));
  const mixed = [];
  for (let index = 0; index < 10; index += 1) {
    groups.forEach((group) => {
      if (group[index]) mixed.push(group[index]);
    });
  }
  return mixed;
});
DAILY_QUESTIONS.splice(0, DAILY_QUESTIONS.length, ...MIXED_QUESTIONS);

const QUESTION_BY_ID = new Map(DAILY_QUESTIONS.map((question) => [question.id, question]));
const STORAGE_KEY = 'little-practice-station-v5';

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
let currentFilter = 'starter';
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

function questionUnitId(question) {
  return question.unitId || question.id;
}

function getQuestions(filter = currentFilter) {
  if (filter === 'all') return DAILY_QUESTIONS;
  if (filter === 'starter') return DAILY_QUESTIONS.filter((question) => STARTER_UNIT_IDS.includes(questionUnitId(question)));
  if (filter.startsWith('unit:')) {
    const unitId = filter.slice(5);
    return DAILY_QUESTIONS.filter((question) => questionUnitId(question) === unitId);
  }
  return DAILY_QUESTIONS.filter((question) => question.subject === filter);
}

function getCurrentQuestion() {
  const questions = getQuestions();
  return questions[currentIndex];
}

function activeUnits(subject = null) {
  const subjects = subject ? [subject] : SUBJECT_ORDER;
  return subjects.flatMap((item) => UNIT_CATALOG[item].filter((unit) => unit.available));
}

function unitTotalScore(unitId) {
  return unitQuestions(unitId).reduce((sum, question) => sum + question.points, 0);
}

function unitEarnedScore(unitId) {
  return unitQuestions(unitId).reduce((sum, question) => sum + (state.answers[question.id]?.correct ? question.points : 0), 0);
}

function filterTotalScore(filter = currentFilter) {
  return getQuestions(filter).reduce((sum, question) => sum + question.points, 0);
}

function earnedScore(filter = currentFilter) {
  return getQuestions(filter).reduce((sum, question) => sum + (state.answers[question.id]?.correct ? question.points : 0), 0);
}

function subjectQuestions(subject) {
  return DAILY_QUESTIONS.filter((question) => question.subject === subject);
}

function unitAnsweredCount(unitId) {
  return unitQuestions(unitId).filter((question) => state.answers[question.id]).length;
}

function subjectCompleted(subject) {
  return activeUnits(subject).filter((unit) => unitQuestions(unit.id).length && unitAnsweredCount(unit.id) === unitQuestions(unit.id).length).length;
}

function answeredCount(filter = currentFilter) {
  return getQuestions(filter).filter((question) => state.answers[question.id]).length;
}

function correctCount(filter = currentFilter) {
  return getQuestions(filter).filter((question) => state.answers[question.id]?.correct).length;
}

function getUnitMeta(unitId) {
  for (const subject of SUBJECT_ORDER) {
    const unit = UNIT_CATALOG[subject].find((item) => item.id === unitId);
    if (unit) return { ...unit, subject };
  }
  return null;
}

function filterLabel(filter) {
  if (filter === 'starter') return '开学起步';
  if (filter === 'all') return '全部已开放单元';
  if (SUBJECTS[filter]) return SUBJECTS[filter].name;
  if (filter.startsWith('unit:')) return getUnitMeta(filter.slice(5))?.title || '当前单元';
  return '当前练习组';
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
  if (question.kind === 'order') {
    return Array.isArray(value) && value.length === question.answer.length && value.every((item, index) => Number(item) === Number(question.answer[index]));
  }
  return Number(value) === Number(question.answer);
}

function answerText(question) {
  if (question.kind === 'input') return question.answerText || question.answer;
  if (question.kind === 'order') return question.answerText;
  return question.options[question.answer];
}

function subjectProgressMarkup(subject) {
  const units = activeUnits(subject);
  const total = units.length;
  const done = subjectCompleted(subject);
  const percent = total ? Math.round((done / total) * 100) : 0;
  const meta = SUBJECTS[subject];
  return `<div class="mini-subject">
    <span class="mini-subject-icon ${subject}">${meta.short}</span>
    <div class="mini-subject-body">
      <div class="mini-subject-name"><span>${meta.name}</span><em>${done} / ${total}单元</em></div>
      <div class="mini-progress"><span class="${meta.progressClass}" style="width:${percent}%"></span></div>
    </div>
  </div>`;
}

function unitQuestions(unitId) {
  return DAILY_QUESTIONS.filter((question) => questionUnitId(question) === unitId);
}

function renderUnitGroups() {
  const container = document.querySelector('#unitGroups');
  if (!container) return;
  container.innerHTML = SUBJECT_ORDER.map((subject) => {
    const meta = SUBJECTS[subject];
    const units = UNIT_CATALOG[subject];
    return `<section class="unit-group ${subject}-unit-group" aria-labelledby="${subject}UnitsTitle">
      <div class="unit-group-title">
        <span class="mini-subject-icon ${subject}">${meta.short}</span>
        <div><h3 id="${subject}UnitsTitle">${escapeHTML(meta.name)}</h3><p>${subject === 'english' ? '沪教版五四制新教材 · 正文仍需按课本逐单元核对' : '按教材目录逐单元练习'}</p></div>
      </div>
      <div class="unit-list">${units.map((unit, index) => {
        const questions = unitQuestions(unit.id);
        const isAvailable = unit.available && questions.length > 0;
        const isPriority = isAvailable && STARTER_UNIT_IDS.includes(unit.id);
        const total = isAvailable ? unitTotalScore(unit.id) : 0;
        const earned = isAvailable ? unitEarnedScore(unit.id) : 0;
        const answered = isAvailable ? unitAnsweredCount(unit.id) : 0;
        const status = !isAvailable ? '后续制作' : answered === questions.length ? `已完成 · ${earned} / ${total}分` : `${earned} / ${total}分`;
        return `<button class="unit-choice${isPriority ? ' priority' : ''}${isAvailable ? '' : ' locked'}" ${isAvailable ? `data-unit-start="${escapeHTML(unit.id)}"` : ''} type="button" aria-label="${isAvailable ? `练习${escapeHTML(unit.title)}` : `${escapeHTML(unit.title)}，后续制作`}" ${isAvailable ? '' : 'disabled'}>
          <span class="unit-index">${String(index + 1).padStart(2, '0')}</span>
          <span class="unit-copy"><strong>${escapeHTML(unit.title)}</strong><small>${escapeHTML(unit.lessons)}</small></span>
          <span class="unit-status">${isPriority ? `<em>开学优先</em><span>${escapeHTML(status)}</span>` : escapeHTML(status)}<b aria-hidden="true">${isAvailable ? '→' : '·'}</b></span>
        </button>`;
      }).join('')}</div>
    </section>`;
  }).join('');
}

function updateDashboard() {
  const total = filterTotalScore(currentFilter);
  const completed = earnedScore(currentFilter);
  const answered = answeredCount(currentFilter);
  const accuracy = answered ? `${Math.round((correctCount(currentFilter) / answered) * 100)}%` : '—';
  const progress = total ? Math.round((completed / total) * 100) : 0;

  document.querySelector('#completedStat').textContent = completed;
  document.querySelector('#totalQuestionCount').textContent = total;
  document.querySelector('#streakStat').textContent = getStreak();
  document.querySelector('#accuracyStat').textContent = accuracy;
  document.querySelector('#taskProgress').textContent = `${filterLabel(currentFilter)} · ${completed} / ${total} 分`;
  document.querySelector('#mistakeCount').textContent = state.mistakes.length;
  document.querySelector('#mistakeBigCount').textContent = state.mistakes.length;
  document.querySelector('#weekProgressBar').style.width = `${progress}%`;
  document.querySelector('#weekProgressText').textContent = `${progress}%`;
  document.querySelector('#miniSubjectList').innerHTML = SUBJECT_ORDER.map(subjectProgressMarkup).join('');

  document.querySelector('#starterQuestionCount').textContent = `${STARTER_UNIT_IDS.length} 个单元`;
  document.querySelector('#allQuestionCount').textContent = `${activeUnits().length} 个单元`;
  SUBJECT_ORDER.forEach((subject) => {
    const unitTotal = activeUnits(subject).length;
    const status = document.querySelector(`#${subject}CardStatus`);
    const count = document.querySelector(`#${subject}QuestionCount`);
    if (status) status.textContent = `${subjectCompleted(subject)} / ${unitTotal} 单元`;
    if (count) count.textContent = `${unitTotal} 个单元`;
  });
  renderUnitGroups();
}

function renderQuestion() {
  const questions = getQuestions();
  if (!questions.length) return;
  if (currentIndex >= questions.length) currentIndex = questions.length - 1;
  if (currentIndex < 0) currentIndex = 0;

  if (completionFilter === currentFilter) {
    questionPanel.innerHTML = `<div class="completed-banner">
      <div class="completed-check" aria-hidden="true">✓</div>
      <div><h3>这一单元完成啦！</h3><p>本组得分 <strong>${earnedScore(currentFilter)} / ${filterTotalScore(currentFilter)} 分</strong>。休息一下，再去挑战下一个单元吧。</p><button class="primary-button" data-action="restart" type="button">再看一遍 <span>↻</span></button></div>
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
      <input id="answerInput" inputmode="${escapeHTML(question.inputMode || 'numeric')}" autocomplete="off" value="${escapeHTML(inputValue)}" placeholder="${escapeHTML(question.placeholder || '写出答案')}" aria-label="输入答案" ${isAnswered ? 'readonly' : ''} />
      ${question.unitLabel ? `<span class="fill-unit">${escapeHTML(question.unitLabel)}</span>` : ''}
    </div>`;
  } else if (question.kind === 'order') {
    const orderSelection = Array.isArray(selected) ? selected : [];
    mainContent += `<div class="order-instruction">请按正确顺序依次点击下面的内容。</div>
      <div class="order-selected">${orderSelection.length ? `已选：${orderSelection.map((index) => `<span>${orderSelection.indexOf(index) + 1}. ${escapeHTML(question.items[index])}</span>`).join('')}` : '<span class="order-placeholder">还没有选择</span>'}</div>
      <div class="order-grid" role="list" aria-label="排序选项">${question.items.map((item, index) => {
        const position = orderSelection.indexOf(index);
        const classes = ['order-button'];
        if (position >= 0) classes.push('selected');
        return `<button class="${classes.join(' ')}" data-order-index="${index}" type="button" ${isAnswered || position >= 0 ? 'disabled' : ''}><span class="order-number">${position >= 0 ? position + 1 : '·'}</span><span>${escapeHTML(item)}</span></button>`;
      }).join('')}</div>
      ${!isAnswered && orderSelection.length ? '<button class="clear-order" data-action="clear-order" type="button">重新排序</button>' : ''}`;
  } else {
    const letters = question.kind === 'judge' ? ['✓', '×'] : ['A', 'B', 'C', 'D'];
    const optionClass = question.kind === 'judge' ? ' judge-options' : '';
    mainContent += `<div class="options-grid${optionClass}" role="radiogroup" aria-label="答案选项">${question.options.map((option, index) => {
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
      feedback = `<div class="answer-feedback"><span class="feedback-icon">✓</span><span><strong>答对啦！本题得 ${question.points} 分。</strong> ${escapeHTML(question.explanation)}</span></div>`;
    } else {
      feedback = `<div class="answer-feedback wrong"><span class="feedback-icon">!</span><span><strong>再记一记：本题 0 分。</strong>正确答案是“${escapeHTML(answerText(question))}”。${escapeHTML(question.explanation)}</span></div>`;
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
      <span class="question-number">第 ${numberText} 题 · ${question.points} 分</span>
    </div>
    <div class="question-lesson">${escapeHTML(question.lesson)} · ${escapeHTML(question.topic)} · ${escapeHTML(question.typeLabel || '练习')}</div>
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
    const hasSelection = question.kind === 'input'
      ? Boolean(pending)
      : question.kind === 'order'
        ? Array.isArray(pending) && pending.length === question.items.length
        : pending !== null && pending !== undefined;
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
  updateDashboard();
  renderQuestion();
}

function openPractice(filter = 'starter') {
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
  if (question.kind === 'order' && (!Array.isArray(value) || value.length !== question.items.length)) {
    showToast('请先按顺序选完所有内容');
    return;
  }
  if (value === null || value === '') {
    showToast(question.kind === 'input' ? '先写下答案，再来检查吧' : '先选完答案，再来检查吧');
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
  const groupLabel = filterLabel(currentFilter);
  const total = filterTotalScore(currentFilter);
  const completed = earnedScore(currentFilter);
  const answered = answeredCount(currentFilter);
  const questionTotal = getQuestions(currentFilter).length;
  const finished = questionTotal > 0 && answered === questionTotal;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const reportPercent = document.querySelector('#reportPercent');
  const ring = document.querySelector('#reportRing');
  reportPercent.textContent = `${percent}%`;
  ring.style.borderRightColor = percent > 50 ? 'var(--teal-dark)' : '#bce2d5';
  ring.style.borderTopColor = percent > 25 ? 'var(--teal-dark)' : '#bce2d5';
  document.querySelector('#reportSummaryTitle').textContent = answered === 0 ? '还没有开始' : finished ? `${groupLabel}完成！` : `已经得到 ${completed} 分`;
  document.querySelector('#reportSummaryText').textContent = answered === 0 ? '陪孩子先完成当前单元，给今天一个轻松的开始吧。' : finished ? `这一小组得分 ${completed} / ${total} 分。看一眼错题解析，再决定要不要重做。` : `当前得分进度 ${percent}%，做完以后记得看一眼错题解析。`;
  document.querySelector('#reportSubjects').innerHTML = SUBJECT_ORDER.map((subject) => {
    const done = activeUnits(subject).reduce((sum, unit) => sum + unitEarnedScore(unit.id), 0);
    const subjectTotal = activeUnits(subject).reduce((sum, unit) => sum + unitTotalScore(unit.id), 0);
    const percentSubject = subjectTotal ? Math.round((done / subjectTotal) * 100) : 0;
    const meta = SUBJECTS[subject];
    const color = subject === 'chinese' ? 'var(--coral)' : subject === 'math' ? 'var(--yellow)' : 'var(--lilac)';
    return `<div class="report-subject-row"><span>${meta.name}</span><div class="report-bar"><span style="width:${percentSubject}%;background:${color}"></span></div><strong>${done}/${subjectTotal}分</strong></div>`;
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

  const unitStart = event.target.closest('[data-unit-start]');
  if (unitStart) {
    openPractice(`unit:${unitStart.dataset.unitStart}`);
    return;
  }

  const subjectStart = event.target.closest('[data-subject-start]');
  if (subjectStart) {
    openPractice(subjectStart.dataset.subjectStart);
    return;
  }

  const orderOption = event.target.closest('[data-order-index]');
  if (orderOption && !orderOption.disabled) {
    const question = getCurrentQuestion();
    if (!question || question.kind !== 'order') return;
    const selectedOrder = draftAnswer && draftAnswer.id === question.id && Array.isArray(draftAnswer.value)
      ? [...draftAnswer.value]
      : [];
    const index = Number(orderOption.dataset.orderIndex);
    if (!selectedOrder.includes(index)) selectedOrder.push(index);
    draftAnswer = { id: question.id, value: selectedOrder };
    renderQuestion();
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
    if (type === 'clear-order') {
      const question = getCurrentQuestion();
      if (question?.kind === 'order') {
        draftAnswer = { id: question.id, value: [] };
        renderQuestion();
      }
    }
    return;
  }

  const review = event.target.closest('[data-review-id]');
  if (review) {
    const question = QUESTION_BY_ID.get(review.dataset.reviewId);
    if (!question) return;
    const unitFilter = `unit:${questionUnitId(question)}`;
    const index = getQuestions(unitFilter).findIndex((item) => item.id === question.id);
    showView('home');
    setFilter(unitFilter, index);
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

document.querySelector('#startToday').addEventListener('click', () => openPractice('starter'));
document.querySelector('#openReport').addEventListener('click', () => {
  updateReport();
  document.querySelector('#reportModal').hidden = false;
});

updateDashboard();
renderQuestion();
renderMistakes();
