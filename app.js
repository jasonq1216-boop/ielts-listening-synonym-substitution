const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const LETTERS = ["A", "B", "C", "D"];
const STORAGE_KEY = "charlie-synonym-practice-v1";

const semanticSets = {
  change: ["preserve", "maintain", "monitor", "confirm", "combine", "organise", "replace", "alter"],
  amount: ["minimum", "average", "maximum", "portion", "level", "volume", "range", "quantity"],
  growth: ["maintain", "stabilise", "decline", "restrict", "reduce", "offset", "limit", "decrease"],
  reduction: ["increase", "expand", "intensify", "maintain", "raise", "develop", "strengthen", "extend"],
  time: ["occasionally", "previously", "eventually", "regularly", "temporarily", "simultaneously", "annually", "immediately"],
  place: ["boundary", "district", "region", "surroundings", "interior", "destination", "location", "area"],
  movement: ["commute", "explore", "navigate", "migrate", "transfer", "transport", "travel", "walk"],
  observation: ["observe", "notice", "recognise", "identify", "monitor", "interpret", "review", "inspect"],
  people: ["resident", "visitor", "client", "employee", "spectator", "participant", "audience", "staff"],
  quality: ["adequate", "typical", "reliable", "suitable", "efficient", "convenient", "practical", "standard"],
  learning: ["interpret", "revise", "memorise", "outline", "evaluate", "summarise", "research", "analyse"],
  communication: ["announce", "recommend", "inform", "discuss", "respond", "clarify", "describe", "explain"],
  food: ["ingredients", "cuisine", "recipe", "diet", "produce", "refreshment", "meal", "flavour"],
  default: ["particularly", "otherwise", "certainly", "eventually", "available", "relevant", "individual", "specific"]
};

const categoryTriggers = {
  reduction: ["reduce", "decrease", "decline", "less", "minim", "cut", "loss", "fall", "lower"],
  growth: ["increase", "growth", "greater", "more", "rise", "soar", "expand", "rapid", "higher"],
  change: ["change", "replace", "alter", "amend", "transform", "develop", "create", "construct", "build", "make"],
  time: ["time", "year", "day", "month", "schedule", "deadline", "advance", "early", "later", "previous", "now", "regular"],
  place: ["location", "place", "area", "region", "coast", "field", "house", "home", "building", "floor", "room", "space"],
  movement: ["travel", "transport", "walk", "ride", "drive", "navigate", "migrate", "journey", "move", "flight"],
  observation: ["see", "view", "show", "look", "recogn", "identify", "find", "check", "notice", "monitor"],
  people: ["people", "student", "staff", "worker", "resident", "audience", "customer", "client", "family", "women"],
  quality: ["important", "good", "best", "ideal", "quality", "difficult", "easy", "suitable", "effective", "significant"],
  learning: ["learn", "study", "research", "question", "dissertation", "knowledge", "science", "academic", "training"],
  communication: ["talk", "speech", "discuss", "advice", "suggest", "explain", "contact", "feedback", "information"],
  food: ["food", "meal", "cooking", "restaurant", "diet", "fish", "drink", "coffee", "lunch", "ingredients"]
};

