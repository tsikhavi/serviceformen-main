import { actions as mainActions } from "./main/main.slice";
import { actions as profileActions } from "./profile/profile/profile.slice";
import * as profileActionsDB from "./profile/profile/profile.actions";
import { actions as adminActions } from "./admin/admin.slice";
import * as adminActionsDB from "./admin/admin.actions";
import { actions as blacklistActions } from "./profile/blacklist/blacklist.slice";
import * as blacklistActionsDB from "./profile/blacklist/blacklist.actions";
import { actions as coreActions } from "./core/core.slice";
import * as coreActionsDB from "./core/core.actions";
import { actions as modelActions } from "./model/model/model.slice";
import * as modelActionsDB from "./model/model/model.actions";
import { actions as messageActions } from "./message/message.slice";
import * as messageActionsDB from "./message/message.actions";
import { actions as fileActions } from "./model/file/file.slice";
import * as fileActionsDB from "./model/file/file.actions";
import { actions as photoActions } from "./model/photo/photo.slice";
import * as photoActionsDB from "./model/photo/photo.actions";
import { actions as videoActions } from "./model/video/video.slice";
import * as videoActionsDB from "./model/video/video.actions";
import { actions as tarifActions } from "./model/tarif/tarif.slice";
import * as tarifActionsDB from "./model/tarif/tarif.actions";
import { actions as workTimeActions } from "./model/workTime/workTime.slice";
import * as workTimeActionsDB from "./model/workTime/workTime.actions";
import { actions as modelServiceActions } from "./model/modelService/modelService.slice";
import * as modelServiceActionsDB from "./model/modelService/modelService.actions";
import { actions as modelFeedbackActions } from "./model/modelFeedback/modelFeedback.slice";
import * as modelFeedbackActionsDB from "./model/modelFeedback/modelFeedback.actions";
import { actions as faqActions } from "./faq/faq.slice";
import * as faqActionsDB from "./faq/faq.actions";
import { actions as pageActions } from "./page/page.slice";
import * as pageActionsDB from "./page/page.actions";
import { actions as proposalActions } from "./proposal/proposal.slice";
import * as proposalActionsDB from "./proposal/proposal.actions";
import { actions as verificationActions } from "./verification/verification.slice";
import * as verificationActionsDB from "./verification/verification.actions";

export const rootActions = {
  ...mainActions,
  ...profileActions,
  ...profileActionsDB,
  ...adminActions,
  ...adminActionsDB,
  ...blacklistActions,
  ...blacklistActionsDB,
  ...coreActions,
  ...coreActionsDB,
  ...modelActions,
  ...modelActionsDB,
  ...messageActions,
  ...messageActionsDB,
  ...fileActions,
  ...fileActionsDB,
  ...photoActions,
  ...photoActionsDB,
  ...videoActions,
  ...videoActionsDB,
  ...tarifActions,
  ...tarifActionsDB,
  ...workTimeActions,
  ...workTimeActionsDB,
  ...modelServiceActions,
  ...modelServiceActionsDB,
  ...modelFeedbackActions,
  ...modelFeedbackActionsDB,
  ...faqActions,
  ...faqActionsDB,
  ...pageActions,
  ...pageActionsDB,
  ...proposalActions,
  ...proposalActionsDB,
  ...verificationActions,
  ...verificationActionsDB
};
