import React from "react";

class Footer extends React.Component{

    render(){

        let nowActiveItems = this.props.todosArray.filter(x => !x.isCompleted);
        const {changeStateFunc, clearAllCompletedFunc}=this.props;

        return(
                    <div className="footer"> 
                        <p>{nowActiveItems.length} items left</p>
                        <div>
                            <button onClick={() => {changeStateFunc("all")}}>All</button>
                            <button onClick={() => {changeStateFunc("active")}}>Active</button>
                            <button onClick={() => {changeStateFunc("completed")}}>Completed</button>
                        </div>
                        <button
                                onClick={clearAllCompletedFunc}
                        >
                            Clear Completed
                        </button>
                    </div>
        )
    }
}

export default Footer;