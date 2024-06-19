import { IModelFeedback } from "./modelFeedback";

export function initModelFeedback(): IModelFeedback {
  const defaults = {
    id: -1,
    model_id: -1,
    name: "",
    is_from_model: false,
    is_photo_real: -1,
    is_only_one: -1,
    text: "",
    rate: -1,
    create_date: new Date(),
    status: 1,
    parent_id: -1,
    is_viewed: false,
    user_data: '',
  };

  return {
    ...defaults,
  };
}
