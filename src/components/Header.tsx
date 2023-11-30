import { Nav } from "./Nav";

export const Header = () => {
	return (
		<header>
			<h1 className="text-3xl mb-3 text-slate-800">Flashcard Site</h1>
			<Nav/>
		</header>
	);
};
