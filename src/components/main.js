
import TodoItem from './item';

const { Component } = require("react");

class TodoMain extends Component {
  render() {
    console.log('main中的props',this.props);
    let {todoList, isAllChecked,todoCount} = this.props
    let finishedCount = (todoList && todoList.filter(ele=>ele.isDone).length) || 0
    return (
      todoList.length >0 ? (
        <div className="main-content">
          {
            todoList.map((todo,index)=>{
              return <TodoItem text={todo.text} key={index} isDone={todo.isDone} index={index} {...this.props}/>
            })
          }
          <div className="text-lf">
              <label>
                <span><strong>{todoCount}</strong>总数/<strong>{finishedCount}</strong>已完成</span>
              </label>
          </div>
        </div>
      ) : <div className="main-content"> 暂无待办事项</div>
      
    ) 
  }
}

export default TodoMain