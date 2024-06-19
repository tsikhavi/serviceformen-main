import { INavigationLink } from "../../types/main/navigationLink";

export const LinksList = [
  {
    id: 0,
    link: "FAQ",
    is_for_modal: false,
    link_url: "/faq",
  } as INavigationLink,
  {
    id: 1,
    link: "navigation.contact_us",
    is_for_modal: true,
    link_url: "/",
  } as INavigationLink,
  {
    id: 2,
    link: "navigation.confidentiality",
    is_for_modal: false,
    link_url: "/confidentiality",
  } as INavigationLink,
  {
    id: 3,
    link: "navigation.user_agreement",
    is_for_modal: false,
    link_url: "/user_agreement",
  } as INavigationLink,
] as INavigationLink[];