// Short Chinese glosses are kept locally so feedback remains instant on phones.
// A phrase-level entry takes priority over the word-by-word fallback below.
const phraseGlossary = {
  "be of value": "有价值；有用", "be of interest": "值得关注；有趣", "high season": "旺季", "peak time": "高峰时段",
  "in advance": "提前", "ahead of schedule": "比计划提前", "straight away": "立刻；马上", "turn off": "关闭（设备）",
  "switch off": "关掉（电源或设备）", "reduction in price": "降价", "look through": "浏览；查看", "make a reservation": "预订",
  "as well as": "以及；和……一样", "keep in touch with": "与……保持联系", "known as": "被称为", "climate change": "气候变化",
  "global warming": "全球变暖", "make notes": "记笔记", "write down": "写下；记录", "for the first time": "第一次",
  "per head": "每人；按人头", "per person": "每人", "painting and wallpapering": "粉刷和贴墙纸",
  "at no extra charge": "不另收费", "fully booked": "全部订满", "no places left": "没有余位", "have a dip": "游泳；泡一会儿水",
  "take part in": "参加", "get in touch with": "与……取得联系", "a variety of": "各种各样的；多种的",
  "a list of": "一系列；一份清单", "on a regular basis": "定期地", "in order to": "为了；以便", "rather than": "而不是",
  "more than": "超过；多于", "a number of": "若干；一些", "as a result of": "由于；作为……的结果", "due to": "由于；因为",
  "result in": "导致；造成", "lead to": "导致；引起", "free of": "没有；免于", "make use of": "利用；使用",
  "in the past": "过去", "at the moment": "此刻；目前", "by chance": "偶然地", "a sense of belonging": "归属感",
  "a great deal of": "大量的", "a lot of": "大量；许多", "in addition": "此外；另外", "as well": "也；此外",
  "face to face": "面对面地", "on display": "展出；陈列", "on the river bank": "在河岸边", "a 2-minute walk from": "步行约两分钟可到",
  "at all times": "始终；任何时候", "set up": "建立；设立", "take off": "脱下；移开", "deal with": "处理；应对",
  "look after": "照顾；照看", "good value for money": "物有所值", "stand the test of time": "经得起时间考验"
};

