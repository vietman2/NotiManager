import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Iconify from "../Iconify/Iconify";
import { TargetType, TargetUserIdNameDto } from "../../types";
import "./index.css";

interface IProps {
  selected: TargetUserIdNameDto[];
  setSelected: (selected: TargetUserIdNameDto[]) => void;
  targetUsers: TargetType[];
}

export default function TargetUserMultiSelect(props: IProps) {
  const { targetUsers, selected, setSelected } = props;
  const [options, setOptions]: any = useState([]);

  useEffect(() => {
    setOptions(
      targetUsers.map((target) => {
        return { label: target.name, value: target.id };
      })
    );
  }, [targetUsers]);

  return (
    <>
      <List
        sx={{
          width: "100%",
          bgcolor: "#F5F5F5",
          borderRadius: 3,
          position: "relative",
          overflow: "auto",
          maxHeight: 300,
          minHeight: 300,
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        <ListSubheader sx={{ bgcolor: "#F5F5F5" }}>
          Selected users
        </ListSubheader>
        {selected.map((e: any) => {
          const labelId = `checkbox-list-secondary-label-${e.value}`;
          return (
            <ListItem
              key={e.value}
              // UI상 이 부분은 빼는게 더 낫지 않을까 해서 주석처리 했습니다
              // secondaryAction={
              //   <ListItemButton
              //     onClick={() => {
              //       setSelected(
              //         selected.filter((s: any) => s.value !== e.value)
              //       );
              //     }}
              //   >
              //     <Iconify
              //       icon={"system-uicons:cross"}
              //       sx={{ mr: 2, color: "error.main" }}
              //     />
              //   </ListItemButton>
              // }
            >
              <ListItemButton
                onClick={() => {
                  setSelected(selected.filter((s: any) => s.value !== e.value));
                }}
              >
                <ListItemText id={labelId} primary={e.label} />
                <Iconify
                  icon={"system-uicons:cross"}
                  sx={{ mr: 2, color: "error.main" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <br />
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </>
  );
}
