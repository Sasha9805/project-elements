/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	const form = document.querySelector('form.add'),
				input = form.querySelector('.adding__input'),
				inputCheck = form.querySelector('[type="checkbox"]');
	form.addEventListener('submit', e => {
		e.preventDefault();
		let inputText = input.value;
		
		if (inputText) {
			inputText = inputText[0].toUpperCase() + inputText.slice(1);
			inputText = (inputText.length > 21) ? inputText.slice(0, 21) + '...' : inputText;
			movieDB.movies.push(inputText);

			if (inputCheck.checked) {
				console.log('Добавлен любимый');
			}

			// Мое решение
			// sortArr(movieDB.movies);
			// const li = `
			// 	<li class="promo__interactive-item">${inputText}
			// 			<div class="delete"></div>
			// 	</li>
			// `;
			// listOfFilms.insertAdjacentHTML('beforeend', li);
			// itemsOfFilms = listOfFilms.querySelectorAll('.promo__interactive-item');
			// createMovieList(movieDB.movies, itemsOfFilms);

			// С функцией Ивана
			createMovieList(movieDB.movies, listOfFilms);
		}

		// Очистка формы
		e.target.reset();
	});

	// Первое задание
	const advertisement = document.querySelectorAll('.promo__adv img');
	const deleteAdv = arr => {
		arr.forEach(item => item.remove());
	};

	deleteAdv(advertisement);

	// Второе задание
	const promoBg = document.querySelector('.promo__bg');
	// const genre = document.querySelector('.promo__genre');
	const genre = promoBg.querySelector('.promo__genre');

	// Третье задание
	// promoBg.style.cssText = `
	//     background: url('img/bg.jpg') center center/100% 100% no-repeat;
	// `;
	
	const makeChanges = () => {
		genre.textContent = 'драма';
		promoBg.style.backgroundImage = "url('img/bg.jpg')";
	};

	makeChanges();

	// Четвертое и пятое задание
	let listOfFilms = document.querySelector('.promo__interactive-list');
	let itemsOfFilms = listOfFilms.querySelectorAll('.promo__interactive-item');
	
	const sortArr = (arr) => {
		return arr.sort();
	};
	
	// sortArr(movieDB.movies);

	// let filmsSort = sortArr(movieDB.movies);

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
	// itemsOfFilms.forEach((item, i) => {
	//     // Выведет так этот текст, нужно заранее создать эл-т
	//     // item.prepend(`<span>${i}</span>`);

	//     // item.innerHTML = `${filmsSort[i]}`;
	//     // item.insertAdjacentHTML('afterbegin', `${i}. `);

	//     item.innerHTML = `${i + 1}. ${filmsSort[i]} <div class="delete"></div>`;
	// });

	// function createMovieList(films, parent) {
	// 	parent.forEach((item, i) => {
	// 		item.innerHTML = `${i + 1}. ${films[i]} <div class="delete"></div>`;
	// 	});
	// 	// Вешаем события на корзинки
	// 	addEventDelete(document.querySelectorAll('.delete'));
	// }

	// Версия Ивана
	// Он работает со списком фильмов, а не с элементами списка
	// Исп. второй способ добавления (см. выше)
	function createMovieList(films, parent) {
		parent.innerHTML = '';
		// Тогда не нужно в осн. потоке ее вызывать
		sortArr(films);
		films.forEach((film, i) => {
			parent.innerHTML += `
				<li class="promo__interactive-item">${i + 1}. ${film}
						<div class="delete"></div>
				</li>
	    `;
		});

		// Получение корзинок
		document.querySelectorAll('.delete').forEach( (btn, i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				movieDB.movies.splice(i, 1);

				// Рекурсия!
				createMovieList(films, parent);
			});
		});
	}

	// createMovieList(movieDB.movies, itemsOfFilms);
	// Функция Ивана
	createMovieList(movieDB.movies, listOfFilms);

	// Четвертый способ
	// for (let i = 0; i < itemsOfFilms.length; i++) {
	//     // Node List не работает так -> Type Error
	//     // itemsOfFilms[i] = filmsSort[i];
	//     itemsOfFilms[i].innerHTML = `${i + 1}. ${filmsSort[i]} <div class="delete"></div>`;
	// }

	// Мое решение с корзинками
	// function clickDelete(e) {
	// 	let parentElem = e.target.parentElement;
	// 	parentElem.remove();
	// 	rewriteList(parentElem, movieDB.movies, itemsOfFilms);
	// }
	// function rewriteList(elem, films, listItems) {
	// 	listItems = document.querySelectorAll('.promo__interactive-item');
	// 	for (let i = 0; i < films.length; i++) {
	// 		if (elem.firstChild.data.toLowerCase().includes(films[i].toLowerCase())) {
	// 			films.splice(i, 1);
	// 			break;
	// 		}
	// 	}
	// 	sortArr(films);
	// 	listItems.forEach((item, i) => {
	// 		item.firstChild.data = `${i + 1}. ${films[i]}`;
	// 	});
	// }
	// function addEventDelete(nodeList) {
	// 	nodeList.forEach(delItem => {
	// 		delItem.addEventListener('click', clickDelete);
	// 	});
	// }
});