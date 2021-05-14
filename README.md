# Medical-Devices-WebApp

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#overview">Overview</a>
      <ul>
        <li><a href="#technologies-and-frameworks">Technologies and Frameworks</a></li>
      </ul>
    </li>
    <li>
      <a href="#project-setup">Project Setup</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#compiles-and-hot-reloads-for-development">Compiles and hot-reloads for development</a></li>
      </ul>
    </li>
    <li>
    	<a href="#development-overview">Development Overview</a>
        <ul>
        	<li><a href="#software-architecture">Software Architecture</a></li>
            <li><a href="#folder-structure">Folder Structure</a></li>
        </ul>
    </li>
    <li><a href="#roadmap">Area of improvement</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## Overview

This project is developed for the purpose of technical assessment in [Bitfountain.co](http://bitfountain.co/) for the position of Software Engineer.
The project is developed with Vue.js framework and [Flux](https://facebook.github.io/flux/) is used as software architecture.

### Technologies and Frameworks

- [Vue.js](https://vuejs.org/)
- [Vuex](https://vuex.vuejs.org/)
- [BootstrapVue](https://bootstrap-vue.org/)
- Programming Language: TypeScript
- Tested with: Google Chrome

## Project setup

### Installation

- Clone the project
  ```
  git clone https://github.com/tajirhas9/Medical-Devices-WebApp.git
  ```
- Go to project directory.
- install dependencies
  ```
  npm install
  ```

### Compiles and hot-reloads for development

```
npm run serve
```

## Development Overview

### Software Architecture

Software architecture used for this project is [Flux](https://facebook.github.io/flux/). Flux is developed by Facebook as an alternative solution to the problems that exist in current MVC implementation. For applications that need responsive UI, Flux architecture is proven to be more effective than MVC, also it ensures one way data binding, so no state update directly occurs from the view that makes the codebase more maintainable and reduces UI dependencies.

For implementing Flux architecture, Vue.js has recommended package [Vuex](https://vuex.vuejs.org/) that is used in the project.

Currently, the data flow in the app works as follows:

- Store is the single source of truth in the application.
- On any event trigger, that needs state update, an action is dispatched from the view.
- That action processes the task first i.e. any asynchronous network call is made in this action.
- After executing any backend api call or logical process needed for the state update, the action method commits a mutation.
- That mutation is responsible for any kind of update in the store.
- We can access the data in the store directly in the UI or by getter methods.

<img src="https://vuex.vuejs.org/vuex.png" alt="Vuex" class="center">

So, we can see that, the view can only read data from the store. It cannot directly update or manipulate data inside the store. The view needs to dispatch an action, that commits a mutation to the store.

This is the overall architecture that is used in the application.

### Folder Structure

<img src="public/images/root-folder-structure.png" alt="Root Folder Structure" class="center">
