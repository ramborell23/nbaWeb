import React from 'react';
import axios from 'axios';



class FormPost extends React.Component{
    constructor(){
        super()
        this.state={
            value: '',
            players:[]
        }
    }
    // }
    // const [name,setName] = useState('Jerell')
    // const [value,setValue] = useState('')

    // this.handleChange = event =>{
    //     console.log( event.target.value)
    // // setValue({value: event.target.value})

    // }

    handleSubmit=(event)=> {
        event.preventDefault();
        const {players} = this.state
        this.setState({ value: this.state.value })
        console.log(players)
      }

    async getPlayers(){
        let response = await axios.get('http://localhost:8100/')
        .catch(error => console.error(error))
        this.setState({players:response})
        console.log(response)
    }

    componentDidMount(){
        this.getPlayers()
    }


    render(){
        const {name} = this.state
    return(
        <div>
            Form
            {name}

        <form onClick={this.handleSubmit} >
        <label>
          Name:
          {/* <input type="text" value={value} onChange={this.handleChange} /> */}
        </label>
        <input type="submit" value="Submit" />
      </form>
        </div>
    )}

}


export default FormPost