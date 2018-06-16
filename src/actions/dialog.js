/**
 * Created by YIM610 on 2018/6/16
 **/

import { createAction } from "redux-actions";
import * as Types from "../constants/DialogActionTypes";

export const switchDialog = createAction(Types.SWITCH_DIALOG, id => id);