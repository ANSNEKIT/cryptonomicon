# Cryptonomicon
Учебный проект на Vue3, Tailwind css. Создан при прохождении бесплатного курса по VueJs.
Автор курса Илья Климов - лидер проекта Javascript.Ninja

demo - https://ansnekit.github.io/cryptonomicon-app

Приложение содержит базовый функцонал для получения курса криптовалют с биржи cryptocompare.com и обладает следующей функциональностью:
* Реализован компонентный подход
* Содержит фильтр валют 
* Работа с АПИ - https://www.cryptocompare.com. Взаимодействие с АПИ реализовано через Web Socket.
* На странице можно добавлять/удалять криптовалюты, делать пагинацию по страницам. 
* Реализована возможность выбирать валюту и смотреть отображение графика изменения цены по курсу Криптовалюта/USD
* Сохранение выбранных криптовалют в LocalStorage. При загрузке страницы реализована проверка: если есть данные в LocalStorage, то загружаются из него.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
