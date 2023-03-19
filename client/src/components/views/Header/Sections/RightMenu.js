import { Menu } from 'antd';
// import axios from 'axios';
// import { USER_SERVER } from '../../../Config';
// import { useSelector } from "react-redux";

export default function RightMenu(props) {
  // const user = useSelector(state => state.user)

//   const logoutHandler = () => {
    // axios.get(`${USER_SERVER}/logout`).then(response => {
    //   if (response.status === 200) {
    //     props.history.push("/login");
    //   } else {
    //     alert('Log Out Failed')
    //   }
    // });
//   };

    const items = [
        {
        label: 'Signin',
        key: 'mail',
        },
        {
        label: 'Signup',
        key: 'app',
        },
    ];

  return (
    <Menu mode={props.mode} items={items} />
  );










//   if (user.userData && !user.userData.isAuth) {
//     return (
//       <Menu mode={props.mode}>
//         <Menu.Item key="mail">
//           <a href="/login">Signin</a>
//         </Menu.Item>
//         <Menu.Item key="app">
//           <a href="/register">Signup</a>
//         </Menu.Item>
//       </Menu>
//     )
//   }else {
//     return (
//       <Menu mode={props.mode}>
//         <Menu.Item key="logout">
//           <a onClick={logoutHandler}>Logout</a>
//         </Menu.Item>
//       </Menu>
//     )
//   }
}