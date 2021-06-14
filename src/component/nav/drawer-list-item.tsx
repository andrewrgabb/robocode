import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { NavLink } from "react-router-dom";
import Box from "@material-ui/core/Box";

const styles = makeStyles((theme) => ({
  itemLink: {
    textDecoration: "none",
    color: "black",
    "&.active": {
      backgroundColor: "#f8f9fa",
    },
    "&:hover": {
      backgroundColor: "#f8f9fa",
      textDecoration: "none",
    },
  },
  itemText: {
    paddingLeft: theme.spacing(1),
    fontWeight: "bold",
  },
  iconContainer: {
    minWidth: 30 + "px",
  },
}));

interface DrawerListItemProps {
  key: string;
  onClick: () => void;
  item: any; // TODO: Add proper 'item' type here
}

const DrawerListItem: FC<DrawerListItemProps> = (props) => {
  const { key, onClick, item } = props;
  const classes = styles();

  const listItem = () => {
    return (
      <ListItem button onClick={() => onClick()}>
        <Box className={classes.iconContainer}>{item.icon}</Box>
        <ListItemText className={classes.itemText} primary={item.text} />
      </ListItem>
    );
  };

  if (!item.to) {
    return listItem();
  }
  if (item.to.pathname.startsWith("http")) {
    return (
      <a
        href={item.to.pathname}
        className={`${classes.itemLink}`}
      >
        {listItem()}
      </a>
    );
  } else {
    return (
      <NavLink
        key={key}
        className={classes.itemLink}
        exact={true}
        to={item.to}
        onClick={() => onClick()}
      >
        {listItem()}
      </NavLink>
    );
  }
};

export default DrawerListItem;
