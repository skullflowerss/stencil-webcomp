import { Component, Prop, h, State, Method } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) title: string;
  @Prop({ reflect: true, mutable: true }) open: boolean;

  closeDrawer(){
      console.log("hello")
      this.open = false;
  }

  something(){
      console.log('I am clicking')
  }

  changeHandler(content: string){
    this.showContactInfo = content === 'contact'
    console.log(this.showContactInfo)
  }

  @Method() 
  openChange(){
      this.open = true;
  }

  render() {
    // let content = null;
    // if (this.open) {
    //   content = (
    //     <aside>
    //       <header>
    //         <h1>{this.title}</h1>
    //       </header>
    //       <main>
    //         <slot />
    //       </main>
    //     </aside>
    //   );
    // }
    let mainContent = <slot />;
     if(this.showContactInfo){ 
       mainContent = (
            <div id="contact-information">
                <h2>Contact information</h2>
                <p> You can reach us via phone or email</p>
                <ul>
                    <li>phone: 20991123</li>
                    <li>Email <a href="">Somethings@somethings.com</a></li>
                </ul>
            </div>
        );
    }
    return [
        <div class="backdrop" onClick={this.closeDrawer.bind(this)} />,
        <aside>
            <header>
            <h1>{this.title}</h1>
            <button onClick={this.closeDrawer.bind(this)}>x</button>
            </header>
            <section id="tabs">
                <button 
                class={!this.showContactInfo ? 'active' : ''}
                onClick={this.changeHandler.bind(this, 'nav')}
                >Navigation</button>
                <button
                class={this.showContactInfo ? 'active' : ''}
                onClick={this.changeHandler.bind(this, 'contact')}
                >Contact</button>
            </section>
            <main>
            {mainContent}
            </main>
        </aside>
        ]
    }
}
