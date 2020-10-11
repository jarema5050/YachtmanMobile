import React from 'react';
import DrawerNav from "../DrawerNav"
import ListStack from "./ListStack"
import SecondScreen from "../Profile/ProfileDrawer"
export default function ListDrawerNav() {
          return (
            <DrawerNav
              screensArray={[
                {name: "List", component: ListStack},
                {name: "Second", component: SecondScreen}
              ]}
            ></DrawerNav>
          )
  }