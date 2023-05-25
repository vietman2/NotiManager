import { Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid } from "@material-ui/core";

import Iconify from "../../../components/Iconify/Iconify";
import {
  fetchProject,
  projectListSelector,
} from "../../../store/slices/project";
import Charts from "./Charts";
import { AppDispatch } from "../../../store";

const types = ["WEBHOOK", "Email", "SMS", "SLACK"];

export default function Analytics() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const projects = useSelector(projectListSelector);
  const [selectedProject, setSelectedProject] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const projectId = projects[selectedProject]?.id;
    if (projectId) {
      dispatch(fetchProject(projectId));
    }
  }, [selectedProject, projects, dispatch]);

  function renderTabs() {
    if (selectedTab === 0) {
      return <></>;
    } else if (selectedTab === 1) {
      return (
        <Tabs
          value={selectedProject}
          onChange={(event, newValue) => setSelectedProject(newValue)}
        >
          {projects.map((project, index) => (
            <Tab key={index} label={project.name} />
          ))}
        </Tabs>
      );
    } else {
      return (
        <Tabs
          value={selectedType}
          onChange={(event, newValue) => setSelectedType(newValue)}
        >
          {types.map((type, index) => (
            <Tab key={index} label={type} />
          ))}
        </Tabs>
      );
    }
  }

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={(event, newValue) => {
          setSelectedTab(newValue);
        }}
        className="Home_tabs"
      >
        <Tab label="All" icon={<Iconify icon="mdi:home" />} />
        <Tab label="By Project" icon={<Iconify icon="eos-icons:project" />} />
        <Tab
          label="By Type"
          icon={<Iconify icon="mdi:format-list-bulleted-type" />}
        />
      </Tabs>

      {renderTabs()}

      <Grid container spacing={3} className="Home_analytics">
        <Charts
          selectedTab={selectedTab}
          selectedType={selectedType}
          selectedProject={selectedProject}
        />
      </Grid>
    </>
  );
}
