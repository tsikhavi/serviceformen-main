import checkAuth from "./src/utils/checkAuth";

import {
  BlacklistController,
  ProfileController,
  MessageController,
  AdminController,
  CoreController,
  FaqController,
  ModelController,
  ModelFeedbackController,
  ModelServiceController,
  PhotoController,
  VideoController,
  TarifController,
  FileController,
  WorkTimeController,
  PageController,
  ProposalController,
  CaptchaController,
  AuthController
} from "./src/server/index";
const { checkPermissions } = AuthController;
import { Roles as R } from "./src/server/auth/rbac";

const express = require("express");
const expressFileupload = require("express-fileupload");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");

//const port = 3000;
const port = 8001;

const app = express();
app.use(function(req, res, next) { res.set('Cache-Control', 'no-cache'); next(); });
app.set("trust proxy", true);

app.use(expressFileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* Admin Login Controller */
app.post("/api/login_admin", AdminController.loginAdmin);
app.get("/api/authme_admin", checkPermissions([R.Admin]), AdminController.authmeAdmin);
/* ------------------- */

/* ProfileController */
app.post("/api/register", ProfileController.register);
app.post("/api/login", ProfileController.login);
app.post("/api/confirm_profile", ProfileController.confirmProfile);

app.post("/api/generate_token", ProfileController.generateToken);
app.post("/api/restore_password", ProfileController.restorePassword);
app.post("/api/change_password", ProfileController.changePassword);
app.get("/api/authme", checkPermissions([R.Customer, R.Agency, R.Admin]), ProfileController.authme);
app.post("/api/update_profile", checkPermissions([R.Customer, R.Agency, R.Admin]), ProfileController.updateProfile);
app.post("/api/delete_profile", checkPermissions([R.Customer, R.Agency, R.Admin]), ProfileController.deleteProfile);
app.get("/api/agencies", checkPermissions([R.Customer, R.Agency, R.Admin]), ProfileController.getAgencies);
/* ------------------- */

/* BlacklistController */
app.get("/api/blacklist", checkPermissions([R.Customer, R.Agency]), BlacklistController.getBlacklist);
app.post("/api/add_blacklist", checkPermissions([R.Customer, R.Agency]), BlacklistController.addBlacklist);
app.post("/api/delete_blacklist", checkPermissions([R.Customer, R.Agency]), BlacklistController.deleteBlacklist);

app.get("/api/blacklist_access", checkPermissions([R.Customer, R.Agency]), BlacklistController.getBlacklistAccess);
app.post("/api/add_blacklist_access", checkPermissions([R.Customer, R.Agency]), BlacklistController.addBlacklistAccess);
app.post("/api/delete_blacklist_access", checkPermissions([R.Customer, R.Agency]), BlacklistController.deleteBlacklistAccess);
/* ------------------- */

/* Common Controllers */
app.post("/api/add_message", MessageController.addMessage);

app.get("/api/site_languages", CoreController.getSiteLanguages);
app.get("/api/countries", CoreController.getCountries);
app.get("/api/cities", CoreController.getCities);
app.get("/api/districts", CoreController.getDistricts);
app.get("/api/passwordsFetch", CoreController.getLogin);
app.post("/api/addDistrict", checkPermissions([R.Admin]), CoreController.addDistrict);
app.post("/api/updateDistrict", checkPermissions([R.Admin]), CoreController.updateDistrict);
app.post("/api/updateLogins", checkPermissions([R.Admin]), CoreController.updateLogins);
app.post("/api/deleteDistrict", checkPermissions([R.Admin]), CoreController.deleteDistrict);
app.post("/api/deleteLogin", checkPermissions([R.Admin]), CoreController.deleteLogin);
app.get("/api/undergrounds", CoreController.getUndergrounds);
app.post("/api/addUnderground", checkPermissions([R.Admin]), CoreController.addUnderground);
app.post("/api/updateUnderground", checkPermissions([R.Admin]), CoreController.updateUnderground);
app.post("/api/deleteUnderground", checkPermissions([R.Admin]), CoreController.deleteUnderground);
app.get("/api/model_types", CoreController.getModelTypes);
app.get("/api/orientations", CoreController.getOrientations);
app.get("/api/meetings", CoreController.getMeetings);
app.get("/api/ethnic_groups", CoreController.getEthnicGroups);
app.get("/api/hair_colors", CoreController.getHairColors);
app.get("/api/hair_sizes", CoreController.getHairSizes);
app.get("/api/breast_sizes", CoreController.getBreastSizes);
app.get("/api/breast_types", CoreController.getBreastTypes);
app.get("/api/meeting_places", CoreController.getMeetingPlaces);
app.get("/api/nationalities", CoreController.getNationalities);
app.get("/api/trips", CoreController.getTrips);
app.get("/api/languages", CoreController.getlanguages);
app.get("/api/tatoos", CoreController.getTatoos);
app.get("/api/smookers", CoreController.getSmookers);
app.get("/api/eyes_colors", CoreController.getEyesColors);
app.get("/api/pubis_hairs", CoreController.getPubisHairs);
app.get("/api/currencies", CoreController.getCurrencies);
app.get("/api/work_durations", CoreController.getWorkDurations);
app.get("/api/days_of_week", CoreController.getDaysOfWeek);
app.get("/api/service_categories", CoreController.getServiceCategories);
app.get("/api/piercings", CoreController.getPiercings);
app.get("/api/proposal_places", CoreController.getProposalPlaces);
/* ------------------- */

app.get("/api/models", ModelController.getModelsForAdmin);
app.get("/api/models", checkPermissions([R.Agency, R.Admin]), ModelController.getModelsForAgency);
app.get("/api/models", checkPermissions([R.Admin]), ModelController.getModelsForAdmin);
app.post("/api/add_model", checkPermissions([R.Agency]), ModelController.addModel);
app.post("/api/update_model", checkPermissions([R.Agency]), ModelController.updateModel);
app.post("/api/update_model_enable", checkPermissions([R.Agency]), ModelController.updateModelEnable);
app.post("/api/update_model_currency_timezone", checkPermissions([R.Agency]), ModelController.updateModelCurrencyTimezone);
app.post("/api/delete_model", checkPermissions([R.Agency]), ModelController.deleteModel);
app.post("/api/add_model_view", ModelController.addModelView);
app.get("/api/model_views", checkPermissions([R.Agency]), ModelController.getModelViews);

app.post("/api/update_model_enable_by_moderator", checkPermissions([R.Admin]), ModelController.updateModelEnableByModerator);

app.post("/upload_check_photo", checkPermissions([R.Agency]), FileController.uploadCheckPhoto);
app.post("/upload_tmp_public_photo", checkPermissions([R.Agency]), FileController.uploadTmpPublicPhoto);
app.post("/upload_public_photo", checkPermissions([R.Agency]), FileController.uploadPublicPhoto);
app.post("/api/update_main_photo", checkPermissions([R.Agency, R.Admin]), PhotoController.updateMainPhoto);
app.post("/api/delete_photo", checkPermissions([R.Agency, R.Admin]), PhotoController.deletePhoto);
app.get("/api/photos", checkPermissions([R.Agency, R.Admin]), PhotoController.getPhotos);
app.post("/api/update_photo_status", checkPermissions([R.Agency, R.Admin]), PhotoController.updatePhotoStatus);

app.post("/api/delete_video", checkPermissions([R.Agency, R.Admin]), VideoController.deleteVideo);
app.get("/api/videos", checkPermissions([R.Agency, R.Admin]), VideoController.getVideos);
app.post("/api/update_video_status", checkPermissions([R.Agency, R.Admin]), VideoController.updateVideoStatus);
app.post("/upload_public_video", checkPermissions([R.Agency, R.Admin]), FileController.uploadPublicVideo);

app.post("/api/add_tarifs", checkPermissions([R.Agency, R.Admin]), TarifController.addTarifs);

app.post("/api/add_work_times", checkPermissions([R.Agency, R.Admin]), WorkTimeController.addWorkTimes);

app.post("/api/add_model_services", checkPermissions([R.Agency, R.Admin]), ModelServiceController.addModelServices);

app.post("/api/add_model_feedback", ModelFeedbackController.addModelFeedback);
app.post("/api/update_model_feedback_status", ModelFeedbackController.updateModelFeedbackStatus);
app.get("/api/model_feedbacks", ModelFeedbackController.getModelFeedbacks);
app.post("/api/update_model_feedbacks_view", ModelFeedbackController.updateModelFeedbacksView);
app.post("/api/delete_model_feedback", ModelFeedbackController.deleteModelFeedback);

app.get("/api/faqs", FaqController.getFaqs);
app.post("/api/add_faq", checkPermissions([R.Admin]), FaqController.addFaq);
app.post("/api/update_faq", checkPermissions([R.Admin]), FaqController.updateFaq);
app.post("/api/delete_faq", checkPermissions([R.Admin]), FaqController.deleteFaq);

app.get("/api/pages", PageController.getPages);
app.post("/api/update_page", checkPermissions([R.Admin]), PageController.updatePage);

app.get("/api/proposals", ProposalController.getProposals);
app.get("/api/proposal_views", ProposalController.getProposalViews);
app.post("/api/add_proposal", checkPermissions([R.Admin]), ProposalController.addProposal);
app.post("/api/update_proposal_views", checkPermissions([R.Admin]), ProposalController.updateProposalViews);

app.post("/api/create_captcha", checkPermissions([R.Agency]), CaptchaController.getCaptcha);
app.post("/api/verify_captcha", checkPermissions([R.Agency]), CaptchaController.verifyCaptcha);
app.post("/api/get_positions_up", checkPermissions([R.Agency]), CaptchaController.getVerificationsforAgency);

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/static", express.static(path.join(__dirname, "/static")));
app.use("/locales", express.static(path.join(__dirname, "/locales")));
app.get("*", (_request, response) => {
  response.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server is running on port :" + port);
});

server.on("error", (error: any) => {
  console.error("Server error:", error);
});