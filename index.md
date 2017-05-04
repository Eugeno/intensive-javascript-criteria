# Список всех критериев базового интенсива


## Задача

### Код соответствует ТЗ проекта
Все обязательные пункты ТЗ выполнены

### При выполнении кода не возникает необработанных ошибок
При открытии диалогов, загрузки данных и работе с сайтом не возникает ошибок, программа не ломается и не зависает


## Именование

### Название переменных, параметров, свойств и методов начинается со строчной буквы и записываются в нотации [camelcase](https://ru.wikipedia.org/wiki/CamelCase) 

### Для названия значений используются английские существительные
Сокращения в словах запрещены. Сокращенные названия переменных можно использовать только, если такое название широко распространено. Допустимые сокращения:
- `xhr`, для объектов `XMLHttpRequest`
- `evt` для объектов `Event` и его производных (`MouseEvent`, `KeyboardEvent` и подобные)
- `ctx` для контекста канваса
- `i`, `j`, `k`, `l`, `t` для счетчика в цикле, `j` для счетчика во вложенном цикле и так далее по алфавиту
- если циклов два и более, то можно не переиспользовать переменную `i`
- `cb` для единственного коллбэка в параметрах функции

### Массивы названы существительными во множественном числе
Неправильно:
```js
var age = [12, 40, 22, 7];
var name = ['Иван', 'Петр', 'Мария', 'Алексей'];

var wizard = {
  name: 'Гендальф',
  friend: ['Саурон', 'Фродо', 'Бильбо']
}
```

Правильно:
```js
var ages = [12, 40, 22, 7];
var names = ['Иван', 'Петр', 'Мария', 'Алексей'];

var wizard = {
  name: 'Гендальф',
  friends: ['Саурон', 'Фродо', 'Бильбо']
}
```

### Название функции или метода содержит глагол (возможны исключения)
1. Исключение: функции конструкторы (в этом случае название функции должно соответствовать создаваемому объекту, подробнее ниже)
2. Исключение: функции обработчики/коллбэки (в этом случае название функции должно содержать указание на то, что это обработчик или коллбэк, подробнее ниже)

Название функции/метода должно быть глаголом и соответствовать действию, которое выполняет функция/метод. Например, можно использовать глагол `get` для функций/методов, которые что-то возвращают

Неправильно:
```js
var function1 = function(names) {
  names.forEach(function (name) {
    console.log(name);
  });
};

var wizard = {
  name: 'Гендальф',
  action: function () {
    console.log('Стреляю файрболлом!');
  }
};

var randomNumber = function() {
  return Math.random();
}
```

Правильно:
```js
var printNames = function(names) {
  names.forEach(function (name) {
    console.log(name);
  });
};

var wizard = {
  name: 'Гендальф',
  fire: function () {
    console.log('Стреляю файрболлом!');
  }
};

var getRandomNumber = function() {
  return Math.random();
}
```

### Названия констант (постоянных значений) написаны прописными (заглавными) буквами
Слова разделяются подчеркиваниями (`upper snake case`), например:
 ```js
 var MAX_HEIGHT = 400;
 var EARTH_RADIUS = 6370;
 ```

### Конструкторы названы английскими существительными. Название конструкторов начинается с заглавной буквы
Названия функций не являющихся конструкторами должны начинаться со строчной буквы
Неправильно:
```js
var wizard = function (name, age) {
  this.name = name;
  this.age = age;
}

var Fly = function(coordinate) {
  console.log('Смотрите я лечу!')
}
```

Правильно:
```js
var Wizard = function (name, age) {
  this.name = name;
  this.age = age;
}

var fly = function(coordinate) {
  console.log('Смотрите я лечу!')
}
```
 
### Переменные носят абстрактные названия и не содержат имён собственных (доп)

Неправильно:
```js
var keks = {
  name: 'Кекс'
}
```

Правильно:
```js
var cat = {
  name: 'Кекс'
}
```

### Название методов и свойств объектов не повторяет название объектов  (доп)
Неправильно:
```js
popup.openPopup = function() {
  console.log('I will open popup')
}
wizard.wizardName = 'Пендальф'
```

Правильно
```js
popup.open = function() {
  console.log('I will open popup')
}
wizard.name = 'Пендальф'
```

