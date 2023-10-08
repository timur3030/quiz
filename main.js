const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

// Находим элементы
const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

// Переменные игры
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

// Функции

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  // Вопрос
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  // Ответы
  for ([index, answerText] of questions[questionIndex]["answers"].entries()) {
    const questionTemplate = `
		<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
		</li>
	`;
    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", index + 1);

    listContainer.innerHTML += answerHTML;
  }
}

function checkAnswer() {
  // Находим выбранную радио кнопку
  const checkedRadio = listContainer.querySelector("input:checked");

  // Если ответ не выбран, ничего не делаем и выходим из функции
  if (!checkedRadio) {
    submitBtn.blur();
    return;
  }

  // Узнаем номер ответа пользователя
  const userAnswer = +checkedRadio.value;

  // Если ответил верно увеличиваем счет
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  // Проверяем последний ли вопрос
  if (questionIndex !== questions.length - 1) {
    // Это не последний вопрос
    questionIndex++;
    clearPage();
    showQuestion();
    return;
  } else {
    // Это последний вопрос
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;
  let title, message;

  // Варианты заголовка и текста
  if (score === questions.length) {
    title = "Поздравляем!";
    message = "Вы ответили верно на все вопросы!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Неплохой результат!";
    message = "Вы дали более половины правильных ответов!";
  } else {
    title = "Стоит постараться еще раз!";
    message = "Пока у вас меньше половины правильных ответов!";
  }

  // Результат
  let result = `${score} из ${questions.length}`;

  // Финальный ответ, подставляем данные в шаблон
  const finalMessage = resultTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;

  // Меняем кнопку на играть снова
  submitBtn.blur();
  submitBtn.innerHTML = "Играть заново";
  submitBtn.onclick = () => history.go();
}
