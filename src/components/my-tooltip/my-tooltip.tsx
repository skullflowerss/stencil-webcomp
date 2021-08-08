import { Component, Prop, h, State} from '@stencil/core';

@Component({
  tag: 'my-tooltip',
  styleUrl: './my-tooltip.css',
  shadow: true
})
export class MyTooltip {

  @State() opened = false;
  @Prop({reflect: true}) message: string;

  openDisp(){
      this.opened = !this.opened;
  }


  render() {
    
    let content = null;
    
    if(this.opened){
        content = (
            <div class="message">
                {this.message}
            </div>
        )
    }

    return[
            <slot></slot>,
            <span id="displayer" onClick={this.openDisp.bind(this)}>?</span>,
            content
        ]
    }
}
