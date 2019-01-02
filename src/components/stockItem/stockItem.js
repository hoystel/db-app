import React, { Component } from 'react';

class StockItem extends Component {
    constructor(props) {
        super(props);

        // Initialise state
        this.state = {
            price: this.props.price
        }
    }
    
    componentWillMount() {
        // Calling listener and updating state price only if a symbol match is found
        this.props.service.addTickListener((tick) => {
            if(this.props.symbol === tick.symbol) {
                this.setState({
                    price: tick.price.toFixed(2)
                })
            }
        });
    }

    render() {
        // Data formatting
        const priceChange = (this.state.price - this.props.closingPrice);
        const formattedPriceChange = priceChange > 0 ? `+${priceChange.toFixed(2)}` : priceChange.toFixed(2);
        const percentageChange = ((priceChange / this.props.closingPrice) * 100).toFixed(2);

        return (
            <div className="row">
                <div className="symbol">{this.props.symbol}</div>
                <div className="name">{this.props.name}</div>
                <div className="price">{this.state.price}</div>
                <div className="currency">{this.props.currency}</div>
                <div className={priceChange > 0 ? "change-up" : "change-down" }>{priceChange !== 0 ? formattedPriceChange : null}</div>
                <div className={percentageChange > 0 ? "change-up percentage" : "percentage change-down" }>{priceChange !== 0 ? `(${percentageChange}%)` : null}</div>
            </div>
        );
    }
}

export default StockItem;