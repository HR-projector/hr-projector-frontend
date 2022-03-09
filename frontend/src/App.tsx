import React from 'react';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {decrement, increment} from "./app/reducers/counter-slice";
import './App.css';


function App() {

    const {count} = useAppSelector(state => state.counterReducer)

    const dispatch = useAppDispatch()

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => {dispatch(increment(1))}}>Увеличить на 1</button>
            <button onClick={() => {dispatch(increment(10))}}>Увеличить на 10</button>
            <button onClick={() => {dispatch(decrement(1))}}>Уменьшить на 1</button>
            <button onClick={() => {dispatch(decrement(10))}}>Уменьшить на 10</button>
        </div>
      );
}

export default App;
