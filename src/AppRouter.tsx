import App from "./App.tsx";
import { PageWelcome } from "./pages/PageWelcome.tsx";
import { PageBlog } from "./pages/PageBlog.tsx";
import { Page404 } from "./pages/Page404.tsx";
import { PageFlashcards } from "./pages/PageFlashcards.tsx";
import { Navigate, createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		errorElement: <Page404 />,
		element: <App />,
		children: [
			{
				path: "/welcome",
				element: <PageWelcome />,
			},
			{
				path: "flashcards",
				element: <PageFlashcards />,
			},
			{
				path: "blog",
				element: <PageBlog />,
			},
			{
				path: "/",
				element: <Navigate to="/welcome" replace />,
			},
		],
	},
]);
