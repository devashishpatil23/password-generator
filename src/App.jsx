import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberYes, setNumberYes] = useState(false);
  const [charactersYes, setCharactersYes] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwx";
    if (numberYes) str += "1234567890";
    if (charactersYes) str += "!@#$%^&*()_+";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    console.log("git")
  }, [length, numberYes, charactersYes, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,5)
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerater();
  }, [length, numberYes, charactersYes, passwordGenerater]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-4 text-orange-500 bg-gray-700">
        <h1 className="text-4xl text-white text-center mb-5">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none p-2 w-full "
            value={password}
            placeholder="password"
            ref={passwordRef}
          />
          <button
            onClick={copyPassword}
            className="bg-blue-600 text-white px-2 shrink-0"
          >
            copy
          </button>
        </div>
        <div className=" flex text-sm gap-x-2">
          <input
            type="range"
            min={6}
            max={12}
            value={length}
            className="cursor-pointer "
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Lenght: {length}</label>

          <input
            className="ml-2"
            type="checkbox"
            id="numberInput"
            defaultChecked={numberYes}
            onChange={() => {
              setNumberYes((prev) => !prev);
            }}
          />
          <label>Number</label>
          <input
            className="ml-2"
            type="checkbox"
            id="CharInput"
            defaultChecked={charactersYes}
            onChange={() => setCharactersYes((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
