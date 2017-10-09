import React, {Component} from "react";
import PropTypes from 'prop-types';

class AddTodo extends Component {
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
        const todo = this.item.value.trim();

        if (todo) {
            this.props.addTodo(todo);
        }

        this.item.value = '';
        this.item.focus();
    };

    render() {
        return (<form>
            <input
                placeholder="Enter TODO..."
                ref={(item) => this.item = item}
                onKeyPress={this.handleInputTodo}/>
            <input
                type="button"
                value="Add"
                onClick={this.handleAddTodoClick}/>
        </form>);
    }
};

AddTodo.propType = {
    addTodo: PropTypes.func.isRequired
};

export default AddTodo;

