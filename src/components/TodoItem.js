import React from "react";

class TodoItem extends React.Component{


    render(){

        const {isCompleted, id, title} = this.props.todoItem;

        return(
            <li className="todoItem">
                    <input 
                        type='checkbox'
                        onChange={() => this.props.checkboxFunc(id)}
                    />
                    <span
                        className={isCompleted? 'completed' : null}
                    >
                        {title}
                    </span>
                    <button
                            onClick={() => this.props.deleteButtonFunc(id)}
                    >
                            Delete
                    </button>
            </li>
        )
    }
}

export default TodoItem;