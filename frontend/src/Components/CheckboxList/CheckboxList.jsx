import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";

export default function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List sx={{ width: "100%", maxWidth: 560, maxHeight: 400, overflow: 'auto'}}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <>
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <AccountCircleIcon fontSize="large" />
                </ListItemAvatar>
                <ListItemText disableTypography id={labelId} sx={{ fontSize: "18px"}} primary={`User ${value + 1}`} />
                <ListItemText
                  disableTypography
                  sx={{ fontSize: "14px", marginLeft: 5 }}
                  fontSize="1px"
                  fontWeight="bold"
                  edge="end"
                  id={labelId}
                  primary={`Discord user name ${value + 1}`}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
          </>
        );
      })}
    </List>
  );
}
