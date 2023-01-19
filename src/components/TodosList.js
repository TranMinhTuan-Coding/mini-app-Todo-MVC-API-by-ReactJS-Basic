import React from "react";
import TodoItem from './TodoItem';

class TodosList extends React.Component{


    render(){
        return(
            <div className="todos-list">
                        <ul>
                            {this.props.todos.map(x => {
                                return(
                                    <TodoItem
                                            key={x.id}
                                            todoItem={x}
                                            checkboxFunc={this.props.checkboxFunc}
                                            deleteButtonFunc={this.props.deleteButtonFunc}
                                    />
                                )
                            })}
                        </ul>
            </div>
        )
    }
}

export default TodosList;