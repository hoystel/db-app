import React, { Component } from 'react';
import StockService from './../../services/StockService';
import StockItem from '../stockItem/stockItem';
import './dataLoader.css';

class DataLoader extends Component {
  constructor() {
    super();

    this.stockDataElements = [];
    // Instantiate service
    this.service = new StockService();

    // Return array of stock objects
    this.stockArray = this.service.getUsersStocks();
  }

  componentWillMount() {
    // Mapping over each item in stockArray to push an element into stockDataElements each time
    this.stockArray.map((stockItem) => {
        return (this.stockDataElements.push(
          <div key={stockItem.symbol}>
            <StockItem service={this.service} symbol={stockItem.symbol} name={stockItem.name} price={stockItem.price} currency={stockItem.currency} closingPrice={stockItem.closingPrice}/>
          </div>
        ));
      }
    );
  }

  render() {
    return (
      <div className="DataLoader">
        {this.stockDataElements}
      </div>
    );
  }
}

export default DataLoader;
