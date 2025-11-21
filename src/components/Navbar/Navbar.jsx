import React, { useContext, useState, useEffect } from "react"
import "./Navbar.css"
import logo from "../../assets/logo.png"
import arrow_icon from "../../assets/arrow_icon.png"
import { CoinContext } from "../../context/CoinContext"
import { Link } from "react-router-dom"

function Navbar() {
  const { setCurrency } = useContext(CoinContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" })
        break

      case "eur":
        setCurrency({ name: "eur", symbol: "€" })
        break

      case "sar":
        setCurrency({ name: "sar", symbol: "ريال " })
        break

      case "aed":
        setCurrency({ name: "aed", symbol: "درهم " })
        break

      default:
        setCurrency({ name: "usd", symbol: "$" })
        break
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/">
        <img src={logo} alt="CryptoPlace Logo" className="logo" />
      </Link>

      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="aed">AED</option>
          <option value="sar">SAR</option>
        </select>

        <button>
          Sign Up <img src={arrow_icon} alt="" />
        </button>
      </div>

      <div className={`burger ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <Link to="/" onClick={closeMenu}>
            <li>Home</li>
          </Link>
          <li onClick={closeMenu}>Features</li>
          <li onClick={closeMenu}>Pricing</li>
          <li onClick={closeMenu}>Blog</li>
        </ul>

        <div className="nav-right">
          <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="aed">AED</option>
            <option value="sar">SAR</option>
          </select>

          <button>
            Sign Up <img src={arrow_icon} alt="" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar