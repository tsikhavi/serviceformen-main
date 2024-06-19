export interface IModelFeedback {
  id: number;
  model_id: number;
  name: string;
  is_from_model: boolean;
  is_photo_real: number;
  is_only_one: number;
  text: string;
  rate: number;
  create_date: Date;
  status: number;
  parent_id: number;
  is_viewed: boolean;
  user_data: string;
}
