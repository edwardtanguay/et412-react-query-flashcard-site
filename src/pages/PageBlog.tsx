import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageBlog = () => {
	const { blogItems } = useContext(AppContext);
	return (
		<>
			<h2 className="text-xl mb-4">
				There are {blogItems.length} blog entries.
			</h2>

			<form className="mt border p-4 rounded w-80 mb-4 pb-0">
				<div className="mb-4 flex gap-2 items-center">
					<label htmlFor="title" className="text-xl pb-1">
						Title:
					</label>
					<input name="title" id="title" type="text" />
				</div>
				<div className="mb-4 flex gap-2 items-center">
					<textarea className="w-full h-32"></textarea>
				</div>
				<button className="mb-4  ">Post Entry</button>
			</form>

			{blogItems.map((blogItem) => {
				return (
					<div
						key={blogItem.id}
						className="bg-slate-600 p-4 mb-4 rounded"
					>
						<p className="text-gray-100 text-xl">
							{blogItem.title}
						</p>
						<p className="text-yellow-300 mb-2">{blogItem.when}</p>
						<p className="text-gray-200">{blogItem.body}</p>
					</div>
				);
			})}
		</>
	);
};
