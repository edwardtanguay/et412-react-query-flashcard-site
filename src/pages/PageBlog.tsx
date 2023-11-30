import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageBlog = () => {
	const { blogItems } = useContext(AppContext);
	return (
		<>
		<h2 className="text-xl mb-4">There are {blogItems.length} blog entries.</h2>


			{blogItems.map(blogItem => {
				return (
					<div key={blogItem.id} className="bg-slate-600 p-4 mb-4 rounded">
						<p className="text-gray-300 text-xl">{blogItem.title}</p>
						<p className="text-yellow-300 mb-2">{blogItem.when}</p>
						<p className="text-gray-200">{blogItem.body}</p>
					</div>
				)
			})}


		</>
	)
}
