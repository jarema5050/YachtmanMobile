import React from 'react';
import DrawerNav from "../DrawerNav"
import ListStack from "./ListStack"
import YachtManageStack from './YachtManage/YachtManageStack'
import CruiseManageStack from './YachtManage/CruiseManageStack';

export default function ListDrawerNav() {
          return (
            <DrawerNav
              screensArray={[
                {name: "List", component: ListStack},
                {name: "Manage yachts", component: YachtManageStack},
                {name: "Manage cruises", component: CruiseManageStack}
              ]}
            ></DrawerNav>
          )
  }