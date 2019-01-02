const stocks = require('./Stocks');

class StockService {

    constructor() {
        this._stocks    = stocks;
        this._tick      = this._tick.bind(this);
        this._listeners = [];
        console.log(this._listeners);

        setInterval(this._tick, 1000);
    }

    /**
     * Returns an array of Stock objects for the current user
     * @returns {Array}
     */
    getUsersStocks() {
        return Object.getOwnPropertyNames(this._stocks).reduce((acc, s) => {
            acc.push(this._stocks[s])
            return acc;
        }, []);
    }

    /**
     * Allows users to subscribe to price changes. The listener receives a Tick object:
     * listener({ symbol, price }).
     *
     * @param listener
     */
    addTickListener(listener) {
        this._listeners.push(listener);
    }

    /**
     * Stop a particular listener from receiving ticks.
     * @param listener
     */
    removeTickListener(listener) {
        this._listeners = this._listeners.filter(l=>l!== listener);
    }

    /**
     * Updates the price for a specific symbol and informs listeners
     * @param symbol
     * @param price
     * @private
     */
    _updateStockPrice(symbol, price) {
        this._stocks[symbol].price = price;
        this._listeners.forEach(listener => listener({symbol, price}));
    }

    /**
     * Simulates price changes by selecting a subset of stocks and moving them up or down
     * by a random amount up to either 3% of their current value or 1/100th of the
     * currency unit whichever is more.
     *
     * The price should never drop below 0.01
     *
     * * @private
     */
    _tick() {
        Object.getOwnPropertyNames(this._stocks).forEach(symbol => {
            const shouldUpdate = Math.floor(Math.random() * 2) === 0;

            if (shouldUpdate) {
                const currentPrice = this._stocks[symbol].price;
                const maxMove = Math.max(0.01, currentPrice * 0.03);
                const newPrice = Math.max(0.01, currentPrice + ((Math.random() * maxMove * 2) - maxMove));

                this._updateStockPrice(symbol, newPrice);
            }
        })
    }
}

module.exports = StockService;
