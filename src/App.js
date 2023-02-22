import './App.css';
import CalculatorContext from './context/CalculatorContext';
import Input from './components/Input';
import Keypad from './components/Keypad';

const App = () => {
  return (
    <CalculatorContext>
      <div className="App">
        <div className="calculator">
          <Input />
          <Keypad />
        </div>
      </div >
    </CalculatorContext>
  );
}

export default App;
