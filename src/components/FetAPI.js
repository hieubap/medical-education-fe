import React, { Component } from 'react'
import { enableUniqueIds } from 'react-html-id'

class FetAPI extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data:[]
        }
    }

    componentDidMount(){

        fetch('http://93.188.162.82:8088/product?size=1000')
        .then(res => res.json())
        .then(json => {
            this.setState({
                loading: false,
                data: json.data
            })
        })
    }

    render(){
        const {loading , data} = this.state;

        if(loading) return <div>Loading ... </div>
        else 
        return (
            <>
            <div> data has been loaded </div>
            {data.map(product => (
                <li key={product.id}>
                    Name: {product.name}
                </li>
            ))}
            </>
        )
    }
}

export default FetAPI;