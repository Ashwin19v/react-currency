import { useEffect, useState } from "react";
import axios from "axios";

export const Currency = () => {
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("INR");
  const [converter, setConverter] = useState(null);
  const [rate, setRate] = useState(null);
  useEffect(() => {
    const exchange = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${currency}`;
        const res = await axios.get(url);
        setRate(res.data.rates[tocurrency]);
      } catch (e) {
        console.log(e);
      }
    };
    exchange();
  }, [currency, tocurrency]);

  useEffect(() => {
    if (rate !== null) setConverter((amount * rate).toFixed(2));
  }, [amount, rate]);
  const handle = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };
  const handleCurrency = (e) => {
    setCurrency(e.target.value);
  };
  const handleToCurrency = (e) => {
    setTocurrency(e.target.value);
  };
  return (
    <>
      <div className="converter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency converter</h1>
          <div className="input">
            <label htmlFor="amt">Amount</label>
            <input
              type="number"
              id="amt"
              value={amount}
              onChange={handle}
            ></input>
          </div>
          <div className="input">
            <label htmlFor="currency">From currency</label>
            <select id="currency" value={currency} onChange={handleCurrency}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <div className="input">
            <label htmlFor="tocurrency">To currency</label>
            <select
              id="tocurrency"
              value={tocurrency}
              onChange={handleToCurrency}
            >
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <div className="result">
            <p>
              {amount} {currency} is equal to {converter} {tocurrency}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
