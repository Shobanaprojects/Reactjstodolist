import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddTodo from './components/AddTodo';

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddTodo />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}

export default App;
