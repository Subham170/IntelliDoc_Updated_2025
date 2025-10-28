import React from "react";
import ContextProvider from "../MediBuddy/Main/context/context";
import FloatingChat from "./FloatingChat";

const FloatingChatWrapper = () => {
  return (
    <ContextProvider>
      <FloatingChat />
    </ContextProvider>
  );
};

export default FloatingChatWrapper;
