import { INavigationLink } from "../../types/main/navigationLink";

export const LinksList = [
  {
    id: 0,
    link: "navigation.all_models",
    is_for_modal: false,
    link_url: "/",
  } as INavigationLink,
  {
    id: 1,
    link: "navigation.new",
    is_for_modal: false,
    link_url: "/new",
  } as INavigationLink,
  {
    id: 2,
    link: "navigation.verified",
    is_for_modal: false,
    link_url: "/verified",
  } as INavigationLink,
  {
    id: 3,
    link: "navigation.with_video",
    is_for_modal: false,
    link_url: "/with_video",
  } as INavigationLink,
  {
    id: 4,
    link: "navigation.contact_us",
    is_for_modal: true,
    link_url: "/",
  } as INavigationLink,
  {
    id: 5,
    link: "global.make_an_order",
    is_for_modal: false,
    link_url: "/proposal",
  } as INavigationLink,
] as INavigationLink[];
