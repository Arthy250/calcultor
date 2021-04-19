import React, {useState} from 'react';
import {Button, Container, Courrent, Previous, Screen} from './Style/CalculadoraStyles'

export const Calculadora = () => {

  const [current, setCurrent] = useState('');
  const [previuos, setPreviuos] = useState('');
  const [operation, setOperation] = useState('');

  const appendValue = (element) => {
    const value = element.target.getAttribute('data');

    if (value === '.' && current.includes('.')) return
    setCurrent(current + value);
  }

  const handleDelete = () => {
    setCurrent( String(current).slice(0, -1) );
  }

  const handleClear = () => {
    setCurrent('');
    setPreviuos('');
    setOperation('');
  }

  const chooseoperation = (element) => {

    if(current === '') return
    if(previuos !== '') {
      let value = compute();
      setPreviuos(value);
    } else {
      setPreviuos(current);
    }

    setCurrent('')
    setOperation(element.target.getAttribute('data'));
  }

  const handleEqual = () => {

    let value = compute();
    if (value === undefined || value === null) return

    setCurrent(value);
    setPreviuos('');
    setOperation('');
  }

  const compute = () =>{

    let resultado;
    let previousNumber = parseFloat(previuos);
    let courrentNumber = parseFloat(current);

    if( isNaN(previousNumber) || isNaN(courrentNumber) )return

    switch (operation) {
      case '÷':
        resultado = previousNumber / courrentNumber;
        break;
      case 'x':
        resultado = previousNumber * courrentNumber;
        break;
      case '+':
        resultado = previousNumber + courrentNumber;
        break;
      case '-':
        resultado = previousNumber - courrentNumber;
        break;

      default:
        break;
    }

    return resultado;

  }
  
  return (
    <Container className="calculadora">
      <Screen>
        <Previous>{previuos} {operation}</Previous>
        <Courrent>{current}</Courrent>
      </Screen>
      <Button gridSpan={2} control onClick={handleClear}>AC</Button>
      <Button control onClick={handleDelete}>DEL</Button>
      <Button data={'÷'} onClick={chooseoperation} operation>÷</Button>
      <Button data={'7'} onClick={appendValue}>7</Button>
      <Button data={'8'} onClick={appendValue}>8</Button>
      <Button data={'9'} onClick={appendValue}>9</Button>
      <Button data={'x'} onClick={chooseoperation} operation>X</Button>
      <Button data={'4'} onClick={appendValue}>4</Button>
      <Button data={'5'} onClick={appendValue}>5</Button>
      <Button data={'6'} onClick={appendValue}>6</Button>
      <Button data={'+'} onClick={chooseoperation} operation>+</Button>
      <Button data={'1'} onClick={appendValue}>1</Button>
      <Button data={'2'} onClick={appendValue}>2</Button>
      <Button data={'3'} onClick={appendValue}>3</Button>
      <Button data={'-'} onClick={chooseoperation} operation>-</Button>
      <Button period data={'.'} onClick={appendValue}>.</Button>
      <Button data={'0'} onClick={appendValue}>0</Button>
      <Button gridSpan={2} onClick={handleEqual} equals>=</Button>
    </Container>
  )
}

