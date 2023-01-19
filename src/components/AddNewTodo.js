import React from "react";

class AddNewTodo extends React.Component{
    
    state={
        title:"",
    }

    // Hàm thay đổi giá trị của state title thông qua giá trị được nhập ở ô input
    setStateByInputValue = e => {
        this.setState({
            title: e.target.value
        })
    }

    //In ra màn hình giá trị của state title 
    addNewItem01 = e => {
        e.preventDefault();
        this.props.addNewItem02(this.state.title);

        this.setState({
            title: ""
        })
    };

    render(){
        return(
            <form 
                className="add-todo-box"
                onSubmit={this.addNewItem01}
            >
                <input 
                        placeholder="what needs to be done ? - Everything must be Perfect!"
                        value={this.state.title}
                        onChange={this.setStateByInputValue}
                />
            </form>
        )
    }
}

export default AddNewTodo;