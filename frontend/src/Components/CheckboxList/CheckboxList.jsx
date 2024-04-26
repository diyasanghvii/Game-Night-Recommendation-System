import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";

export default function CheckboxList({ items, onCheckboxToggle }) {
  const handleToggle = (item) => () => {
    onCheckboxToggle(item);
  };

  return (
    <List 
      sx={{ width: "100%", maxWidth: 560, maxHeight: 400, overflow: "auto", paddingBottom: 0 }}
    >
      {items.map((item, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{borderBottom: "1px solid rgba(134, 131, 135, 0.4)",}}>
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    sx={{
                      color: "white",
                      "&.Mui-checked": {
                        color: "white",
                      },
                    }}
                    onClick={handleToggle(item)}
                    edge="start"
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <AccountCircleIcon fontSize="large" />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  id={labelId}
                  sx={{ fontSize: "18px" }}
                  primary={item.name}
                />
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "14px", marginLeft: 5 }}
                  fontSize="1px"
                  fontWeight="bold"
                  edge="end"
                  id={labelId}
                  primary={item.username}
                />
              </ListItemButton>
            </ListItem>
            {index !== items.length - 1 && (
              <Divider variant="middle" component="li" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
}
