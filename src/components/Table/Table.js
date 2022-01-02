import './Table.css';
const { Component } = require("react");

// 1. 使用class关键字定义组件
// class Table extends Component{
//   render() {
//     return (
//       <table className="table-box">
//         <thead>
//           <tr>
//             <th>姓名</th>
//             <th>性别</th>
//             <th>年龄</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>张三</td>
//             <td>男</td>
//             <td>22</td>
//           </tr>
//         </tbody>
//       </table>
//     )
//   }
// }

// 2. 使用ES6箭头函数来创建简单组件
const TableHeader = ()=>{
  return (
    <thead>
      <tr>
        <th>姓名</th>
        <th>性别</th>
        <th>年龄</th>
        </tr>
    </thead>
  )
}
const TableBody = (props)=>{
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.sex}</td>
        <td>{row.age}</td>
        <td>
          <button onClick={() => props.removeCharacter(index)}>删除</button>
        </td>
      </tr>
    )
  })
  return <tbody>{rows}</tbody>
}

// class Table extends Component {
//   render() {
//     console.log('接收到的数据', this.props);
//     const { characterData } = this.props
//     return (
//       <table>
//         <TableHeader />
//         <TableBody characterData={characterData} />
//       </table>
//     )
//   }
// }

const Table = (props) => {
  const { characterData, removeCharacter } = props
  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} removeCharacter={removeCharacter} />
    </table>
  )
} 

export default Table