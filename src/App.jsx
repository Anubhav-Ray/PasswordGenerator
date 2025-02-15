// import { useEffect } from "react";
import "./App.css";
import { useCallback, useState } from "react";
function App() {
  const [password, setPassword] = useState("P4$5W0rD!");
  const [strength, setStrength] = useState("weak");
  const [passwordLength, setPasswordLength] = useState(6);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const cachefunction = useCallback(() => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+=";
    let validChars = "abcdefgh";
    if (includeUppercase) {
      validChars += uppercaseLetters;
    }
    if (includeLowercase) {
      validChars += lowercaseLetters;
    }
    if (includeNumbers) {
      validChars += numbers;
    }
    if (includeSymbols) {
      validChars += symbols;
    }
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      password += validChars[randomIndex];
    }
    setPassword(password);
  }, [
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    passwordLength,
  ]);
  const strengthCheck = useCallback(() => {
    if (passwordLength < 6) {
      setStrength("weak");
    }
    if (
      passwordLength > 6 &&
      passwordLength < 12 &&
      includeUppercase &&
      includeLowercase
    ) {
      setStrength("medium");
    }
    if (
      passwordLength > 12 &&
      includeUppercase &&
      includeLowercase &&
      includeNumbers &&
      includeSymbols
    ) {
      setStrength("strong");
    }
  }, [
    passwordLength,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    includeUppercase,
  ]);
  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <input id="display" value={password} placeholder="P4$5W0rD!" />
        <div className="parameters">
          <div className="range">
            <div id="length">
              <span>Character Length</span>
              <span className="length-count">{passwordLength}</span>
            </div>
            <input
              onChange={(e) => {
                setPasswordLength(e.target.value);
              }}
              type="range"
              min="6"
              max="25"
              step="1"
              value={passwordLength}
            />
          </div>

          <div className="uppercase">
            <input
              onChange={() => {
                setIncludeUppercase(!includeUppercase);
              }}
              type="checkbox"
              className="check"
              id="check-upper"
            />
            <label htmlFor="check-upper">Include Uppercase Letters</label>
          </div>
          <div className="lowercase">
            <input
              onChange={() => {
                setIncludeLowercase(!includeLowercase);
              }}
              type="checkbox"
              className="check"
              id="check-lower"
            />
            <label htmlFor="check-lower">Include Lowercase Letters</label>
          </div>
          <div className="numbers">
            <input
              onChange={() => {
                setIncludeNumbers(!includeNumbers);
              }}
              type="checkbox"
              className="check"
              id="check-numbers"
            />
            <label htmlFor="check-numbers">Include Numbers</label>
          </div>
          <div className="symbols">
            <input
              onChange={() => {
                setIncludeSymbols(!includeSymbols);
              }}
              type="checkbox"
              className="check"
              id="check-symbols"
            />
            <label htmlFor="check-symbols">Include Symbols</label>
          </div>
          <div id="strength">
            <span>Strength</span>
            <span id="strength-bar">{strength}</span>
          </div>
          <button
            onClick={() => {
              cachefunction();
              strengthCheck();
            }}
            id="generate"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
