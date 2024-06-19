import { combineReducers } from "@reduxjs/toolkit";
import { reducer as mainReducer } from "./main/main.slice";
import { reducer as profileReducer } from "./profile/profile/profile.slice";
import { reducer as adminReducer } from "./admin/admin.slice";
import { reducer as coreReducer } from "./core/core.slice";
import { reducer as blacklistReducer } from "./profile/blacklist/blacklist.slice";
import { reducer as modelReducer } from "./model/model/model.slice";
import { reducer as messageReducer } from "./message/message.slice";
import { reducer as fileReducer } from "./model/file/file.slice";
import { reducer as photoReducer } from "./model/photo/photo.slice";
import { reducer as videoReducer } from "./model/video/video.slice";
import { reducer as tarifReducer } from "./model/tarif/tarif.slice";
import { reducer as workTimeReducer } from "./model/workTime/workTime.slice";
import { reducer as modelServiceReducer } from "./model/modelService/modelService.slice";
import { reducer as modelFeedbackReducer } from "./model/modelFeedback/modelFeedback.slice";
import { reducer as faqReducer } from "./faq/faq.slice";
import { reducer as pageReducer } from "./page/page.slice";
import { reducer as proposalReducer } from "./proposal/proposal.slice";
import { reducer as verificationReducer } from "./verification/verification.slice";

export const reducers = combineReducers({
  mainReducer,
  profileReducer,
  adminReducer,
  coreReducer,
  blacklistReducer,
  modelReducer,
  messageReducer,
  fileReducer,
  photoReducer,
  videoReducer,
  tarifReducer,
  workTimeReducer,
  modelServiceReducer,
  modelFeedbackReducer,
  faqReducer,
  pageReducer,
  proposalReducer,
  verificationReducer,
});
