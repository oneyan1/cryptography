import React from "react";
import "./zadania.css"

export default class Zadania2a extends React.Component{
    state= {
        d: 5,
        key: [3,4,1,5,2],
        input: "ala ma kota",
        output: "Output"
    };

    onEncryptTextChange = (event)=>{
        const input = event.target.value;
        this.setState({
            input:input
        })
    };

    onLongTextChange = (event)=>{
      const d = event.target.value;
      this.setState({
          d:+d
      })
    };

    onKeyTextChange = (event)=>{
      const key = event.target.value;
      let arrayKey =[];
      for(let i = 0; i < key.length; i++){
          let symbol = +key[i];
          arrayKey.push(symbol);
      }
      this.setState({
          key: arrayKey
      })
    };

    encrypt = (input, d, key)=>{
        let columns = 0, row = 0;
        let klucz;
        let stringOut = "";

        for(let i = 0; i < input.length; i++){
            if(columns === d){
                columns = 0;
                row+=1;
            }
            klucz = key[columns] - 1 +row*d;
            while(klucz >= input.length){
                columns++;
                klucz = key[columns] - 1 +row*d;
            }
            stringOut = stringOut + input[klucz];
            columns++;

        }
        return stringOut;
    };

    decrypt = ()=>{
        const {d, key, input} = this.state;

        let columns = 0, row = 0;
        let klucz;
        let stringOut = [];
        let output = "";

        for(let i = 0; i < input.length; i++){
            if(columns === d){
                columns = 0;
                row+=1;
            }
            klucz = key[columns] - 1 +row*d;
            while(klucz >= input.length){
                columns++;
                klucz = key[columns] - 1 +row*d;
            }
            stringOut[klucz] = (input[i]);
            columns++;
        }
        for(let i = 0; i < stringOut.length; i++){
            output+=stringOut[i];
        }
        this.setState({
            output
        })
    };

    onSubmit = (event)=>{
        event.preventDefault();
        const { d, key, input} = this.state;
        let output = this.encrypt(input, d, key);
        this.setState({
            output
        });
    };

    render() {

          return(
          <form className="form" onSubmit={this.onSubmit}>
              <h2 className="display-4">Przestawienia macierzowe 2a</h2>
              <input className="form-control"  type="text" placeholder="Szyfrowany text" onChange={this.onEncryptTextChange}/>
              <input className="form-control" type="text" placeholder="Dlugość" onChange={this.onLongTextChange}/>
              <input className="form-control" type="text" placeholder="Klucz szyfrowania" onChange={this.onKeyTextChange}/>
              <div className="outputarea jumbotron">{this.state.output}</div>
              <div className="btn-block d-flex justify-content-around">
                  <input type="button" value="Zaszyfruj" type="submit" className="btn btn-primary"/>
                  <input type="button" value="Odszyfruj" onClick={this.decrypt} className="btn btn-info"/>
              </div>

          </form>
          )
    }
};