### Из названия обработчика события и функции-коллбэка следует, что это обработчик (доп)
Для единственного обработчика или функции можно использовать `callback` или `cb`. Для именования нескольких обработчиков внутри одного модуля используется `on` или `handler` и описание события. Название обработчика строится следующим образом:
 - `on` + (на каком элементе) + что случилось:
 
```js
 var onSidebarClick;
 var onContentLoad;
 
 var onResize;
```
 - (на каком элементе) + что случилось + `Handler`:
 
```js
 var sidebarClickHandler;
 var contentLoadHandler;
 
 var resizeHandler;
```


## Единообразие (доп)

### Все функции объявлены единообразно
Либо как [«функциональное выражение»](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function), либо как [«функциональное объявление»](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function). Что-то одно, смешивать не нужно.

Неправильно:
```js
var doSomethingElse = function () {
    // function body
};

function doSomething() {
  // function body
}
```

Правильно 1:
```js
function doSomething() {
  // function body
}

function doSomethingElse() {
  // function body
}
```

Правильно 2:
```js
var doSomething = function () {
    // function body
};

var doSomethingElse = function () {
    // function body
};
```

### Единый стиль именования
Стиль именования сохраняется во всех модулях, например:
- не следует мешать обработчики содержащие `Handler` и `on`
- если переменные, которые хранят DOM-элемент содержат слово `Element`, то это правило работает везде:
Неправильно:
```js
var popupMainElement = document.querySelector('.popup');
var sidebarNode = document.querySelector('.sidebar');
var similarContainer = popupMainElement.querySelector('ul.similar');
```

Правильно:
```js
var popupMainElement = document.querySelector('.popup');
var sidebarElement = document.querySelector('.sidebar');
var similarContainerElement = popupMainElement.querySelector('ul.similar');
```

### При использовании встроенного API, который поддерживает несколько вариантов использования, придерживаться одного способа (доп)
Неправильно:
```js
var popupMainElement = document.querySelector('#popup');
var sidebarElement = document.getElementById('sidebar');

var popupClassName = popupMainElement.getAttribute('class');
var sidebarClassName = sidebarElement.className

```

Правильно:
```js
var popupMainElement = document.querySelector('#popup');
var sidebarElement = document.querySelector('#sidebar');
```

```js
var popupClassName = popupMainElement.getAttribute('class');
var sidebarClassName = sidebarElement.getAttribute('class');

```

или

```js
var popupMainElement = document.getElementById('popup');
var sidebarElement = document.getElementById('sidebar');
```

```js
var popupClassName = popupMainElement.className;
var sidebarClassName = sidebarElement.className;

```

## Форматирование и внешний вид

### Используются обязательные блоки кода
В любых конструкциях, где подразумевается использование блока кода (фигурных скобок), таких как `for`, `while`, `if`, `switch`, `function` — блок кода используется обязательно, даже если инструкция состоит из одной строчки

Неправильно:
```js
if (x % 2 === 1) return
```

Правильно:
```js
if (x % 2 === 1) {
  return
}
```


### Список констант идёт перед основным кодом
Все константы выносятся в начало модуля/файла

### Код соответствует гайдлайнам (ESLint)
- Отступы между операторами и ключевым словами соответствуют стайлгайду.
- Для отступов используются одинаковые символы, вложенность кода обозначается отступами.
- Однообразно расставлены пробелы перед, после и внутри скобок, операторов и ключевых слов

*Указания к проверке*

Не возникает ошибок при проверке проекта ESLint: `npm i && npm test`


## Мусор

### В итоговом коде проекта находятся только те файлы, которые были на момент создания репозитория, которые были получены в патчах и файлы, созданные по заданию

### В коде проекта нет файлов, модулей и частей кода, которые не используются, включая, закомментированные участки кода
Нет файлов скриптов, которые не подключены в файле `index.html`

### В коде нет заранее недостижимых участков кода
Например:
Невыполнимые условия
```js
var happen = false;
if (happen) {
  console.log('This will not happen anyway!');
}
```

Операции после выхода из функции
```js
return;
console.log('This will not happen!');
```


## Корректность

### Константы нигде в коде не переопределяются
Константы используются только для чтения, и никогда не переопределяются на всем промежутке жизни программы

### Включен строгий режим (ESLint)
В коде запрещены небезопасные конструкции. Код работает в [строгом режиме](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Strict_mode). В начале js-файлов установлена директива 'use strict'

