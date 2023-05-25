import { Box, Button, MenuItem, Popover, Tab, Tabs } from "@mui/material";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/Iconify/Iconify";

import MessageCreateModal from "../../components/Message/MessageCreateModal";
import { deleteMessage } from "../../services/message";
import { fetchMessages, messageListSelector } from "../../store/slices/message";

import { AppDispatch } from "../../store";
import { Container } from "@mui/system";
import DynamicTable from "../../components/Message/DynamicTable";
import "./MessageList.css";
import {
  getMessageColumns,
  getMessageKeys,
} from "../../components/Message/utils/dyanamicTableUtils";

export default function MessageListTable() {
  const [open, setOpen]: [HTMLElement | null, any] = useState(null);
  const [createModalopen, setCreateModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [notificationType, setNotificationType] = useState("");
  const [messageId, setMessageId]: any = useState(null);

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

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleClickDelete = async () => {
    const messageId = open!.dataset.id;
    await deleteMessage(Number(messageId));
    handleCloseMenu();
    dispatch(fetchMessages());
  };

  const handleClickCreateButton = (event: React.MouseEvent) => {
    setCreateModalOpen(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
  const messages = useSelector(messageListSelector);

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "data-testid": `tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function renderTable() {
    return (
      <Box>
        <DynamicTable
          columns={getMessageColumns(notificationType)}
          keys={getMessageKeys(notificationType)}
          rows={notificationType in messages ? messages[notificationType] : []}
          handleOpenMenu={handleOpenMenu}
        />
      </Box>
    );
  }

  return (
    <>
      <MessageCreateModal
        open={createModalopen}
        handleClose={() => {
          setMessageId(null);
          setCreateModalOpen(false);
        }}
        messageId={messageId}
      ></MessageCreateModal>
      <Container maxWidth="xl" className="messageList">
        <Grid container justifyContent="space-between">
          <Grid item>
            <h2>{"Messages"}</h2>
          </Grid>
          <Grid item className="messageButton">
            <Button
              data-testid="create-button"
              onClick={handleClickCreateButton}
            >
              New Message
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
            const messageId = open!.dataset.id;
            await setMessageId(messageId);
            setCreateModalOpen(true);
          }}
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
