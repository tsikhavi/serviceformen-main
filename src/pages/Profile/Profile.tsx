/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Profile.module.sass";

import ProfileNavigation from "./content/profileNavigation/ProfileNavigation";
import MainInfo from "./content/mainInfo/MainInfo";
import AuthParameters from "./content/authParameters/AuthParameters";
import DeleteProfile from "./content/deleteProfile/DeleteProfile";
import AddBlacklist from "./content/addBlacklist/AddBlacklist";
import AccessToBlacklist from "./content/accessToBlacklist/AccessToBlacklist";
import Blacklist from "./content/blacklist/Blacklist";
import Models from "./content/models/Models";

import { ServerStatusType } from "../../enums/serverStatusType";

const Profile = () => {
  const navigate = useNavigate();
  const { getAgencies, getModelsAgency, getBlacklist, getBlacklistAccess, setActiveHeaderLink, getProposals, getProposalViews } =
    useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const activeSection = useTypedSelector((state) => state.profileReducer.activeProfileSection);

  const profileSections = [
    <MainInfo />,
    <AuthParameters />,
    <DeleteProfile />,
    <Models />,
    <AddBlacklist />,
    <Blacklist />,
    <AccessToBlacklist />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveHeaderLink(-1);
  }, []);

  useEffect(() => {
    setActiveHeaderLink(-1);
  }, [activeSection]);

  useEffect(() => {
    if (!isAuth && profileStatuses.authMe.status === ServerStatusType.Error) {
      navigate("/profile");
    } else {
      if (profileStatuses.authMe.status === ServerStatusType.Success) {
        getModelsAgency({ profile_id: profile.id });
        getProposals();
        getProposalViews();
        getAgencies();
        getBlacklist();
        getBlacklistAccess({ agency_id: profile.id });
      }
    }
  }, [isAuth, profileStatuses]);

  return (
    <div className={styles.wrapper_content}>
      <ProfileNavigation />
      {profileSections[activeSection]}
    </div>
  );
};

export default Profile;
