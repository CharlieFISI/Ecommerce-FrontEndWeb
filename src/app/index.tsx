import React from "react";
import { Redirect } from "expo-router";
import "../styles/index.css";

// Web client ID
// 831409840339-dhtoak9e85o926g9eotf8h813uvsigd4.apps.googleusercontent.com
// Android client ID

const Index = () => {
  return <Redirect href='/welcome' />;
};

export default Index;
