import React, { lazy, ReactNode } from "react";
import { Layout, theme } from "antd";
import Title from "antd/es/typography/Title";
import { ThemeMode } from "./Theme";

const MoonOutlined = lazy(() => import("@ant-design/icons/MoonOutlined"));
const SunOutlined = lazy(() => import("@ant-design/icons/SunOutlined"));

const { Header, Content } = Layout;

interface ToDoLayoutProps {
	children: ReactNode;
	themeMode: ThemeMode;
	setThemeMode: (themeMode: ThemeMode) => void;
}

const HeaderComponent = ({
	children,
	themeMode,
}: {
	children: ReactNode;
	themeMode: "light" | "dark";
}) => {
	const headerColor = themeMode === "light" ? "#008080" : "#774898";

	return (
		<Header
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				paddingInline: "1rem",
				backgroundColor: headerColor,
			}}
		>
			{children}
		</Header>
	);
};

const ToDoLayout: React.FC<ToDoLayoutProps> = ({
	themeMode,
	setThemeMode,
	children,
}) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ height: "100vh" }}>
			<HeaderComponent themeMode={themeMode}>
				<Title level={3}>To-Do</Title>
				<div
					onClick={() =>
						setThemeMode(themeMode === "light" ? "dark" : "light")
					}
				>
					{themeMode === "dark" ? (
						<MoonOutlined className="text-xl text-blue-200" />
					) : (
						<SunOutlined className="text-xl text-yellow-500" />
					)}
				</div>
			</HeaderComponent>

			<Content>
				<div
					style={{
						background: colorBgContainer,
						minHeight: "100%",
						padding: 24,
					}}
					className="flex justify-center"
				>
					<div
						style={{
							width: "100%",
							maxWidth: "800px",
						}}
					>
						{children}
					</div>
				</div>
			</Content>
		</Layout>
	);
};

export default ToDoLayout;
