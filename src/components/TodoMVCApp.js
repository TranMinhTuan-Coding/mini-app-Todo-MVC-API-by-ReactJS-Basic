import React from "react";
import AppTitle from './AppTitle';
import AddNewTodo from './AddNewTodo';
import TodosList from './TodosList';
import Footer from './Footer';

// import các module, thư viện sử dụng trong app
import {v4 as uuidv4} from 'uuid';
import axios from'axios';


class TodoMVCApp extends React.Component{

    constructor(){
        super();
        let todosDefault= [
                // {
                //     id: 1,
                //     title: "Task 1",
                //     isCompleted: false
                // },
                // {
                //     id: 2,
                //     title: "Task 2",
                //     isCompleted: false
                // },
                // {
                //     id: 3,
                //     title: "Task 3",
                //     isCompleted: false
                // }
        ];
        this.state={
            todos: todosDefault,
            itemStatus: "all"
        }
        
    }
    
    // Hàm quản lý sự kiện tích checkbox
    // Sẽ nhận sự kiện onchange từ ô input, sau đó thay đổi giá trị isCompleted trong state
    checkboxFunc = (id) => {
        // console.log("Clicked on id: " + id);
        this.setState({
            todos: this.state.todos.map(x => {
                if (x.id == id){
                    x.isCompleted = !x.isCompleted;
                }
                return x;
            })
        })
    }

    // Hàm quản lý chức năng xóa từng todo item
    deleteButtonFunc = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/ ${id}`)
            .then (response => {
                let todosDeletedArray=this.state.todos.filter(x => x.id !== id)
                this.setState({
                    todos: [...todosDeletedArray]
                })
            })
    }

    //Hàm quản lý chức năng clear hết các completed todo
    clearAllCompletedFunc= () => {
        let {todos}=this.state;
        let todosClearAllCompletedArray=todos.filter(x => !x.isCompleted);

        this.setState({
            todos: [...todosClearAllCompletedArray]
        })
    }

    // Hàm quản lý chức năng thêm
    addNewItem02 = title => {
        // console.log(title);
        const newItemsGetFromServer = {
                            id: uuidv4(),
                            title: title,
                            isCompleted: false
                        }
        if (title !== "") {
            axios.get("https://jsonplaceholder.typicode.com/todos", newItemsGetFromServer)
                .then (response => {
                    console.log(response.data);
                    this.setState({
                        todos: [...this.state.todos, newItemsGetFromServer]
                    })
                })
            // this.setState({
            //     todos: [...this.state.todos, newItems]
            // })
        } else {
            this.setState({
                todos: [...this.state.todos]
            })
        }
    }
    
    // Hàm thay đổi giá trị của state
    changeStateFunc = (status) => {
        this.setState({
            itemStatus: status
        });
    }

    // Hàm quản lý chức năng lấy danh sách Todo từ máy chủ bằng axios
    // 2 cách để giới hạn dữ liệu lấy về từ máy chủ:
    // cách 1: thêm vào sau cùng đường dẫn (vẫn trong dấu nháy kép) : ?_limit=10 
    // componentDidMount() {
    //     axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
    //         .then (response => console.log(response.data))
    // }
    // cách 2: tạo 1 đối tượng config và truyền vào hàm axios.get() (nên sử dụng cách 2)
    componentDidMount() {
        const config = {
            params: {
                _limit: 10
            }
        }
        // axios.get("https://jsonplaceholder.typicode.com/todos", config)
        //     .then (response => console.log(response.data))
        axios.get("https://jsonplaceholder.typicode.com/todos", config)
            .then (response => this.setState({todos: response.data}))
    }
    // tiếp theo tiến hành gán những dữ liệu lấy về từ máy chủ vào dữ liệu phía client:
    //          xóa state gốc
    //          sau đó gán vào bằng hàm .then:
    //          .then (response => this.setState({ todos: response.data }))
    

    render(){
        let {todos, itemStatus} = this.state;
        if (itemStatus == "active") {
            todos = todos.filter(x => !x.isCompleted);

        } else if (itemStatus =="completed") {
            todos = todos.filter(x => x.isCompleted);

        }

        return(

            <div >
                <AppTitle />

                <div className="app-container">
                    <AddNewTodo
                            addNewItem02={this.addNewItem02}
                    />

                    <TodosList
                            // nếu tiếp tục đặt là this.state.todos => chức năng lọc ko chạy
                            // Lý do là vì ta đang sử dụng todos như 1 biến
                            todos={todos}
                            checkboxFunc={this.checkboxFunc}
                            deleteButtonFunc={this.deleteButtonFunc}
                    />

                    <Footer
                            clearAllCompletedFunc={this.clearAllCompletedFunc}
                            todosArray={todos}
                            changeStateFunc={this.changeStateFunc}
                    />
                </div>
            </div>
        )
    }
}
export default TodoMVCApp;