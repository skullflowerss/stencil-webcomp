import { Component, h, State, Event, EventEmitter } from "@stencil/core";
import { API } from "../../global/global";

@Component({
    tag: 'stock-finder',
    styleUrl: './stock-finder.css',
    shadow: true
})

export class StockFinder{

    stockName: HTMLInputElement;
    @State() searchResults : {symbol: string, name: string}[] = [];

    @Event({bubbles: true, composed: true}) symbolSelected: EventEmitter<string>;

   
    findStocks(event: Event){
        event.preventDefault()
        const stockVal = this.stockName.value;
        console.log(stockVal)
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockVal}&apikey=${API}`)
        .then(res => res.json())
        .then(data => {
            this.searchResults = data['bestMatches'].map(match =>{
                return { 
                    symbol : match['1. symbol'],
                    name : match['2. name']
                }
            })

            }
        )
        .catch(err => console.log(err))
    }

    onSelectSymbol(symbol: string){
        this.symbolSelected.emit(symbol)

    }


    render(){
        console.log(this.searchResults)
        return[
            <form onSubmit={this.findStocks.bind(this)}>
                <input id="stock-symbol" 
                ref={el => {this.stockName = el}} 
                />
                <button type="submit">Fetch</button>
            </form>,
            <p> 
                <ul>
                {this.searchResults.map(result =>{
                    return ( <li onClick={this.onSelectSymbol.bind(this, result.symbol)}>{result.name} / {result.symbol}</li>)
                })}
                </ul>
            </p>
        ]
    }
}