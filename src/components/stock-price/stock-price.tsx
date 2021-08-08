import { Component, Element, h, Listen, Prop, State, Watch } from "@stencil/core";
import { API } from '../../global/global.js'

@Component({
    tag: 'stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})

export class StockPrice {

    @State() priceFetch : number;
    stockInput: HTMLInputElement;
    initialStock: string;

    @State() userInput: string;
    @State() inputValid = false;
    @State() error: string;

    @State() loading = false;

    @Prop({mutable: true, reflect: true}) stockSym: string;
    
    @Element() el: HTMLElement;

    @Watch('stockSym')

    @Listen('symbolSelected', { target: 'body' })
    onStockSymbolSelected(event: CustomEvent){
        console.log(event.detail)
        if(event.detail && event.detail !== this.stockSym){
            console.log(event.detail, "inside if")
            this.stockSym = event.detail
        }
    }

    stockSymbolChange(newVal: string, oldValue: string){
       
        if(newVal !== oldValue){
            this.userInput = newVal;
            this.inputValid = true;
            this.fetchStock(newVal)
        }
    }

    hostData(){
        return{class: this.error ? 'error' : ''}
    }
   

    handleInput(event: Event){
        this.userInput = ((event.target as HTMLInputElement).value).toString();
        if(this.userInput.trim() !== ''){
            this.inputValid = true
        }else{
            this.inputValid = false;
        }
        console.log(this.userInput)
    }


    onFetch(event: Event){
        event.preventDefault()

        // const symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
        // const symbol = this.stockInput.value;       
        this.stockSym = this.userInput; 
        // console.log(symbol)
        // this.fetchStock(symbol)
    }


    fetchStock(symbol: string){ 
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API}`)
        .then(response =>  response.json())
        .then(data =>{
            if(!data['AnalystTargetPrice']){
                throw new Error ('invalid symbol')
            }
            this.error = null;
            this.priceFetch = parseFloat(data['AnalystTargetPrice'])
            console.log(this.priceFetch)
            this.loading = false;
        })
        .catch(err =>{
            this.error = err.message;
            this.loading = false;
        }) 
    }


    componentDidLoad(){
        if(this.stockSym){
            // this.initialStock = this.stockSym
            this.userInput = this.stockSym
            this.inputValid = true
            this.fetchStock(this.stockSym)
        }
    }


    componentWillLoad(){
        console.log('will load')
        console.log(this.stockSym)
    }

    componenDidUpdate(){
//    {     if(this.stockSym !== this.initialStock ){
//             this.initialStock = this.stockSym
//             this.fetchStock(this.stockSym)
//         }}
    }
    

    render(){
        let content = <p>Please enter a symbol</p>

        if(this.error){
            content = <p>{this.error}</p>
        }

        if(this.priceFetch){
            content = <p>Price: ${this.priceFetch}</p>
        }
        if(this.loading){
            content = <spinner-load/>
        }

        return[
            <form onSubmit={this.onFetch.bind(this)}>
                <input id="stock-symbol" ref={el => this.stockInput = el} 
                onInput={this.handleInput.bind(this)}
                value={this.userInput}
                />
                <button type="submit" disabled={!this.inputValid || this.loading}>Fetch</button>
            </form>,
            <div>
                {content}
            </div>
        ]
    }

}