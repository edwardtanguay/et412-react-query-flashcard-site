import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { IBlogItem } from "./interfaces";
import * as config from "./config";
import * as tools from "./tools";

interface IAppContext {
	blogItems: IBlogItem[];
	handleAddBlogItem: (e: React.FormEvent<HTMLFormElement>) => void;
	handleDeleteBlogItem: (blogItem: IBlogItem) => void;
	handleToggleBlogItemEditStatus: (blogItem: IBlogItem) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [blogItems, setBlogItems] = useState<IBlogItem[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${config.backendUrl}/blog-items`);
			const _blogItems: IBlogItem[] = response.data;
			for (const _blogItem of _blogItems) {
				_blogItem.editingStatus = "showing";
			}
			setBlogItems(_blogItems);
		})();
	}, []);

	const handleAddBlogItem = (e: React.FormEvent<HTMLFormElement>) => {
		(async () => {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const data = Object.fromEntries(
				new FormData(e.target as HTMLFormElement)
			);
			const blogItem = {
				when: tools.getCurrentDateTimeAsIso(),
				title: String(data.title),
				body: String(data.body),
			};
			try {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				};

				const response = await axios.post(
					`${config.backendUrl}/blog-items`,
					blogItem,
					{
						headers,
					}
				);

				if (response.status === 201) {
					console.log("blog item added: " + blogItem.title);
					const newBlogItem = response.data as IBlogItem;
					newBlogItem.editingStatus = 'showing';
					const _blogItems = structuredClone(blogItems);
					_blogItems.push(newBlogItem);
					setBlogItems(_blogItems);
				} else {
					console.log("error: status " + response.status);
				}
			} catch (e) {
				console.log("blog item add: error unknown");
			}
			form.reset();
		})();
	};

	const handleDeleteBlogItem = (blogItem: IBlogItem) => {
		(async () => {
			try {
				const headers = {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				};

				const response = await axios.delete(
					`${config.backendUrl}/blog-items/${blogItem.id}`,
					{
						headers,
					}
				);

				if (response.status === 200) {
					const _blogItems = blogItems.filter(
						(m) => m.id !== blogItem.id
					);
					setBlogItems(_blogItems);
				} else {
					console.log("error: status " + response.status);
				}
			} catch (e) {
				console.log("blog item add: error unknown");
			}
		})();
	};

	const handleToggleBlogItemEditStatus = (blogItem: IBlogItem) => {
		blogItem.editingStatus =
			blogItem.editingStatus === "editing" ? "showing" : "editing";
		const _blogItems = structuredClone(blogItems);
		setBlogItems(_blogItems);
	};

	return (
		<AppContext.Provider
			value={{
				blogItems,
				handleAddBlogItem,
				handleDeleteBlogItem,
				handleToggleBlogItemEditStatus,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