const wordGlossary = {
  antique:"古老的；古董的", approximate:"大约的", approximately:"大约", address:"地址；演讲；处理", additional:"额外的", advice:"建议", affect:"影响", agriculture:"农业", alarm:"警报", alter:"改变", amazing:"令人惊叹的", ambition:"抱负", amusement:"娱乐", announce:"宣布", annual:"年度的", answer:"答案", area:"区域；面积", audience:"观众；听众", avoid:"避免", available:"可获得的；有空的",
  beach:"海滩", beneficial:"有益的", best:"最好的", bigger:"更大的", bike:"自行车", booking:"预订", build:"建造", building:"建筑物", budget:"预算", business:"商业；生意",
  café:"咖啡馆", campaign:"活动；运动", care:"照顾；关心", central:"中心的；核心的", ceremony:"仪式", challenge:"挑战", change:"改变", charge:"收费；费用", cheap:"便宜的", cheaper:"更便宜的", client:"客户", climate:"气候", coast:"海岸", coach:"教练", collaborate:"合作", commercial:"商业的", community:"社区", compare:"比较", complain:"抱怨", complex:"复杂的", concentrate:"集中注意力", concern:"担忧；关注", confirm:"确认", construction:"建设；施工", contact:"联系", conversation:"谈话", cost:"成本；费用", create:"创造；创建", critical:"关键的；批判性的", crop:"庄稼；作物", culture:"文化", customer:"顾客",
  damage:"损害；损坏", deadline:"截止日期", decrease:"减少", decorate:"装饰", decorating:"装饰；装修", deduction:"扣除；减免", delay:"延迟", demand:"需求；要求", destination:"目的地", develop:"发展；开发", difficult:"困难的", discount:"折扣", discuss:"讨论", display:"展示；陈列", document:"文件", donation:"捐款", duration:"持续时间",
  easy:"容易的", economy:"经济", efficient:"高效的", employee:"雇员", encourage:"鼓励", entertainment:"娱乐", environment:"环境", equipment:"设备", essential:"必要的；重要的", event:"事件", excellent:"优秀的", exhibition:"展览", expand:"扩大", expensive:"昂贵的", explain:"解释", explore:"探索", extra:"额外的",
  faculty:"教职人员", familiar:"熟悉的", fast:"快速的", feedback:"反馈", fee:"费用", field:"领域；田地", film:"电影", find:"找到；发现", fitness:"健康；体能", flexible:"灵活的", focus:"专注；焦点", food:"食物", free:"免费的；自由的", fund:"资金", furniture:"家具",
  garden:"花园", general:"总体的；一般的", goal:"目标", good:"好的", greater:"更大的；更多的", growth:"增长", guide:"指南；引导", guideline:"指导方针",
  habit:"习惯", health:"健康", helpful:"有帮助的", high:"高的", holiday:"假期", home:"家", house:"房子", hurt:"受伤；伤害",
  ideal:"理想的", identify:"识别；确认", important:"重要的", improve:"改善", increase:"增加", independent:"独立的", indicate:"表明", individual:"个人；个体", information:"信息", injury:"受伤；伤害", insight:"洞见", interest:"兴趣；关注", interpret:"解释；理解", introduction:"介绍", invest:"投资", issue:"问题；议题",
  journey:"旅程", just:"仅仅；正好",
  keep:"保持；保留", keen:"热衷的", knowledge:"知识",
  lack:"缺乏", larger:"更大的", later:"之后；更晚", learn:"学习", leave:"离开", legal:"法律的", less:"更少的", level:"水平；层级", lifestyle:"生活方式", light:"灯；轻的", likely:"可能的", local:"当地的", location:"地点；位置", look:"看；外观", lower:"更低的",
  maintain:"维持；保持", major:"主要的", make:"制作；使得", manage:"管理；设法做到", manner:"方式", meal:"一餐", measure:"衡量；措施", medical:"医疗的", member:"成员", memorable:"难忘的", message:"信息；含义", minimum:"最小值", monitor:"监测；监督", more:"更多", movement:"移动；动作", movie:"电影",
  natural:"自然的", near:"靠近的", need:"需要", new:"新的", normal:"正常的", notice:"注意到；通知", number:"数量",
  objective:"目标；客观的", occasion:"场合", offer:"提供", old:"旧的；老的", online:"在线的", option:"选择", organise:"组织", original:"最初的；原创的", overall:"总体的",
  participant:"参与者", particular:"特别的", payment:"付款", people:"人们", performance:"表演；表现", period:"时期", person:"人", personal:"个人的", perspective:"观点；视角", place:"地方；放置", plan:"计划", pollution:"污染", potential:"潜力；可能的", practical:"实用的", precise:"精确的", predict:"预测", previous:"以前的", price:"价格", priority:"优先事项", problem:"问题", process:"过程", produce:"生产；产品", product:"产品", progress:"进展", project:"项目", provide:"提供", public:"公众的；公共的",
  quality:"质量", question:"问题", quickly:"快速地", quiet:"安静的",
  rapid:"快速的", rarely:"很少", reason:"原因", recognise:"认出；承认", recommendation:"建议；推荐", reduce:"减少", region:"地区", regularly:"定期地", relevant:"相关的", reliable:"可靠的", remove:"移除", replace:"替换", research:"研究", resident:"居民", result:"结果", review:"复习；回顾", rise:"上升；增长", risk:"风险", route:"路线",
  safety:"安全", schedule:"日程；时间表", science:"科学", score:"分数", search:"搜索", see:"看见", service:"服务", significant:"重要的；显著的", similar:"相似的", simple:"简单的", size:"大小", skill:"技能", social:"社会的", source:"来源", specific:"具体的；特定的", staff:"员工", standard:"标准", start:"开始", strategy:"策略", strength:"优势；力量", student:"学生", study:"学习；研究", subject:"主题；科目", suitable:"合适的", support:"支持", surprise:"惊讶；意外", survey:"调查", system:"系统",
  talk:"谈话；讨论", teaching:"教学", technique:"技巧", term:"术语；学期", theatre:"剧院；戏剧", threat:"威胁", time:"时间", topic:"主题", train:"训练；火车", trainer:"培训师；教练", travel:"旅行", treatment:"治疗", trend:"趋势", true:"真的；正确的", type:"类型",
  unclear:"不清楚的", understand:"理解", unemployment:"失业", unique:"独特的", unsafe:"不安全的", use:"使用", useful:"有用的",
  value:"价值", variety:"多样性", vehicle:"车辆", view:"观点；景色；看法", visitor:"访客", volume:"体积；数量", volunteer:"志愿者",
  walk:"步行", warning:"警告", wealth:"财富", weather:"天气", web:"网络", well:"好地；健康的", wider:"更宽的", wildlife:"野生动物", worker:"工人", workforce:"劳动力", work:"工作", writer:"作者",
  youth:"青年", younger:"更年轻的"
};

