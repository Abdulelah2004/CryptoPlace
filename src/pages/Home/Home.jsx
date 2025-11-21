import React, { useContext, useState, useEffect } from "react"
import "./Home.css"
import { CoinContext } from "../../context/CoinContext"
import { Link } from "react-router-dom";
const Home = () => {
  const { allCoin, currency } = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [input, setInput] = useState("")

  const inputHandler = (event) => {
    const value = event.target.value
    setInput(value)

    if (value === "") setDisplayCoin(allCoin)
  }

  const searchHandler = (event) => {
    event.preventDefault()

    const coins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    )

    setDisplayCoin(coins)
  }

  useEffect(() => {
    setDisplayCoin(allCoin)
  }, [allCoin])

  return (
    <div className="home">
      <div className="hero">
        <h1>
          The Largest <br /> Crypto Marketplace
        </h1>

        <p>
          Welcome to the world's largest cryptocurrency marketplace. sign up to
          explore more about crypto
        </p>

        <form onSubmit={searchHandler}>
          <input
            onChange={inputHandler}
            value={input}
            list="coinList"
            type="text"
            placeholder="Search Crypto...."
            required
          />

          <datalist id="coinList">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name}></option>
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={item.image} alt="" width={25} />
              <p>{item.name + " (" + item.symbol.toUpperCase() + ")"}</p>
            </div>

            <p>
              {currency.symbol}
              {item.current_price}
            </p>

            <p
              style={{
                color:
                  item.price_change_percentage_24h >= 0 ? "lightgreen" : "red",
                textAlign: "center",
              }}
            >
              {item.price_change_percentage_24h.toFixed(2)}%
            </p>

            <p className="market-cap">{item.market_cap.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
