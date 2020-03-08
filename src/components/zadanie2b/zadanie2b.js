import React from "react";

export default class Zadanie2b extends React.Component{

    state = {
        input: "HERE IS A SECRET MESSAGE ENCIPHERED BY TRANSPOSITION",
        key:"CONVENIENCE",
        output: "Output"
    };

    onEncryptTextChange = (event)=>{
        const input = event.target.value;
        this.setState({
            input:input.toUpperCase()
        })
    };

    onKeyTextChange = (event)=>{
        const key = event.target.value;
        this.setState({
            key: key.toUpperCase()
        })
    };

    encrypt = ()=>{
        const {input, key} = this.state;
        let output = "";
        let index = [];
        index = this._indexOnStringBuilder(key);
        let regExp = / /gi;
        let newInput= input.replace(regExp , "");

        let actualIndex = 1;
        for(let i = 1;i<=key.length; i++){
            for(let j = 0; j<key.length; j++){
                if(index[j] === i){
                    actualIndex = j;
                    break;
                }
            }

            while(actualIndex < newInput.length){
                output += newInput[actualIndex];
                actualIndex +=key.length;
            }
        }
        console.log(output);
        return output;
    };

    decrypt = ()=>{
        const {input, key} = this.state;
        let output = "";
        let index = [];
        index = this._indexOnStringBuilder(key);
        let regExp = / /gi;
        let newInput= input.replace(regExp , "");
        let columnArray = [];
        let startIndex = 0;
        let actualIndex = 0;
        let columnLength;

        for(let i = 0; i<key.length; i++){
            for(let j = 0; j<key.length;j++){  //tablica kolumn pod numerami indexow od klucza
                if(index[j] === i+1){
                    actualIndex = j;
                    break;
                }
            }

            columnLength = Math.floor(newInput.length/key.length);  //razbicie szyfru na czesci
            if(actualIndex<newInput.length % key.length){
                columnLength++;
            }

            let sliseString = newInput.slice(startIndex, startIndex+columnLength);
            columnArray[actualIndex] = sliseString;
            startIndex = Math.floor(startIndex + columnLength);
        }


        for(let i = 0; i<(newInput.length / key.length)+1; i++){
            for(let j = 0; j<key.length;j++){
                if(columnArray[j][i] !== undefined) {
                    output = output + columnArray[j][i];
                }
            }
        }

        this.setState({
            output
        });
    };

    _indexOnStringBuilder = (key)=>{
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let index = [];
        let counter = 1;
        for(let i = 0; i<alphabet.length; i++){
            for(let j = 0; j < key.length; j++){
                if(alphabet[i]===key[j]){
                    index[j] = counter;
                    counter++;
                }
            }

        }
        console.log(index)
        return index;
    };

    onSubmit = (event)=>{
        event.preventDefault();
        const output = this.encrypt();
        this.setState({
            output
        })
    };

    render() {
        // console.log(this.state.input);
        // console.log(this.state.key);

        return(
            <form className="form" onSubmit={this.onSubmit}>
                <h2 className="display-4">Przestawienia macierzowe 2b</h2>
                <input className="form-control"  type="text" placeholder="Szyfrowany text" onChange={this.onEncryptTextChange}/>
                <input className="form-control" type="text" placeholder="Klucz szyfrowania" onChange={this.onKeyTextChange}/>
                <div className="outputarea jumbotron">{this.state.output}</div>
                <div className="btn-block d-flex justify-content-around">
                    <input type="button" value="Zaszyfruj" type="submit" className="btn btn-primary"/>
                    <input type="button" value="Odszyfruj" onClick={this.decrypt} className="btn btn-info"/>
                </div>

            </form>
        )
    }
}