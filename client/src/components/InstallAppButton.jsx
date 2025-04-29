import { useEffect, useState } from "react";

function InstallAppButton() {
	const [deferredPrompt, setDeferredPrompt] = useState(null);

	useEffect(() => {
		const handler = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
		};
		window.addEventListener("beforeinstallprompt", handler);

		return () => {
			window.removeEventListener("beforeinstallprompt", handler);
		};
	}, []);

	const handleInstallClick = async () => {
		if (!deferredPrompt) return;
		deferredPrompt.prompt();

		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === "accepted") {
			console.log("User accepted the install prompt");
		} else {
			console.log("User dismissed the install prompt");
		}
		setDeferredPrompt(null);
	};

	return (
		<span className="inline-block m-2">
			<button
				className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
				onClick={handleInstallClick}
			>
				<img src="/installLogo.svg" className="w-6 h-6" alt="Google logo" />
				Install App (Recommended)
			</button>
		</span>
	);
}

export default InstallAppButton;
