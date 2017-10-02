import React, {Component} from "react";

export default class AddTodo extends Component {
    handleInputTodo = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.addTodo();
        }
    };

    handleAddTodoClick = (event) => {
        event.preventDefault();
        this.addTodo();
    };

    addTodo = () => {
        if (this.item.value) {
            this.props.onTodoAdd(this.item.value);
        }

        this.item.value = '';
        this.item.focus();
    };

    render() {
        return (<form>
            <input placeholder="Enter TODO..." ref={(item) => this.item = item} onKeyPress={this.handleInputTodo}/>
            <input type="button" value="Add" onClick={this.handleAddTodoClick}/>
        </form>);
    }
};

