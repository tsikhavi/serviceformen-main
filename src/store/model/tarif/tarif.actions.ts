import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";

import { ITarif } from "../../../types/model/tarif/tarif";

export const addTarifs = createAsyncThunk(
  "api/addTarifs",
  async ({ tarifs, model_id }: { tarifs: ITarif[]; model_id: number }) => {
    return await axios
      .post("/api/add_tarifs", {
        params: {
          tarifs: tarifs,
          model_id: model_id,
        },
      })
      .then((response) => response.data);
  }
);
