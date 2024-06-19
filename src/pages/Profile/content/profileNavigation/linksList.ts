import { IProfileLink } from "../../../../types/main/profileLink";
import { IProfileLinkGroup } from "../../../../types/main/profileLinkGroup";

const LinksList = [
  {
    group: "profile.profile_management",
    links: [
      { id: 0, link: "profile.basic_information", is_only_for_agency: false } as IProfileLink,
      {
        id: 1,
        link: "profile.login_options",
        is_only_for_agency: false,
      } as IProfileLink,
      { id: 2, link: "profile.deleting_a_profile", content: "", is_only_for_agency: false } as IProfileLink,
    ] as IProfileLink[],
  } as IProfileLinkGroup,
  {
    group: "",
    links: [{ id: 3, link: "global.advertisements", is_only_for_agency: true } as IProfileLink] as IProfileLink[],
  } as IProfileLinkGroup,
  {
    group: "profile.blacklist",
    links: [
      {
        id: 4,
        link: "profile.add_to_blacklist",
        is_only_for_agency: true,
      } as IProfileLink,
      {
        id: 5,
        link: "profile.blacklist",
        is_only_for_agency: true,
      } as IProfileLink,
      { id: 6, link: "profile.access_to_the_blacklist", is_only_for_agency: true } as IProfileLink,
    ] as IProfileLink[],
  } as IProfileLinkGroup,
] as IProfileLinkGroup[];

export default LinksList;
