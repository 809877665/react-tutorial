const { Component } = require("react");

class TodoItem extends Component {
  state = {
    isShowBtn: false    //是否显示删除按钮
  }
  // 鼠标移入
  handleMouseOver = (e) => {
    this.setState({
      isShowBtn: true
    })
  }
  // 鼠标移出，隐藏删除按钮
  handleMouseOut = (e) => {
    this.setState({
      isShowBtn: false
    })
  }

  // 删除
  handleDel = () =>{
    this.props.delTodoState(this.props.index)
  }

  // 复选框改变时触发
  checkboxChange = (e)=>{
    console.log(e);
    let isDone = !this.props.isDone
    this.props.changeTodoState(this.props.index, isDone)
  }
  render() {
    const {text, isDone} = this.props
    const {isShowBtn} = this.state
    return(
      <ul className="main-item" onMouseOver={this.handleMouseOver} onMouseOut ={this.handleMouseOut}>
        <li className="text-lf" >
          <input type="checkbox" checked={isDone} onChange={this.checkboxChange}></input>
          <span>{text}</span>
        </li>
        <li className={ isShowBtn ? 'text-lf del-box' : 'text-lf del-box closed'}>
          <button type="button" onClick={this.handleDel} >删除</button>
        </li>
      </ul> 
    )
  }
}

export default TodoItem