const pairExplanations = {
  "decorating|painting and wallpapering": "decorating 是“装修／装饰”的总称；painting（粉刷）和 wallpapering（贴墙纸）正是两类具体的装修工作。因此听到这两个动作并列出现时，可以把它理解为对 decorating 的具体展开。",
  "be of value|be of interest": "be of value 强调“有价值、有用”；be of interest 强调“值得关注”。在资料对应的听力语境里，两者都在说明某事对听者有意义，后者用关注点来改说价值。",
  "remove|delete": "remove 是“移除”的一般说法；delete 特指把文字、文件或记录从系统中删除。题目语境指的是删除这一类移除动作，所以 delete 是最贴切的替换。",
  "change|replace": "change 是改变；replace 是“用新的替代原来的”。当听力强调旧内容被另一个内容取代时，replace 比泛泛的 change 更准确。",
  "turn off|switch off": "turn off 和 switch off 都可表示关闭电器、电源或功能；二者的核心搭配对象相同，因此可互相替换。",
  "high season|peak time": "high season 指需求或客流最高的旺季；peak time 指活动量最高的高峰时段。两者都把重点放在“最繁忙、需求最高”的时间。",
  "in advance|ahead of schedule": "in advance 是“提前做”；ahead of schedule 是“比原计划更早”。在强调提前完成或提前安排的语境中，后者把“提前”说得更具体。",
  "climate change|global warming": "global warming 是全球平均气温上升这一现象；它是 climate change 中最常见、最重要的一部分。原表在相关听力语境中把它作为气候变化的具体说法。",
  "make notes|write down": "make notes 指做笔记；write down 指把内容写下来。前者是学习任务的说法，后者是具体动作，因此在听讲记录信息时可以互换。",
  "per head|per person": "per head 和 per person 都表示“每人／按人头计算”，常用在费用、数量或配额的说明里。",
  "result in|lead to": "result in 和 lead to 都表示“导致、引起”，后面通常接结果；两者都用于说明因果关系。",
  "set up|establish": "set up 和 establish 都可以指建立机构、系统或项目；establish 更正式，set up 更口语化。",
  "look after|take care of": "look after 与 take care of 都表示照看、照顾，常接人、动物或物品。"
};

let questions = [];
let provenanceGroups = [];
let meaningMap = Object.create(null);
let currentRound = [];
let activeOptions = [];
let cursor = 0;
let sessionAnswers = [];
let hasAnswered = false;
let lastMissed = [];
let stats = loadStats();

function loadStats() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { attempts: 0, correct: 0, streak: 0, maxStreak: 0, mistakes: {} };
  } catch {
    return { attempts: 0, correct: 0, streak: 0, maxStreak: 0, mistakes: {} };
  }
}

function saveStats() { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }
function repairText(value) {
  return String(value)
    .replace(/([A-Za-z]+(?:n['’]t|['’](?:m|s|re|ve|ll|d)))(?=[A-Za-z])/g, "$1 ")
    .replace(/\bna vigate\b/gi, "navigate")
    .replace(/\bem otional\b/gi, "emotional")
    .replace(/\bme ntal\b/gi, "mental")
    .replace(/\bpiecies\b/gi, "pieces")
    .replace(/\bjewellry\b/gi, "jewellery")
    .trim();
}
function normalize(value) { return repairText(value).toLowerCase().replace(/[^a-z]+/g, " ").trim(); }
function meaningKey(value) { return repairText(value).replaceAll("’", "'").toLowerCase().replace(/\s+/g, " ").trim(); }
function words(value) { return normalize(value).split(" ").filter(Boolean); }
function shuffle(values) { const copy = [...values]; for (let i = copy.length - 1; i > 0; i -= 1) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; }
function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char])); }

function hasMeaning(phrase) { return Boolean(meaningMap[meaningKey(phrase)]); }
function meaningFor(phrase) {
  const meaning = meaningMap[meaningKey(phrase)];
  if (!meaning) throw new Error(`缺少中文释义：${phrase}`);
  return meaning;
}

function whyFor(question) {
  const key = `${normalize(question.prompt)}|${normalize(question.answer)}`;
  if (pairExplanations[key]) return pairExplanations[key];
  const promptMeaning = meaningFor(question.prompt);
  const answerMeaning = meaningFor(question.answer);
  return `本题中，“${question.prompt}”指“${promptMeaning}”；正确项“${question.answer}”指“${answerMeaning}”。题库依据对应听力语境把后者列为要识别的改说；判断时要看两者在原句传递的信息是否一致，而不能脱离原句把两个表达随意互换。`;
}

