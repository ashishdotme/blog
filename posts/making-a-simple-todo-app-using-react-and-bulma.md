---
title: Making a simple todo app using react and bulma
slug: making-a-simple-todo-app-using-react-and-bulma
date: "2018-10-27"
topic: coding
tags: ["react", "frontend", "redux", "asfgsa", "ASga"]
---

Redux is now the famous state management library but it can be overwhelming.
In this tutorial we will make a simple todo app with React, Redux and Bulma. Bulma is a awesome UI library. Here is a screenshot of what we will be making today

[View Demo](https://app.ashish.me/react-todo/) &nbsp;&nbsp;&nbsp;[View Source code](https://github.com/ashishdotme/react-todo)


![redux](https://i.imgur.com/EoGqczc.png)

Use `create react app` to make the react app.

```javascript
yarn create react-app my-app
```

You will see the following packages in the package.json

```javascript
  "react": "^16.5.2",
  "react-dom": "^16.5.2",
  "react-scripts": "1.1.5"
```

Add `redux` to the project

```shell
yarn add redux
yarn add react-redux
```

Add provider and store to the index file. `Provider` makes the redux store available to the components. `CreateStore` creates the redux store that holds the state tree.
The data in the store can be changed by calling `dispatch()` on it. This is how the index file will look like after adding store.

```jsx
// Import store to the project
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Create following folders and files to better organize the project.

```shell
|   index.css
|   index.js
|   registerServiceWorker.js
|
+---actions
|       index.js
|
+---components
|       App.js
|       App.test.js
|       Header.js
|       Main.js
|       TodoInput.js
|       Todolist.js
|
+---constants
|       ActionTypes.js
|
+---containers
|       Header.js
|       Main.js
|       VisibleTodolist.js
|
\---reducers
        index.js
        todos.js
```

Add two actions to the `Action.js`

```shell
import * as types from '../constants/ActionTypes'

export const addTodo = text => ({ type: types.ADD_TODO, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
```

Add todos reducer

```javascript
import { ADD_TODO, COMPLETE_TODO } from '../constants/ActionTypes';

const initialState = [
  {
    id: 0,
    text: 'Wash Jeans',
    completed: false
  },
];

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
        },
      ];
    case COMPLETE_TODO:
      debugger;
      let filtertodo =  state.filter(
        todo => todo.id !== action.id
      )
      return filtertodo
    default:
      return state;
  }
}

export default todos
```

Add following code to `App.js`

```jsx
import React, { Component } from "react";
import Header from "../containers/Header";
import Main from "./Main";
import { Hero, Section, Container } from "react-bulma-components/full";
import Navbar from "react-bulma-components/lib/components/navbar";
import { Columns } from "react-bulma-components";
class App extends Component {
  render() {
    return (
      <div>
        <Hero color="primary">
          <Hero.Head>
            <Navbar>
              <Navbar.Brand>
                <Navbar.Item renderAs="a" href="#">
                  <h1>ashish.me</h1>
                </Navbar.Item>
              </Navbar.Brand>
            </Navbar>
          </Hero.Head>
        </Hero>
        <Section>
          <Container>
            <Columns>
              <Columns.Column />
              <Columns.Column>
                <Header />
                <br />
                <Main />
              </Columns.Column>
              <Columns.Column />
            </Columns>
          </Container>
        </Section>
      </div>
    );
  }
}

export default App;
```

