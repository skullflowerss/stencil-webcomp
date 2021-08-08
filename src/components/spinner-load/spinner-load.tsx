import { Component, h } from "@stencil/core";

@Component({
    tag: 'spinner-load',
    styleUrl: './spinner-load.css',
    shadow: true
})

export class Spinner{
    render(){
        return<div class="loader"></div>
        
    }
}