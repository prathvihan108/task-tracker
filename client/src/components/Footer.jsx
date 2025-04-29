import React from "react";

function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-1 rounded-t-2xl shadow-md">
			<div className="max-w-5xl mx-auto px-4 flex flex-row md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
				<div className="flex items-center space-x-2">
					<span>
						<img src="/meLogo.png" alt="meLogo" className="w-9 h-9" />
					</span>
					<p className="text-base md:text-lg font-semibold">Prathvihan</p>
				</div>

				<div className="flex flex-row md:flex-row space-x-2 md:space-y-0 md:space-x-6 items-center">
					<a
						href="mailto:prathvioct09@gmail.com"
						className="hover:text-blue-400 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						Gmail
					</a>
					<a
						href="https://github.com/prathvihan108"
						className="hover:text-blue-400 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						GitHub
					</a>
					<a
						href="https://www.linkedin.com/in/prathvirajh"
						className="hover:text-blue-400 transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						LinkedIn
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
