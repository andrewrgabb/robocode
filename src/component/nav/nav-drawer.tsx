import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import React, { FC, useContext } from "react";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { drawerWidth } from "../base-page";
import { Competition } from "../../transport/competition";

import UserContext from "../../context/user-context";
import {
  getMobileHomeNavItem,
  getTopNavItems,
  ON_ALL_PAGES,
} from "./nav-items";
import DrawerListItem from "./drawer-list-item";

const styles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
  },
  closeMenuButton: {
    marginRight: "auto",
    marginLeft: 0,
  },
}));

interface NavDrawerProps {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
  compInfo: Competition;
}

const NavDrawer: FC<NavDrawerProps> = (props) => {
  const { handleDrawerToggle, mobileOpen, compInfo } = props;

  const classes = styles();
  const userContext = useContext(UserContext);

  const renderHomeButton = () => {
    const homeNavItem = getMobileHomeNavItem();

    return homeNavItem.map((navItem, index) => (
      <DrawerListItem
        key={`drawer-top-nav-item-${index}`}
        onClick={handleDrawerToggle}
        item={navItem}
      />
    ));
  };

  const renderTopNavItems = () => {
    const topNavItems = getTopNavItems();

    // Home button should always show in the nav drawer but not always in the top bar.
    return topNavItems
      .filter(
        (navItem) =>
          navItem.loggedIn === userContext.isUserLoggedIn() ||
          (navItem.loggedIn === ON_ALL_PAGES &&
            (navItem.showBeforeCompetitionStart ||
              compInfo.status === "launched" ||
              compInfo.launchDate < Date.now()))
      )
      .map((navItem, index) => (
        <DrawerListItem
          key={`drawer-top-nav-item-${index}`}
          onClick={handleDrawerToggle}
          item={navItem}
        />
      ));
  };

  const renderDrawer = () => {
    return (
      <div>
        <List>
          {renderHomeButton()}
          {renderTopNavItems()}
        </List>
      </div>
    );
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={mobileOpen}
      onClose={props.handleDrawerToggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: false, // Better open performance on mobile.
      }}
    >
      <IconButton
        onClick={handleDrawerToggle}
        className={classes.closeMenuButton}
      >
        <Close />
      </IconButton>
      {renderDrawer()}
    </Drawer>
  );
};

export default NavDrawer;
