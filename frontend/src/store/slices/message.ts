import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RootState } from "..";
import { EnumNotificationType } from "../../Enums";
import { fetchMessagesWithNotificationType } from "../../services/message";
import { MessageListType, MessageType } from "../../types";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async () => {
    const result: MessageListType = {};
    await Promise.all(
      Object.keys(EnumNotificationType).map(async (nt) => {
        result[nt] = await fetchMessagesWithNotificationType(nt);
      })
    );
    return result;
  }
);

export const fetchSlackMessages = createAsyncThunk(
  "message/fetchSlackMessages",
  async () => {
    return await fetchMessagesWithNotificationType(EnumNotificationType.SLACK);
  }
);

// // TODO
// export const fetchEmailMessages = createAsyncThunk(
//   "message/fetchEmailMessages",
//   async () => {
//     return await fetchMessagesWithNotificationType(EnumNotificationType.EMAIL);
//   }
// );

// export const fetchWebhookMessages = createAsyncThunk(
//   "message/fetchWebhookMessages",
//   async () => {
//     return await fetchMessagesWithNotificationType(
//       EnumNotificationType.WEBHOOK
//     );
//   }
// );

// export const fetchSmsMessages = createAsyncThunk(
//   "message/fetchSmsMessages",
//   async () => {
//     return await fetchMessagesWithNotificationType(EnumNotificationType.SMS);
//   }
// );

export const fetchMessage = createAsyncThunk(
  "message/fetchMessage",
  async (messageId: number) => {
    const response = await axios.get<MessageType>(`/api/message/${messageId}/`);
    return response.data;
  }
);

const initialState: {
  messages: { [key: string]: MessageType[] };
  selectedMessage: MessageType | null;
} = {
  selectedMessage: null,
  messages: {},
};

export const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
    builder.addCase(fetchMessage.fulfilled, (state, action) => {
      state.selectedMessage = action.payload;
    });
  },
});

export const messageListSelector = (state: RootState) => state.message.messages;
export const messageSelect = (state: RootState) => state.message;
export default MessageSlice.reducer;
