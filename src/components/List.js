import React, { Component } from 'react';

import User from "./User";
import UniqueId from 'react-html-id'

class List extends Component{
    constructor(){
        super();
        UniqueId.enableUniqueIds(this);
        this.state = {
          users: [
            { id: this.nextUniqueId(), name: "a", age: 200 },
            { id: this.nextUniqueId(), name: "b", age: 201 },
            { id: this.nextUniqueId(), name: "c", age: 202 },
            { id: this.nextUniqueId(), name: "d", age: 203 },
            { id: this.nextUniqueId(), name: "e", age: 204 },
            { id: this.nextUniqueId(), name: "f", age: 205 },
            { id: this.nextUniqueId(), name: "g", age: 206 },
          ],
        };
        console.log(this.state);
      }
      
      deleteUser = (index, e) => {
        const users = Object.assign([], this.state.users);
        users.splice(index, 1);
        this.setState({ users: users });
        console.log("delete");
      };
    
      changeUsername = (id,e) =>{
          console.log('auto');
        const index = this.state.users.findIndex((user) => {
          return user.id === id;
        })
    
        const user = Object.assign({},this.state.users[index]);
    
        user.name = e.target.value;
    
        const users = Object.assign([],this.state.users);
    
        users[index] = user;
    
        this.setState({users:users});
      }

      render(){
          return (
            <ul>
            {this.state.users.map((user, index) => {
              return (
                <User
                  age={user.age}
                  key={user.id}
                  changeEvent={this.changeUsername.bind(this,user.id)}
                  delEvent={this.deleteUser.bind(this, index)}
                >
                  {user.name}
                </User>
              );
            })}
          </ul>
          )
      }
}

export default List;