import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import { router } from "./AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "./AppContext";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 3000,
			staleTime: 3000,
			gcTime: 5000,
			refetchOnWindowFocus: false,
			refetchOnMount: true,
			retry: 2,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")!).render(
	<AppProvider>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
			{/* <ReactQueryDevtools /> */}
		</QueryClientProvider>
	</AppProvider>
);
