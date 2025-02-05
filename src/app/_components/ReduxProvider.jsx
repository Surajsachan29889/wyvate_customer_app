"use client";
import { Provider } from "react-redux";
import React from "react";
import store from '../store/index.js'

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
