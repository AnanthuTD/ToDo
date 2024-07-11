import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeLayout from "./Theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeLayout>
			<App />
		</ThemeLayout>
	</React.StrictMode>
);
