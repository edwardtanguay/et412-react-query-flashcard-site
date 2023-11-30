import { useContext } from "react";
import { AppContext } from "../AppContext";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencil } from "react-icons/fa6";
import React from "react";

export const PageBlog = () => {
	const {
		blogItems,
		handleAddBlogItem,
		handleDeleteBlogItem,
		handleToggleBlogItemEditStatus,
	} = useContext(AppContext);

	return (
		<>
			<h2 className="text-xl mb-4">
				There are {blogItems.length} blog entries.
			</h2>

			<form
				onSubmit={handleAddBlogItem}
				className="mt border p-4 rounded w-80 mb-4 pb-0"
			>
				<div className="mb-4 flex gap-2 items-center">
					<label htmlFor="title" className="text-xl pb-1">
						Title:
					</label>
					<input
						className="w-full"
						name="title"
						id="title"
						type="text"
					/>
				</div>
				<div className="mb-4 flex gap-2 items-center">
					<textarea name="body" className="w-full h-32"></textarea>
				</div>
				<div className="flex justify-end">
					<button className="mb-4">Post Entry</button>
				</div>
			</form>

			{blogItems.map((blogItem) => {
				return (
					<React.Fragment key={blogItem.id}>
						<div className="bg-slate-600 p-4 mb-4 rounded">
							{blogItem.editingStatus === "showing" && (
								<>
									<p className="text-gray-100 text-xl">
										{blogItem.title}
									</p>
									<p className="text-yellow-300 mb-2">
										{blogItem.when}
									</p>
									<p className="text-gray-200 mb-4">
										{blogItem.body}
									</p>
									<div className="flex gap-3">
										<RiDeleteBin6Line
											className="text-xl cursor-pointer"
											onClick={() =>
												handleDeleteBlogItem(blogItem)
											}
										/>
										<FaPencil
											onClick={() =>
												handleToggleBlogItemEditStatus(
													blogItem
												)
											}
											className="mt-[.1rem] cursor-pointer"
										/>
									</div>
								</>
							)}
							{blogItem.editingStatus === "editing" && (
								<form
									onSubmit={handleAddBlogItem}
									className="mt border p-4 rounded w-80 mb-4 pb-0"
								>
									<div className="mb-4 flex gap-2 items-center">
										<label
											htmlFor="title"
											className="text-xl pb-1"
										>
											Title:
										</label>
										<input
											className="w-full"
											name="title"
											id="title"
											type="text"
										/>
									</div>
									<div className="mb-4 flex gap-2 items-center">
										<textarea
											name="body"
											className="w-full h-32"
										></textarea>
									</div>
									<div className="flex justify-end gap-3">
										<button
											className="mb-4"
											onClick={() =>
												handleToggleBlogItemEditStatus(
													blogItem
												)
											}
										>
											Cancel
										</button>
										<button className="mb-4">Save</button>
									</div>
								</form>
							)}
						</div>
					</React.Fragment>
				);
			})}
		</>
	);
};
