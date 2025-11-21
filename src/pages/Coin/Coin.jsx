import './Coin.css';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);

  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCoinData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        }
      );

      if (!response.ok) {
        setCoinData(null);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setCoinData(data);
      setLoading(false);
    } catch {
      setCoinData(null);
      setLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        }
      );

      const data = await response.json();
      setHistoricalData(data);
    } catch {
      setHistoricalData(null);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [coinId, currency]);

  if (loading || !coinData || !historicalData) {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }

  const priceChange24h = coinData.market_data.price_change_percentage_24h;
  const isPositive = priceChange24h > 0;

  // Strip HTML tags from description
  const description = coinData.description?.en
    ? coinData.description.en.replace(/<[^>]*>/g, '').slice(0, 500) + '...'
    : 'No description available.';

  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          {coinData.name} ({coinData.symbol.toUpperCase()})
        </p>
      </div>

      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      <div className="coin-info">
        <h3>Market Statistics</h3>

        <ul>
          <li>
            <span>🏆</span> Crypto Market Rank
          </li>
          <li>#{coinData.market_cap_rank}</li>
        </ul>

        <ul>
          <li>
            <span>💰</span> Current Price
          </li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>
            <span>📊</span> Market Cap
          </li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>
            <span>📈</span> 24h Price Change
          </li>
          <li>
            <span className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
              {isPositive ? '▲' : '▼'} {Math.abs(priceChange24h).toFixed(2)}%
            </span>
          </li>
        </ul>

        <ul>
          <li>
            <span>⬆️</span> 24 Hour High
          </li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>
            <span>⬇️</span> 24 Hour Low
          </li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>
            <span>💎</span> Total Volume (24h)
          </li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.total_volume[currency.name].toLocaleString()}
          </li>
        </ul>

        <ul>
          <li>
            <span>🔄</span> Circulating Supply
          </li>
          <li>
            {coinData.market_data.circulating_supply?.toLocaleString() || 'N/A'}
          </li>
        </ul>
      </div>

      {coinData.description?.en && (
        <div className="coin-description">
          <h3>About {coinData.name}</h3>
          <p>{description}</p>
          {(coinData.links?.homepage[0] || coinData.links?.blockchain_site[0]) && (
            <div className="coin-links">
              {coinData.links?.homepage[0] && (
                <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                  🌐 Official Website
                </a>
              )}
              {coinData.links?.blockchain_site[0] && (
                <a href={coinData.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
                  🔗 Blockchain Explorer
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Coin;