function sourceGroupFor(questionId) {
  return provenanceGroups.find((group) => questionId >= group.idStart && questionId <= group.idEnd) || null;
}

function contextForSource(sourceLabel, question) {
  const match = /^C(\d+)\s*·\s*Test\s*(\d+)\s*·\s*Part\s*(\d+)$/.exec(sourceLabel);
  if (!match) return `本条定位于 ${sourceLabel}。回听该部分时，重点辨认题干“${question.prompt}”如何被改说为“${question.answer}”。`;
  const [, book, test, part] = match;
  const partType = {
    "1": "Part 1 的日常生活对话",
    "2": "Part 2 的生活场景独白",
    "3": "Part 3 的学习或讨论对话",
    "4": "Part 4 的学术主题独白"
  }[part] || `Part ${part}`;
  return `本条定位于剑雅 ${book} Test ${test} ${partType}。回听该部分时，重点辨认题干“${question.prompt}”如何被改说为“${question.answer}”；公开版以中文定位说明代替英文听力原句。`;
}

function provenanceFor(question) {
  const provenance = question?.provenance && typeof question.provenance === "object" ? question.provenance : {};
  const sourceGroup = sourceGroupFor(question.id);
  const resolvedLabel = typeof provenance.sourceLabel === "string" && provenance.sourceLabel.trim()
    ? provenance.sourceLabel.trim()
    : sourceGroup?.sourceLabel;
  const sourceLabel = resolvedLabel || "来源待补充";
  const contextZh = typeof provenance.contextZh === "string" && provenance.contextZh.trim()
    ? provenance.contextZh.trim()
    : resolvedLabel
      ? contextForSource(resolvedLabel, question)
    : `原表未为这一条标注具体剑雅卷、Test 或 Part；目前保留 PDF 第 ${question.page} 页作为回查位置。`;
  const reason = typeof provenance.reason === "string" && provenance.reason.trim()
    ? provenance.reason.trim()
    : whyFor(question);
  const sourceNote = typeof provenance.sourceNote === "string" && provenance.sourceNote.trim()
    ? provenance.sourceNote.trim()
    : resolvedLabel
      ? "出处依据原表分组标题定位；公开版不展示剑雅英文听力原句。"
      : "该条来源仍在根据原表分组标题回查。";
  return { sourceLabel, contextZh, reason, sourceNote, verified: Boolean(resolvedLabel) };
}

function provenanceMarkup(question) {
  const provenance = provenanceFor(question);
  const status = provenance.verified ? "来源已定位" : "来源待补充";
  return `
    <section class="provenance-card" aria-label="真题定位与替换说明">
      <div class="provenance-heading">
        <div>
          <span>真题定位与替换说明</span>
          <strong>${escapeHtml(provenance.sourceLabel)}</strong>
        </div>
        <small class="provenance-status${provenance.verified ? " verified" : ""}">${status}</small>
      </div>
      <div class="provenance-details">
        <div><span>中文语境定位</span><p>${escapeHtml(provenance.contextZh)}</p></div>
        <div><span>为什么可以替换</span><p>${escapeHtml(provenance.reason)}</p></div>
      </div>
      <p class="provenance-note">${escapeHtml(provenance.sourceNote)}</p>
    </section>`;
}

function optionMeaningMarkup(option, label, isCorrect) {
  return `<article class="option-meaning-card${isCorrect ? " is-correct" : ""}" data-answer="${escapeHtml(option)}"><div class="option-meaning-label">${isCorrect ? "正确选项释义" : `选项 ${label} 释义`}</div><strong>${escapeHtml(option)}</strong><p>中文意思：${escapeHtml(meaningFor(option))}</p></article>`;
}

function getCategory(question) {
  const text = `${question.prompt} ${question.answer}`.toLowerCase();
  return Object.entries(categoryTriggers).find(([, triggers]) => triggers.some((trigger) => text.includes(trigger)))?.[0] || "default";
}

function getOptions(question) {
  const correct = question.answer;
  const excluded = new Set([normalize(correct), normalize(question.prompt)]);
  const category = getCategory(question);
  const expectedWords = words(correct).length;
  const fromSemanticSet = shuffle(semanticSets[category]).filter((value) => !excluded.has(normalize(value)) && hasMeaning(value));
  const answerPool = shuffle(questions.map((item) => item.answer)).filter((value) => {
    const cleaned = normalize(value);
    const wordDistance = Math.abs(words(value).length - expectedWords);
    return !excluded.has(cleaned) && wordDistance <= 2 && value.length <= 48 && hasMeaning(value);
  });
  const fallbackPool = shuffle(questions.flatMap((item) => [item.answer, item.prompt])).filter((value) => !excluded.has(normalize(value)) && hasMeaning(value));
  const candidates = [...fromSemanticSet, ...answerPool, ...fallbackPool];
  const unique = [];
  for (const value of candidates) {
    const key = normalize(value);
    if (key && !excluded.has(key)) { unique.push(value); excluded.add(key); }
    if (unique.length === 3) break;
  }
  if (unique.length !== 3) throw new Error(`干扰项释义不足：${question.id}`);
  return shuffle([correct, ...unique]);
}

function showView(viewName) {
  $$(".view").forEach((view) => view.classList.remove("active"));
  $(`#${viewName}View`).classList.add("active");
  $$(".nav-link").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  if (viewName === "bank") renderBank();
  if (viewName === "review") renderReview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function updateStats() {
  const accuracy = stats.attempts ? Math.round((stats.correct / stats.attempts) * 100) : "--";
  const activeMistakes = getMistakes().length;
  $("#headerAccuracy").textContent = `${accuracy}${accuracy === "--" ? "" : "%"}`;
  $("#totalAttempts").textContent = stats.attempts;
  $("#streak").textContent = stats.maxStreak;
  $("#mastered").textContent = Object.values(stats.mistakes).filter((item) => item.correct >= item.wrong && item.wrong > 0).length;
  $("#mistakeNav").textContent = activeMistakes;
}

function getPool() {
  const page = $("#pageFilter").value;
  return page === "all" ? questions : questions.filter((item) => item.page === Number(page));
}

function startRound(items = null) {
  const source = items?.length ? items : getPool();
  const requestedCount = Number($("#questionCount").value);
  currentRound = shuffle(source).slice(0, Math.min(requestedCount, source.length));
  cursor = 0;
  sessionAnswers = [];
  lastMissed = [];
  showView("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = currentRound[cursor];
  if (!question) return finishRound();
  hasAnswered = false;
  $("#quizProgress").textContent = `${cursor + 1} / ${currentRound.length}`;
  $("#progressFill").style.width = `${(cursor / currentRound.length) * 100}%`;
  $("#questionPrompt").textContent = question.prompt;
  $("#sourcePage").textContent = `来源：PDF 第 ${question.page} 页`;
  const lookupWord = words(question.prompt)[0] || question.prompt;
  $("#oxfordLink").href = `https://www.oxfordlearnersdictionaries.com/search/english/direct/?q=${encodeURIComponent(lookupWord)}`;
  activeOptions = getOptions(question);
  $("#options").innerHTML = activeOptions.map((option, index) => `<button class="option" data-answer="${escapeHtml(option)}" data-label="${LETTERS[index]}"><span class="option-letter">${LETTERS[index]}</span>${escapeHtml(option)}</button>`).join("");
  $("#feedback").hidden = true;
  $("#feedback").className = "feedback";
  $("#nextRow").hidden = true;
  $$(".option").forEach((button) => button.addEventListener("click", () => {
    if (hasAnswered) showOptionMeaning(button.dataset.answer, button.dataset.label);
    else answerQuestion(button.dataset.answer);
  }));
}

function showOptionMeaning(option, label) {
  const question = currentRound[cursor];
  $$(".option").forEach((button) => button.classList.toggle("gloss-active", button.dataset.answer === option));
  $$(".option-meaning-card").forEach((card) => card.classList.toggle("gloss-active", card.dataset.answer === option));
}

function answerQuestion(chosen) {
  if (hasAnswered) return;
  hasAnswered = true;
  const question = currentRound[cursor];
  const isCorrect = normalize(chosen) === normalize(question.answer);
  const record = stats.mistakes[question.id] || { wrong: 0, correct: 0 };
  stats.attempts += 1;
  if (isCorrect) {
    stats.correct += 1;
    stats.streak += 1;
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
    record.correct += 1;
  } else {
    stats.streak = 0;
    record.wrong += 1;
    lastMissed.push(question);
  }
  stats.mistakes[question.id] = record;
  saveStats();
  updateStats();
  sessionAnswers.push({ question, isCorrect });
  $$(".option").forEach((button) => {
    button.classList.add("locked");
    button.setAttribute("aria-disabled", "true");
    const value = button.dataset.answer;
    if (normalize(value) === normalize(question.answer)) button.classList.add("correct");
    if (normalize(value) === normalize(chosen) && !isCorrect) button.classList.add("incorrect");
  });
  const feedback = $("#feedback");
  feedback.hidden = false;
  feedback.classList.toggle("incorrect", !isCorrect);
  feedback.innerHTML = `
    <div class="feedback-title"><strong>${isCorrect ? "答对了。" : "答案已标出。"}</strong> ${isCorrect ? "继续用语境判断，而不是只看单词长得像不像。" : `正确替换是 “${escapeHtml(question.answer)}”。`}</div>
    <div class="meaning-grid">
      <div><span>题干意思</span><strong>${escapeHtml(question.prompt)}</strong><p>${escapeHtml(meaningFor(question.prompt))}</p></div>
      <div><span>正确选项意思</span><strong>${escapeHtml(question.answer)}</strong><p>${escapeHtml(meaningFor(question.answer))}</p></div>
    </div>
    <div class="why-box"><span>为什么是它？</span><p>${escapeHtml(whyFor(question))}</p></div>
    ${provenanceMarkup(question)}
    <section class="all-option-meanings" aria-label="全部选项中文释义">
      <div class="all-option-meanings-heading">四个选项的中文意思</div>
      <div class="option-meanings-list">${activeOptions.map((option, index) => optionMeaningMarkup(option, LETTERS[index], normalize(option) === normalize(question.answer))).join("")}</div>
    </section>
    <p class="option-hint">所有选项的释义已完整展示；点击任一选项可高亮对应释义。</p>`;
  const correctButton = $$(".option").find((button) => normalize(button.dataset.answer) === normalize(question.answer));
  showOptionMeaning(question.answer, correctButton?.dataset.label || "");
  $("#nextRow").hidden = false;
  $("#nextButton").textContent = cursor + 1 === currentRound.length ? "查看本轮结果 →" : "下一题 →";
}

function nextQuestion() { cursor += 1; renderQuestion(); }

function finishRound() {
  const right = sessionAnswers.filter((item) => item.isCorrect).length;
  const total = sessionAnswers.length || 1;
  const percentage = Math.round((right / total) * 100);
  $("#progressFill").style.width = "100%";
  $("#scorePercent").textContent = `${percentage}%`;
  $("#scoreHeading").textContent = percentage >= 85 ? "替换敏感度很在线。" : percentage >= 60 ? "基础扎实，再压一压易混项。" : "先从错题里找回语境感。";
  $("#scoreDetail").textContent = `本轮答对 ${right} / ${sessionAnswers.length} 题${lastMissed.length ? `，已收集 ${lastMissed.length} 道错题` : "，本轮全对"}。`;
  $("#retryMissed").hidden = !lastMissed.length;
  showView("result");
}

function getMistakes() {
  return questions.filter((question) => {
    const record = stats.mistakes[question.id];
    return record && record.wrong > record.correct;
  });
}

function populatePageFilters() {
  const pages = [...new Set(questions.map((item) => item.page))].sort((a, b) => a - b);
  const options = pages.map((page) => `<option value="${page}">PDF 第 ${page} 页</option>`).join("");
  $("#pageFilter").insertAdjacentHTML("beforeend", options);
  $("#bankPageFilter").insertAdjacentHTML("beforeend", options);
}

function renderBank() {
  const query = $("#bankSearch").value.trim().toLowerCase();
  const page = $("#bankPageFilter").value;
  const matches = questions.filter((item) => (page === "all" || item.page === Number(page)) && `${item.prompt} ${item.answer}`.toLowerCase().includes(query));
  $("#bankCount").textContent = `显示 ${matches.length.toLocaleString()} / ${questions.length.toLocaleString()} 条`;
  $("#bankList").innerHTML = matches.map((item) => `<article class="bank-item"><div class="bank-prompt">${escapeHtml(item.prompt)}</div><div class="bank-answer">${escapeHtml(item.answer)}</div><span class="page-tag">P.${item.page}</span><button class="practice-one" data-id="${item.id}" aria-label="练习该题">→</button></article>`).join("");
  $$(".practice-one").forEach((button) => button.addEventListener("click", () => startRound([questions.find((item) => item.id === Number(button.dataset.id))])));
}

function renderReview() {
  const mistakes = getMistakes();
  $("#reviewEmpty").hidden = Boolean(mistakes.length);
  $("#reviewList").hidden = !mistakes.length;
  $("#practiceMistakes").hidden = !mistakes.length;
  $("#reviewList").innerHTML = mistakes.map((question) => {
    const record = stats.mistakes[question.id];
    return `<article class="review-item"><div><small>原始短语 · P.${question.page}</small><strong>${escapeHtml(question.prompt)}</strong></div><div><small>正确替换</small><strong class="correct-answer">${escapeHtml(question.answer)}</strong></div><div><small>练习记录</small><strong>${record.wrong} 错 / ${record.correct} 对</strong></div></article>`;
  }).join("");
}

function wireInterface() {
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  $("#startButton").addEventListener("click", () => startRound());
  $("#nextButton").addEventListener("click", nextQuestion);
  $("#quitQuiz").addEventListener("click", () => showView("home"));
  $("#retryMissed").addEventListener("click", () => startRound(lastMissed));
  $("#newRound").addEventListener("click", () => { showView("home"); setTimeout(() => startRound(), 100); });
  $("#practiceMistakes").addEventListener("click", () => startRound(getMistakes()));
  $("#bankSearch").addEventListener("input", renderBank);
  $("#bankPageFilter").addEventListener("change", renderBank);
  document.addEventListener("keydown", (event) => {
    if (!$("#quizView").classList.contains("active") || hasAnswered) return;
    const index = LETTERS.indexOf(event.key.toUpperCase());
    if (index >= 0) $$(".option")[index]?.click();
  });
}

async function loadMeaningMap() {
  const indexResponse = await fetch("./data/meanings-index.json");
  if (!indexResponse.ok) throw new Error("meaning index unavailable");
  const index = await indexResponse.json();
  if (!Array.isArray(index.shards) || !index.shards.length) throw new Error("meaning index is empty");
  const shards = await Promise.all(index.shards.map(async (path) => {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`meaning shard unavailable: ${path}`);
    return response.json();
  }));
  meaningMap = Object.assign(Object.create(null), ...shards);
  if (Number(index.count) !== Object.keys(meaningMap).length) throw new Error("meaning data is incomplete");
}

function assertMeaningCoverage() {
  const visibleExpressions = [
    ...questions.flatMap((question) => [question.prompt, question.answer]),
    ...Object.values(semanticSets).flat()
  ];
  const missing = [...new Set(visibleExpressions.filter((value) => !hasMeaning(value)))];
  if (missing.length) throw new Error(`missing meanings: ${missing.slice(0, 5).join(", ")}`);
}

async function init() {
  const response = await fetch("./data/questions.json");
  if (!response.ok) throw new Error("question bank unavailable");
  questions = (await response.json()).map((question) => ({
    ...question,
    prompt: repairText(question.prompt),
    answer: repairText(question.answer)
  }));
  await loadMeaningMap();
  assertMeaningCoverage();
  try {
    const provenanceResponse = await fetch("./data/provenance-groups.json");
    if (!provenanceResponse.ok) throw new Error("provenance index unavailable");
    const provenanceIndex = await provenanceResponse.json();
    provenanceGroups = Array.isArray(provenanceIndex.groups) ? provenanceIndex.groups : [];
  } catch {
    provenanceGroups = [];
  }
  $("#sourceCount").textContent = questions.length.toLocaleString();
  populatePageFilters();
  updateStats();
  wireInterface();
}

init().catch((error) => {
  console.error(error);
  document.body.innerHTML = "<main style='padding:40px;font-family:sans-serif'>题库或词义数据未能完整加载，请刷新页面后重试。</main>";
});

