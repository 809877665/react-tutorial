const { Component } = require("react");

class TodoFooter extends Component {
  changeTodoStateAll = (e)=>{
    let isChecked = e.target.checked
    this.props.changeTodoStateAll(isChecked)
  }
  // 清除已完成的任务
  clearFinishedTask = () =>{
    this.props.clearFinishedTask()
  } 
  render() {
    console.log('footer中的props：',this.props.isAllChecked);
    return (
      <div className="footer-content"> 
        <div className="text-lf">
          <input type="checkbox" checked={this.props.isAllChecked} onChange={this.changeTodoStateAll}></input>
          <span className="footer-title">全选&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <button className="footer-btn" onClick={this.clearFinishedTask}>清除已完成任务</button>
        </div>

      </div>
    ) 
  }
}

export default TodoFooter