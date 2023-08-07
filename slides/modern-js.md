---
layout: intro
---

# Modern JS Development

<Toc mode="onlySiblings" />

---
layout: two-cols
---

## Node Package Manager

[Node.js](https://nodejs.org) is a JavaScript runtime that allows to run JavaScript outside of the browser.
In addition to this usefull feature, it also comes with an important ecosystem for all kinds of JavaScript projects.

The [Node Package Manager](https://www.npmjs.com) (NPM) is a package manager that allows to install and manage dependencies for JavaScript projects.

The possibility to depend on external packages is a key feature of development.
It allows to reuse code and to build on top of other projects.
This also makes it easy to share abstract modules in internal projects.

```bash
npm install <package-name>
```

To use npm we need to install Node.js.

::right::

<v-img src="./img/node.png" class="ml-18" width="300px" height="500px" />

---
layout: two-cols
---

## Frameworks & Libraries

Nowadays, there are a lot of frameworks and libraries that can be used to build web applications.

Some of the most popular ones are:

-   [React](https://reactjs.org)
-   [Vue](https://vuejs.org)
-   [Angular](https://angular.io)
-   [Svelte](https://svelte.dev)

These frameworks and libraries are used to build the user interface of web applications and provide a lot of useful features out of the box.

They also bring their own ecosystem of packages that can be used to extend their functionality, allowing us to concentrate on the actual application logic.

::right::

<v-img src="./img/storing-books.png" class="ml-8" width="400px" height="500px" />

---
layout: two-cols
---

## TypeScript

[TypeScript](https://www.typescriptlang.org) is a superset of JavaScript that adds static typing to the language.

Static typing means that the types of variables are known at compile time and can be checked to prevent errors.

TypeScript needs to be transpiled to JavaScript before it can be executed in the browser since browsers only understand JavaScript.

TypeScript is a great tool to prevent errors and to make code more readable and maintainable, especially in large code bases.

::right::

```js
// JavaScript
function add(a, b) {
	return a + b;
}

const sum = add(1, 2);
const sum = add(false, "hello"); // fine for JavaScript
// but it causes problems at runtime
```

```ts
// TypeScript
function add(a: number, b: number): number {
	return a + b;
}

const sum = add(1, 2);
const sum = add(false, "hello"); // typescript error
// the error is caught at transpile time
```

---
layout: two-cols
---

## Bundlers

Bundlers are tools that allow to bundle JavaScript modules into a single file that can be executed in the browser.

This allows us to manage the project to our liking and use the bundler to build the final application which can then be optimized for production.

One of the most popular bundler tools is [vite](https://vitejs.dev). It is not only a bundler tool but also brings a lot of other useful features like:

-   A development server
-   TypeScript support
-   Hot module replacement

::right::

<v-img src="./img/building-user-interface.png" class="ml-8" width="400px" height="500px" />
