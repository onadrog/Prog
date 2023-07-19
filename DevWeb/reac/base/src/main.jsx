import React from "react";
import ReactDOM from "react-dom/client";
import App, { WorkerCtx } from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<WorkerCtx>
			<App />
		</WorkerCtx>
	</React.StrictMode>,
);
