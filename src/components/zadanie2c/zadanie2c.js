import React from "react";

export default class Zadanie2c extends React.Component{

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

        let sublineLength = [];
        sublineLength = this._sublineLengthString(index, newInput.length); // tablica dlugosci werszy

        for(let i = 0; i<index.length; i++){
            let actualIndex =0;
            for(let j = 0; j< index.length;j++){
                if(index[j] === i+1){
                    actualIndex = j;
                    break;
                }
            }
            let tmp = actualIndex;
            for(let k = 0; k< sublineLength.length; k++){
                //console.log(actualIndex+1);
                if(tmp >= newInput.length) break;
                if(actualIndex+1 <= sublineLength[tmp]){
                    output += newInput[tmp];
                    console.log(output);
                }
                tmp += sublineLength[k];
                //console.log(tmp);
            }
        }

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
        return index;
    };

    _sublineLengthString = (index , length)=>{
        let lengthArray = [];
        let actualIndex = 1;

        while(length > 0){
            for(let i =0; i<index.length; i++){
                if(index[i] === actualIndex){
                    if(length < i+1){
                        lengthArray.push(length);
                    }else{
                        lengthArray.push(i+1);
                    }
                    length -= i+1;
                    break;
                }
            }
            actualIndex++;
            if(actualIndex > index.length){
                actualIndex = 0;
            }
        }
        return lengthArray;
    };


    onSubmit = (event)=>{
        event.preventDefault();
        const output = this.encrypt();
        this.setState({
            output
        })
    };

    render() {
        return(
            <form className="form" onSubmit={this.onSubmit}>
                <h2 className="display-4">Przestawienia macierzowe 2c</h2>
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