import { useState, useCallback, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [noAllowed, setNoAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const pwdRef = useRef(null);

  const pwdGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (noAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, noAllowed, charAllowed, setPassword]);
  useEffect(() => {
    pwdGen();
  }, [length, noAllowed, charAllowed, pwdGen]);

  const copyPwd = useCallback(() => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-5 text-orange-600 bg-gray-700 ">
        <h1 className="text-2xl text-center font-sans hover:font-serif text-emerald-400 flex-wrap mb-4">
          Password Generator
        </h1>
        <div className="flex  rounded-lg overflow-hidden ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 rounded-xl-2 mb-5"
            placeholder="Password"
            readOnly
            ref={pwdRef}
          />
          <button
            onClick={copyPwd}
            className="outline-none bg-blue-400 hover:bg-slate-600 text-white  py-2 px-3 mb-5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-md gap-x-2 mt-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer mb-3"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="mb-3 ml-2">Length : {length}</label>
          </div>
          <div className=" items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={noAllowed}
              onChange={() => {
                setNoAllowed((prev) => !prev);
              }}
            />
            <label className="ml-1 mr-2">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label className="ml-1 mr-2">Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
