/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

// Первое задание
const advertisement = document.querySelectorAll('.promo__adv img');
advertisement.forEach(item => item.remove());

// Второе задание
const promoBg = document.querySelector('.promo__bg');
// const genre = document.querySelector('.promo__genre');
const genre = promoBg.querySelector('.promo__genre');
genre.textContent = 'драма';

// Третье задание
// promoBg.style.cssText = `
//     background: url('../img/bg.jpg') center center/100% 100% no-repeat;
// `;
promoBg.style.backgroundImage = "url('../img/bg.jpg')";

// Четвертое и пятое задание
const listOfFilms = document.querySelector('.promo__interactive-list');
const itemsOfFilms = listOfFilms.querySelectorAll('.promo__interactive-item');
const filmsSort = movieDB.movies.sort();
// listOfFilms.innerHTML = '';
// Первый способ
// for (let i = 0; i < filmsSort.length; i++) {
//     const li = document.createElement('li');
//     li.classList.add('promo__interactive-item');
//     li.innerHTML = `${i + 1}. ${filmsSort[i]} <div class="delete"></div>`;
//     listOfFilms.append(li);
// }
// Второй способ
// filmsSort.forEach((film ,i) => {
//     listOfFilms.innerHTML += `
//         <li class="promo__interactive-item">${i + 1}. ${film}
//             <div class="delete"></div>
//         </li>
//     `;
// });
// Третий способ
// Не нужно очищать сам список
itemsOfFilms.forEach((item, i) => {
    // Выведет так этот текст, нужно заранее создать эл-т
    // item.prepend(`<span>${i}</span>`);
    
    // item.innerHTML = `${filmsSort[i]}`;
    // item.insertAdjacentHTML('afterbegin', `${i}. `);

    item.innerHTML = `${i + 1}. ${filmsSort[i]} <div class="delete"></div>`;
});

// Node List не работает так -> Type Error
// for (let i = 0; i < itemsOfFilms.length; i++) {
//     itemsOfFilms[i] = filmsSort[i];
// }