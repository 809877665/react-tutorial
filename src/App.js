// import { Component } from 'react';
import ReactDom from 'react-dom';
import React from 'react';

import './App.css';
// import Table from './components/Table/Table'
// import SimpleComponent from './components/Simple/Simple'

// 简单表格组件demo
// class App extends Component {
//   state = {
//     peopleList: [
//       { name: '张三', age: 23, sex: '男' },
//       { name: '李四', age: 24, sex: '女' }
//     ]
//   }
//   removeCharacter = (index) => {
//     const { peopleList } = this.state
//     this.setState({
//       peopleList: peopleList.filter((character, i) => {
//         return i !== index
//       }),
//     })
//   }
//   render() {
//     const {peopleList} = this.state;
//     return (
//       <div className="container">
//         <Table characterData={peopleList} removeCharacter={this.removeCharacter}/>
//         <SimpleComponent />
//       </div>  
//     )
//   }
// }

// 待办事项demo

import TodoHeader from './components/header'
import TodoMain from './components/main'
import TodoFooter from './components/footer'
class App extends React.Component {
  state = {
    todoList: JSON.parse(localStorage.getItem('todoList')) || [],    //存放所有待办事项的数据
    isAllChecked: false,  //是否全部选中
    msg: '更新前的数据',
    date: new Date()
  }

  // 生命周期测试
  // 即将挂载虚拟Dom，但是此时可以拿到state中的数据，和Vue不同
  componentWillMount() {
    console.log('componentWillMount', this.state.msg);
  }
  // 一般在这里调用ajax请求，因为不会阻止UI的渲染，组件已经挂载了，可以放心使用渲染出的dom
  componentDidMount() {
    console.log('componentDidMount', this.state.msg);
    this.timerId = setInterval(()=> this.tick(), 1000)
  }
  // state中的数据更新前触发
  componentWillUpdate() {
    console.log('componentWillUpdate', this.state.msg);
  }
  // state中的数据更新完成时触发
  componentDidUpdate() {
    console.log('componentDidUpdate',this.state.msg);
  }
  // 返回false时，state中更新后的数据不会渲染到页面上；
  // 返回true时，state中更新后的数据会渲染到页面上
  shouldComponentUpdate(nextprops,nextStates) {
    console.log('shouldComponentUpdate', nextprops);
    console.log('shouldComponentUpdate', nextStates);
    return true
  }
  // 组件卸载前触发
  componentWillUnmount() {
    console.log('componentwillUnMount');
    clearInterval(this.timerId)
  }
  
  tick() {
    this.setState({
      date: new Date()
    })
    // this.state.date = new Date()
  }

  // 单个item前面的复选框改变时触发
  changeTodoState = (index,isDone) =>{
    this.state.todoList[index].isDone = isDone
    let isAllChecked = false
    // 判断todoList中的数据isDone是否都为true,如果是则勾上全选
    let isFlag = this.state.todoList.every(ele => ele.isDone) 
    if(isFlag){
       isAllChecked = true
    }
    this.setState({
      todoList: this.state.todoList,
      isAllChecked
    })
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
  }

  /**
   * 注意：这里要用箭头函数，主要是为了使用this
   *@description: 全选复选框改变时触发  
   * @param {*} checked 
   */
  changeTodoStateAll = (checked) => {
    this.setState({
      todoList: this.state.todoList.map(ele=>{
        ele.isDone = checked
        return ele
      }),
      isAllChecked: checked
    })
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
  }

  // 按下回车添加新任务
  handleKeyup = (item)=> {
    this.state.todoList.unshift(item)
    this.setState({
      todoList: this.state.todoList
    })
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
  }

  // 删除单个待办
  delTodoState = (index) => {
    this.state.todoList.splice(index,1)
    this.setState({
      todoList: this.state.todoList
    })
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
  }

  // 清除已完成的任务
  clearDone = async () =>{
    await this.setState({
      todoList: this.state.todoList.filter(ele=> !ele.isDone)
    })
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
  }

  changMsg = () => {
    this.setState({
      msg: '更新后的数据'
    })
  }
  destroyMsg = () => {
    ReactDom.unmountComponentAtNode(document.getElementById('root'))
  }
  
  render() {
    const {todoList,isAllChecked,msg,date} = this.state
    let info = {
      todoList,
      todoCount: todoList.length,
      isAllChecked
    }
    return (
      <div className="content" >
        <h2>{msg}</h2>
        <h2>当前时间为：{date.toLocaleTimeString()}</h2>
        <button onClick={this.changMsg} className="mg-20">更新</button>
        <button onClick={this.destroyMsg}>卸载</button>
        <div className="content-box">
          <TodoHeader handleKeyup={this.handleKeyup} />
          <TodoMain {...info} changeTodoState={this.changeTodoState} delTodoState={this.delTodoState}/>
          <TodoFooter isAllChecked={isAllChecked} changeTodoStateAll={this.changeTodoStateAll} clearFinishedTask={this.clearDone}/>
        </div>
      </div>
    )
  }
}

export default App;
