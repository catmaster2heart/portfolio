
function bindDataToElements(data) {
    Object.keys(data).forEach(key => {
        // Поиск элемента по ID
        const element = document.getElementById(key);
        // Поиск элемента по классу
        const elementsByClass = document.getElementsByClassName(key);

        if (element) {
            updateElementContent(element, data[key]);
        }

        // Обновляем все элементы с указанным классом, избегая конфликта с ID
        if (elementsByClass.length > 0 && !element) {
            Array.from(elementsByClass).forEach(el => {
                updateElementContent(el, data[key]);
            });
        }
    });
}

// Функция обновления содержимого элемента
function updateElementContent(element, value) {
    if (Array.isArray(value)) {
        element.innerHTML = ''; // Очищаем список
        value.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            element.appendChild(li);
        });
    } else {
        element.textContent = value;
    }
}

// Функция для загрузки JSON файла с переводами
function loadLanguage(lang) {
    const url = `../js/${lang}.json`; // Путь к файлу перевода

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки перевода: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Используем универсальную функцию для обработки данных
            bindDataToElements(data);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Переключение языка
function switchLanguage(lang) {
    localStorage.setItem('language', lang); // Сохраняем выбранный язык
    loadLanguage(lang); // Загружаем новый язык
}

// Загрузка языка из localStorage или по умолчанию
function loadLanguageFromStorage() {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
        loadLanguage(savedLang);
    } else {
        loadDefaultLanguage();
    }
}

// Установка языка по умолчанию
function loadDefaultLanguage() {
    const defaultLang = 'ru'; // Язык по умолчанию
    localStorage.setItem('language', defaultLang);
    loadLanguage(defaultLang);
}

// Загружаем язык при загрузке страницы
window.onload = loadLanguageFromStorage;
