# MyReads: A Book Reading App

This app allows you to add books to three book shelves: 'Currently Reading', 'Want to Read' and (already) 'Read'. You can search for books and add them to your shelves, as well as moving books from one shelf to another. All the components are modular and reusable, and the app is designed to be performant and scalable.

## App Components

### App.js

The App has two pages: Main and Search. App.js acts as a router to these two pages, and also has the 'updateShelf' function which is called by each book's select dropdown on both pages.

This component has a 'shelves' array which lists the shelves that will be rendered. You can add more shelves to the array and they will appear both on the Main page and in each book's dropdown.

All components in the app declare PropTypes to ensure that the right data is being passed.

### Main.js

This displays the user's book shelves. Main.js calls the ShowBook component to render each book's image, title and author. Books can be moved from one shelf to another using the dropdown.

### Search.js

Here you can type search terms and see book results from the BooksAPI. Lodash's 'debounce' package is used to delay search results while the user is typing. Localstorage is used to persist the search term and results when navigating away from the page. Book results are shown using the ShowBook component.

### ShowBook.js

This component is shared by Main and Search. It renders each book's image and information, and it will also show an image slug if no image is available. It calls MoveBook to render the selection dropdown for each book.

### MoveBook.js

Finally we have the dropdown selector. The Main and Search pages share this reusable component. The 'updateShelf' function is called whenever a book is moved, and both pages are instantly updated.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Install all project dependencies

```
npm install
```

Start the development server

```
npm start
```
Go to http://localhost to view the Main page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Built With

* [React](https://github.com/facebook/react)
* [React Router](https://github.com/ReactTraining/react-router)
* [Node/npm](https://github.com/nodejs/node)

## Author

* **Adam Love**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

