import React, { ReactNode, useState } from "react";
import { ConfigProvider, theme } from "antd";
import ToDoLayout from "./Layout";

export type ThemeMode = "light" | "dark";

const ThemeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
	const initialTheme: ThemeMode = (localStorage.getItem("theme") ||
		"light") as ThemeMode;
	const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);

	function changeThemeMode(mode: ThemeMode) {
		setThemeMode(mode);
		localStorage.setItem("theme", mode);
	}
	return (
		<ConfigProvider
			theme={{
				algorithm:
					themeMode === "light"
						? theme.defaultAlgorithm
						: theme.darkAlgorithm,
			}}
		>
			<ToDoLayout themeMode={themeMode} setThemeMode={changeThemeMode}>
				{children}
			</ToDoLayout>
		</ConfigProvider>
	);
};

export default ThemeLayout;
