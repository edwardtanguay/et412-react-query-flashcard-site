import { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
import { IBlogItem } from "./interfaces";
import * as config from './config';

interface IAppContext {
	blogItems: IBlogItem[]
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
			const _blogItems = response.data;
			console.log('blogitesm', _blogItems);
			setBlogItems(_blogItems);
		})();
	}, []);

	return (
		<AppContext.Provider
			value={{
				blogItems
			}}
		>
			{children}
		</AppContext.Provider>
	);
};