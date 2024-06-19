import { IFaq } from "../faq/faq";

export function initFaq(): IFaq {
  const defaults = {
    id: -1,
    answer: "",
    answer_eng: "",
    question: "",
    question_eng: "",
  };

  return {
    ...defaults,
  };
}
