import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageBlog = () => {
	const { blogItems } = useContext(AppContext);
	return (
		<p>There are {blogItems.length} blog entries.</p>
	)
}
