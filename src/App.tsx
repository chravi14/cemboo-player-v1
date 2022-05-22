import React from "react";
import "./App.css";
import { CembooPlayer } from "./components";

interface IProps {
  mediaId?: string;
  url: string;
  channelId?: string;
}

const App: React.FC<IProps> = ({ url }) => {
  return <CembooPlayer url={url} />;
};

export default App;
