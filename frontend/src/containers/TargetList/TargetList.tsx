import { Box, Button, MenuItem, Popover, Tab, Tabs } from "@mui/material";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/Iconify/Iconify";
import TargetCreateModal from "../../components/Targets/TargetCreateModal";
import { deleteTarget } from "../../services/target";
import { AppDispatch } from "../../store";
import { fetchTargets, targetListSelector } from "../../store/slices/target";
import { Container } from "@mui/system";
import "./TargetList.css";
import DynamicTable from "../../components/Message/DynamicTable";
import {
  defaultInDepthFieldParser,
  getTargetColumns,
  getTargetKeys,
} from "../../components/Message/utils/dyanamicTableUtils";

export default function TargetListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [notificationType, setNotificationType] = useState("");
  const [showState, setShowState] = useState<number[]>([]);
  const [targetId, setTargetId]: any = useState(null);

  useEffect(() => {
    const getNotificationType = (type: number) => {
      switch (type) {
        case 0:
          return "WEBHOOK";
        case 1:
          return "EMAIL";
        case 2:
          return "SMS";
        default:
          return "SLACK";
      }
    };
    setNotificationType(getNotificationType(selectedTab));
  }, [selectedTab]);

  const handleRowClick = (rowId: number) => {
    if (showState.includes(rowId)) {
      setShowState(showState.filter((id) => id !== rowId));
      return;
    }
    setShowState([...showState, rowId]);
  };

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickDelete = async () => {
    const targetId = open!.dataset.id;
    await deleteTarget(Number(targetId));
    handleCloseMenu();
    dispatch(fetchTargets());
  };

  const handleClickCreateButton = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTargets());
  }, [dispatch]);
  const targets = useSelector(targetListSelector);

  function a11yProps(index: number) {
    return {
      //id: `simple-tab-${index}`,
      "data-testid": `tab-${index}`,
      //"aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleAuthColumn = (fieldName: string, target: any): string => {
    // AUTH COLUMN
    if (fieldName === "data.auth") {
      let data = target.data;
      if ("auth" in target) return "";
      if (!showState.includes(target.id)) return "**********";

      let auth = target.data["auth"];
      switch (auth) {
        case "no_auth":
          return "No Authentication";
        case "basic":
          return `Basic Authentication , Username: ${data.username} , Password: ${data.password}`;
        case "bearer":
          return `Bearer Authentication , Token: ${data.token}`;
        case "api_key":
          return `API Key Authentication , Key: ${data.key}  ,  Value: ${data.value}`;
        default:
          return "No Authentication";
      }
    }
    return defaultInDepthFieldParser(fieldName, target);
  };

  function renderTable() {
    return (
      <Box>
        <DynamicTable
          columns={getTargetColumns(notificationType)}
          keys={getTargetKeys(notificationType)}
          rows={targets.filter(
            (target) => target.notification_type === notificationType
          )}
          handleOpenMenu={handleOpenMenu}
          onClickRow={handleRowClick}
          parser={handleAuthColumn}
        />
      </Box>
    );
  }

  return (
    <>
      <TargetCreateModal
        open={createModalopen}
        handleClose={() => {
          setTargetId(null);
          setCreateModalOpen(false);
        }}
        targetId={targetId}
      />
      <Container maxWidth="xl" className="targetList">
        <Grid container justifyContent="space-between">
          <Grid item>
            <h2>{"Targets"}</h2>
          </Grid>
          <Grid item className="targetButton">
            <Button
              data-testid="create-button"
              onClick={handleClickCreateButton}
            >
              New Target
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => {
              setSelectedTab(newValue);
            }}
          >
            <Tab
              icon={<Iconify icon={"material-symbols:webhook"} />}
              iconPosition="start"
              label="Webhook"
              {...a11yProps(2)}
            />

            <Tab
              icon={<Iconify icon={"ic:outline-email"} />}
              iconPosition="start"
              label="Email"
              {...a11yProps(1)}
            />

            <Tab
              icon={<Iconify icon={"material-symbols:sms-outline"} />}
              iconPosition="start"
              label="SMS"
              {...a11yProps(3)}
            />
            <Tab
              icon={<Iconify icon={"la:slack"} />}
              label="Slack"
              iconPosition="start"
              {...a11yProps(0)}
            />
          </Tabs>
        </Box>
        {renderTable()}
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem
          onClick={async () => {
            handleCloseMenu();
            const targetId = open!.dataset.id;
            await setTargetId(targetId);
            setCreateModalOpen(true);
          }}
          data-testid="edit-button"
        >
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ color: "error.main" }}
          data-testid="delete-button"
          onClick={handleClickDelete}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