### Строгие сравнения вместо нестрогих (ESLint)
Вместо операторов нестрогого сравнения `==` и `!=`, используются операторы строгого сравнения `===`, `!==`. [Таблицы истинности](http://dorey.github.io/JavaScript-Equality-Table/) для JavaScript
Неправильно:
```js
var foo = ''
var bar = []
if (foo == bar) {
  destroy(world)
}
```

Правильно:
```js
var foo = ''
var bar = []
if (foo === bar) {
  destroy(world)
}
```

### В коде не используются зарезервированные слова в качестве имен переменных и свойств
В названия переменных и свойств не включаются операторы и ключевые слова зарезервированные для будущих версий языка (например, `class`, `extends`).
Список всех зарезервированных слов можно найти [тут](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords)   

### API встроенных функций и объектов используется правильно (доп)
Передаются корректные значения, которые ожидаются по спецификации
Нельзя:
```js
element.getAttribute('aria-pressed', false)
```

### Отсутствуют потенциально некорректные операции (доп)
Например некорректное сложение двух операндов как строк. Проблема приоритета конкатенации над сложением. Например:
Неправильно:
```js
new Date() + 1000;
```
Правильно:
```js
+new Date() + 1000;
```
Некорректные проверки на существование с числами. 
Пример некорректной проверки на то, что переменная является числом:
```js
var double = function (value) {
  if(!value) {
    return NaN;
  }
  
  return value * 2;
};

double(0);
double();
double(5);
```

## Модульность

### Все скрипты подключаются через файл `index.html`
Файлы скриптов подключаются перед закрывающимся тегом `</body>`, атрибуты `async` и `defer` не используются

### Все файлы JS представляют собой отдельные модули в [IIFE](https://google.com/iife) 
Экспорт значений производится через глобальную область видимости. Код вне модуля запрещен. Вне модуля могут распологаться комментарии и утилитные инструкции, такие как `'use strict';`
Пример правильного модуля:
```js
'use strict';
(function (){
window.load = function (url, onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);

  xhr.responseType = 'json';
  xhr.open('GET', url);
  xhr.send();
};
})();
```

### Все значения, используемые только внутри модулей ограничены по видимости
Из модуля ничего не должно попадать случайными образом в глобальную область видимости
Неправильно:
```js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  
  var userIcon = document.querySelector('.user');
 
  userIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popup.classList.remove('hidden');
    }
  });
})();
```

Правильно:
```js
'use strict';

var ENTER_KEYCODE = 13;
  
(function () {
  
  var userIcon = document.querySelector('.user');
 
  userIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      popup.classList.remove('hidden');
    }
  });
})();
```

### В случае, если одинаковый код повторяется в нескольких модулях, повторяющаяся часть вынесена в отдельный модуль (доп)
Критерий касается структурных единиц код — повторяющийся блок кода, либо функции с одним и теми же констукциями, например утилитные методы для проверки клавиш:
```js
// Файл keyboard.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  
  window.keyboard = {
    isKeyBoardEvent: function (evt) {
      return evt instanceof KeyboardEvent;
    },
    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    }
  }
})();
```
**Не стоит выносить в отдельный модуль одну повторяющуюся интсрукцию**:
```js
// Файл hide-gallery.js
'use strict';

(function () {
  window.hideGallery = function (gallery) {
    return gallery.classList.add('invisible');
  }
})();
```

### При экспорте из одного модуля нескольких значений используется пространство имен (доп)
Множественные значения записываются в один объект. Имя объекта совпадает с именем файла без учета кейса.
Неправильно:
```js
// Файл dialog-util.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  
  window.isEnterPressed = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };
  
  window.isEscPressed = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };
})();
```
Правильно:
```js
// Файл dialog-util.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  
  window.dialogUtil = {
    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    }
  }
})();
```

### Во всех модулях для ограничения области видимости используются IIFE и только он (доп)
Неправильно:
```js
'use strict';

window.load = function (url, onLoad) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', onLoad);

  xhr.responseType = 'json';
  xhr.open('GET', url);
  xhr.send();
};
```

Правильно:
```js
'use strict';

window.load = (function() {
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad);

    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
  };
})()
```

## Универсальность

### Код является кроссбраузерным и не вызывает ошибок в разных браузерах и разных Операционных Системах (ОС)
При проверке этого критерия, необходимо удостовериться в правильной работе и отсутствии сообщений об ошибках в выполняемых скриптах в браузерах: Chrome, Firefox, Safari, Microsoft Edge.
*Указания к проверке*
Допустимое исключение в кроссбраузерности кода: валидация форм в Safari. Safari плохо поддерживает работу с валидацией, например, не показывает ошибку, если при отправке формы не введены данные в поле с атрибутом required, поэтому небольшие ошибки, связанные с валидацией в Safari можно проигнорировать.
Тестирование необходимо проводить именно в последних версиях браузеров, которые предоставляют поставщики, а не те, которые установлены в данный момент на компьютере проверяющего.
Важно: для пользователей Windows последняя версия браузера Safari — 5, а у всех остальных — 9, поэтому проводить тестирование на Windows не надо.
IE не поддерживается, только Edge.
!!!!!!! ДАТЬ ПОДРОБНУЮ ИНСТРУКЦИЮ КАК И ГДЕ СКАЧАТЬ ВИРТУАЛЬНУЮ МАШИНУ ДЛЯ MAC и LINUX!!!!!
А также описать процесс тестирования и проверки


## Избыточность

### В проекте не должно быть избыточных проверок (доп)
Например, если заранее известно, что функция всегда принимает числовой параметр, то не следует проверять его на существование:

Неправильно:
```js
var isPositiveNumber = function (myNumber) {
  if (typeof myNumber === 'undefined') {
    throw new Error('Parameter is not defined');
  }
  return myNumber > 0;
};

isPositiveNumber(15);
isPositiveNumber(-30);
```

Правильно:
```js
var isPositiveNumber = function (myNumber) {
  return myNumber > 0;
};

isPositiveNumber(15);
isPositiveNumber(-30);
```

### Отсутствует дублирование кода: повторяющиеся части кода переписаны как функции (доп)
При написании кода следует придерживаться принципа [DRY](https://ru.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself)

### Если при использовании условного оператора в любом случае возвращается значение, альтернативная ветка опускается (доп)
Неправильно:
```js
if (2 > 1) {
  return val;
} else {
  return anotherVal;
}
```

Правильно:
```js
if (2 > 1) {
  return val;
}

return anotherVal;
```

### Отсутствуют лишние приведения и проверки типов (доп)
Если заранее известно что в переменной число, то нет смысла превращать переменную в число `parseInt(myNumber)`. Тоже касается и избыточной проверки булевой переменной:
Неправильно:
```js
if (booleanValue === true) {
  console.log('It\'s true!');
}
```

Правильно:
```js
if (booleanValue) {
  console.log('It\'s true!');
}
```

### Там где возможно, в присвоении значени вместо if используется тернарный оператор (доп)
Неправильно:
```js
var sex;
if (male) { 
  sex = 'Мужчина';
} else { 
  sex = 'Женщина';
}
```
Правильно:
```js
var sex = male ? 'Мужчина' : 'Женщина';
```
 
### Условия упрощены (доп)
Если функция возвращает булево значение, не используется `if..else` с лишними `return`:
Неправильно:
```js
if (firstValue === secondValue) {
  return true;
} else {
  return false;
}
```
Правильно:
```js
return firstValue === secondValue;
```


## Магия

### Нельзя пользоваться глобальной переменной `event`
Приводит к неосознанному коду:
```js
var elem = document.querySelector('.test');

var onElemClick = function () {
  event.target.innerText = 'you really need event'
};

elem.addEventListener('click', oneElemClick);
```
Студент пишет и код работает, спрашиваешь откуда `event` взялся — говорит что он всегда есть если мы сейчас что-то обрабатываем и бла-бла-бла или еще какую мифологию рождает про божественную переменную `event` которая есть только тогда когда есть, ну короче...

### В коде не используются «магические значения», под каждое из них заведена отдельная переменная, названная как константа (доп)


## Оптимальность

### Своевременный выход из цикла: цикл не работает дольше чем нужно
Неправильно:
```js
apartments.forEach(function (it, index) {
  if (index < 3) {
    render(it);
  }
});
```

Правильно:
```javascript
for (var i = 0; i < Math.min(apartments.length, 3); i++) {
  render(apartments[i]);
}
```

### Количество вызовов циклов минимизировано
Если задачу можно решить за один проход по циклу, вместо нескольких она должна быть решена за один

Неправильно:
```js
var wizardNames = source.map(function (it) {
    return it.wizard;
  }).map(function (it) {
    return it.name; 
  });
```

Правильно:
```js
var wizardNames = source.map(function (it) {
    return it.wizard.name;
  });
```

### Множественные DOM-операции производятся на элементах, которые не добавлены в DOM 
Например, наполнение скопированного из шаблона элемента данными

### Константы, используемые внутри функций создаются вне функций и используются повторно через замыкания (доп)

### Поиск элементов по селекторам делается минимальное количество раз, после этого ссылки на элементы сохраняются (доп)

Неправильно:
```js
for (var i = 0; i < Math.min(apartments.length, 3); i++) {
  var dialog = document.querySelector('.dialog');
  render(dialog, apartments[i]);
}
```

Правильно:
```javascript
var dialog = document.querySelector('.dialog');

for (var i = 0; i < Math.min(apartments.length, 3); i++) {
  render(dialog, apartments[i]);
}
```

### Сложные массивы и объекты, содержимое которых вычисляется, собираются один раз, а после этого только переиспользуются (доп)

### Точечно применять изменения (доп)
Не удалять массово классы, если можно убрать лишь предыдущий

Неправильно:
```js
var imageContainer = document.querySelector('.image-container');

var changeFilter = function (filterName) {
  imageContainer.classList.remove('filter-chrome', 'filter-sepia', 'filter-marvin', 'filter-phobos', 'filter-heat');
  imageContainer.classList.add(filterName);
};
```

Правильно:
```js
var imageContainer = document.querySelector('.image-container');

var currentFilter;
var changeFilter = function (filterName) {
  if (currentFilter) {
    imageContainer.classList.remove(currentFilter);
  }
  imageContainer.classList.add(filterName);
  currentFilter = filterName;
};
```

### Тонкие оптимизации (доп)
Очень тонкий критерий про, то как не надо делать
Например:
```js
var wizardNames = source.map(function (it) {
    return it.wizard;
  }).map(function (it) {
    return it.name; 
  });
```

```js
var names = names.concat(['Новое имя']);
```


## Сложность. Читаемость.

### Не используется один обработчик для разных событий (доп)
Одна функция не является обработчиком нескольких разных событий

### Длинные функции и методы разбиты на несколько небольших (доп)

### Для работы с JS-коллекциями используются итераторы для массивов
Итераторы используются для трансфорамаций массивов — `map`, `filter`, `sort` и прочие. А также для обхода проблемы потери окружения в циклах — `forEach`.
Например:
```js
elements.forEach(function (el) {
  el.onclick = function () {
    console.log(el);
  }
});
```

### Оператор присваивания не используется как часть выражения (доп)
Неправильно:
```js
imgGenerate(picArray = JSON.parse(data));
```

Правильно:
```js
picArray = JSON.parse(data);
imgGenerate(picArray);
```


## Безопасность

### Следить за подвешиванием и снятием обработчиков
Обработчики событий для виджетов добавляются только в момент появления виджета на странице и удаляются в момент их исчезновения.

**Защита от `memory-leak`**  
Кол-во обработчиков подвешенных на глобальную область видимости не должно возрастать. Например, если подвешивается обработчик, который следит за перемещением курсора по экрану, то он должен подвешиваться и отвешиваться в нужный момент. В случае если обработчик на `document` только подвешивается это может свидетельствовать о проблеме бесконечного создания обработчиков и потенциальной утечке памяти.

**Защита от неправильного поведения интерфейса**
 Например, на странице может существовать попап, который скрывается по `Esc`. Лучше для него гасить обработчик, если он не показан, потому что он может каким-то образом ломать поведение сайта — останавливать распространение, отменять дефолтное поведение и т.д. Поэтому поведение должно быть **явным** — если в этот момент времени обработчики не нужны, их нужно удалить. Явное и предсказуемое поведение.

### Запрещено использовать `innerHTML` и подобные ему свойства и методы для вставки пользовательских строк (имён, фамилий и т.д.)
Защита от XSS-атак, а также изменения исходных данных, запутывание пользователя и прочее
