const { Component } = require("react");

class TodoHeader extends Component {
  // 按下回车键时添加新任务
  handleKeyup = (e) =>{
    if(e.keyCode === 13) {
      // 回车键弹起
      let value = e.target.value
      if(!value) return false
      let item = {
        text: value,
        isDone: false
      }
      this.props.handleKeyup(item)
      e.target.value = ''
    }
  }
  render() {
    console.log('head中的props：',this.props);
    return (
      <div className="header-content"> 
        <h1 className="header-title"> React todo </h1>
        <div className="text-lf"> 
          <label >任务：&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <input type="text" placeholder="请输入任务名称并按下回车键" onKeyUp={this.handleKeyup}></input>
        </div>
      </div>
    ) 
  }
}

export default TodoHeader