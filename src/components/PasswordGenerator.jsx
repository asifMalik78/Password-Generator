import { useEffect, useState } from "react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(8);
  const [options, setOptions] = useState({
    includeUppercase: false,
    includeLowercase: true,
    includeNumber: true,
    includeSymbols: false
  });
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);
  const optionsChangeHandler = (name) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: options[name] ? false : true
      };
    });
  };

  const checkPasswordStrength = (password) => {
    const lengthRegex = /^.{8,}$/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    const isLengthValid = lengthRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasUppercase = uppercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);
    const hasSpecialChar = specialCharRegex.test(password);

    const strengthScore = [
      isLengthValid,
      hasLowercase,
      hasUppercase,
      hasDigit,
      hasSpecialChar
    ].filter(Boolean).length;

    setStrength(strengthScore);
  };

  const generatePassword = () => {
    const lowercaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

    if (
      !options.includeLowercase &&
      !options.includeUppercase &&
      !options.includeNumber &&
      !options.includeSymbols
    ) {
      alert("Choose atleast one options");
      return;
    }

    let generatedValue = "";

    if (options.includeUppercase) {
      generatedValue += uppercaseAlphabets;
    }

    if (options.includeLowercase) {
      generatedValue += lowercaseAlphabets;
    }

    if (options.includeNumber) {
      generatedValue += numbers;
    }

    if (options.includeSymbols) {
      generatedValue += symbols;
    }

    let genertedPassword = "";

    for (let i = 1; i <= passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * generatedValue.length);
      genertedPassword += generatedValue[randomIndex];
    }

    setPassword(genertedPassword);
    checkPasswordStrength(genertedPassword);
  };

  const generateHandler = () => {
    if (passwordLength < 1) {
      alert("Minimum Length is 6");
      return;
    }

    generatePassword();
  };

  const copyToClipboardHandler = async () => {
    
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  useEffect(() => {
    generatePassword();
  }, []);
  return (
    <div className="App">
      <div className="wrapper-container">
        <div className="display-copy-wrapper">
          <div className="display">{password}</div>
          <CopyToClipboard text={password}>
          <div className="copy-wrapper" onClick={copyToClipboardHandler}>
            {!copied ? <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM3MDcwNzAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1maWxlcyI+PHBhdGggZD0iTTE1LjUgMkg4LjZjLS40IDAtLjguMi0xLjEuNS0uMy4zLS41LjctLjUgMS4xdjEyLjhjMCAuNC4yLjguNSAxLjEuMy4zLjcuNSAxLjEuNWg5LjhjLjQgMCAuOC0uMiAxLjEtLjUuMy0uMy41LS43LjUtMS4xVjYuNUwxNS41IDJ6Ii8+PHBhdGggZD0iTTMgNy42djEyLjhjMCAuNC4yLjguNSAxLjEuMy4zLjcuNSAxLjEuNWg5LjgiLz48cGF0aCBkPSJNMTUgMnY1aDUiLz48L3N2Zz4="
              alt="copy-icon"
              /> :<img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyYThiOGIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGVjay1jaXJjbGUtMiI+PHBhdGggZD0iTTEyIDIyYzUuNTIzIDAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTB6Ii8+PHBhdGggZD0ibTkgMTIgMiAyIDQtNCIvPjwvc3ZnPg=="
              alt="copy-icon"
              /> }
          </div>
              </CopyToClipboard>
        </div>
        <div className="slider-wrapper">
          <div className="wrapper">
            <div className="char-length">Character length</div>
            <div className="length">{passwordLength}</div>
          </div>

          <input
            className="slider"
            type="range"
            min="0"
            max="100"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            style={{
              background: `linear-gradient(to right, #2a8b8b ${passwordLength}%, #141318 ${passwordLength}%)`
            }}
          />
        </div>

        <div className="options">
          <div className="options-wrapper">
            <input
              type="checkbox"
              defaultChecked={options.includeUppercase}
              onChange={() => optionsChangeHandler("includeUppercase")}
            />
            <span>Include Uppercase Letters</span>
          </div>

          <div className="options-wrapper">
            <input
              type="checkbox"
              defaultChecked={options.includeLowercase}
              onChange={() => optionsChangeHandler("includeLowercase")}
            />
            <span>Include Lowercase Letters</span>
          </div>

          <div className="options-wrapper">
            <input
              type="checkbox"
              defaultChecked={options.includeNumber}
              onChange={() => optionsChangeHandler("includeNumber")}
            />
            <span>Include Numbers</span>
          </div>

          <div className="options-wrapper">
            <input
              type="checkbox"
              defaultChecked={options.includeSymbols}
              onChange={() => optionsChangeHandler("includeSymbols")}
            />
            <span>Include Symbols</span>
          </div>
        </div>

        <div className="strength-wrapper">
          <div className="strength">STRENGTH</div>
          <div className="strength-meter">
            <div className="status">
              {strength === 5 ? "Strong" : strength >= 3 ? "Fair" : "Poor"}
            </div>
            <div className="strength-icons-wrapper">
              {new Array(5).fill(0).map((curr, idx) => {
                return idx + 1 <= strength ? (
                  <div
                    key={idx}
                    className={`strength-icon ${
                      strength === 5
                        ? "greenColor"
                        : strength >= 3
                        ? "yellowColor"
                        : "redColor"
                    }`}
                  ></div>
                ) : (
                  <div key={idx} className="strength-icon"></div>
                );
              })}
            </div>
          </div>
        </div>

        <button className="btn" onClick={generateHandler}>
          GENERATE
        </button>
      </div>
    </div>
  );
}
