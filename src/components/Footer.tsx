import { NavLink } from "react-router-dom";

export const Footer = () => {
	return (
		<footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
				© 2023 React Query Site
			</span>
			<nav>
				<ul className="flex flex-wrap gap-3 items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
					<li>
						<NavLink to="/welcome">Welcome</NavLink>
					</li>
					<li>
						<NavLink to="/flashcards">Flashcards</NavLink>
					</li>
					<li>
						<NavLink to="/blog">Blog</NavLink>
					</li>
				</ul>
			</nav>
		</footer>
	);
};
