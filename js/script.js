// Функция для загрузки JSON файла с переводами
function loadLanguage(lang) {
    const url = `/js/${lang}.json`;  // Путь к файлу перевода

    // Запрашиваем файл с переводом
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки перевода: ${response.statusText}`);
            }
            return response.json();  // Преобразуем ответ в JSON
        })
        .then(data => {
            // Привязываем данные из JSON к элементам HTML

            if (data.name) document.getElementById('name').textContent = data.name;
            if (data.age) document.getElementById('age').textContent = `Возраст: ${data.age}`;
            if (data.bio) document.getElementById('bio').textContent = data.bio;

            // Создаём список навыков
            const skillsList = document.getElementById('skills');
            skillsList.innerHTML = '';  // Очищаем текущий список
            if (data.skills) {
                data.skills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

// Переключение языка, например, при нажатии на кнопку
function switchLanguage(lang) {
    localStorage.setItem('language', lang); // Сохраняем выбранный язык
    loadLanguage(lang); // Загружаем новый язык
}

// Функция для загрузки языка из localStorage или по умолчанию
function loadLanguageFromStorage() {
    const savedLang = localStorage.getItem('language'); // Проверяем, есть ли сохранённый язык
    if (savedLang) {
        loadLanguage(savedLang); // Если язык найден, загружаем его
    } else {
        loadDefaultLanguage(); // Если нет, определяем язык браузера
    }
}

// Функция для определения языка по умолчанию (можно дополнить проверкой языка браузера)
function loadDefaultLanguage() {
    const defaultLang = 'ru';  // Можешь сделать дефолт на 'ru' или какой-то другой
    localStorage.setItem('language', defaultLang); // Сохраняем дефолтный язык
    loadLanguage(defaultLang); // Загружаем дефолтный язык
}

// Загружаем язык при загрузке страницы
window.onload = loadLanguageFromStorage;
