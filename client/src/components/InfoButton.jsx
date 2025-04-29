import { useState, useEffect, useRef } from "react";

function InfoButton() {
	const [showInfo, setShowInfo] = useState(false);
	const modalRef = useRef(null);

	const handleInfoClick = () => {
		setShowInfo(true);
	};

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setShowInfo(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div>
			<img
				src="/info.svg"
				alt="info"
				className="w-10 h-10 cursor-pointer"
				onClick={handleInfoClick}
			/>

			{showInfo && (
				<div
					className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-300 p-6 rounded-lg shadow-md max-w-md w-[90vw] border-black-500"
					ref={modalRef}
				>
					<h1 className="text-xl font-bold text-gray-800 mb-3">Information:</h1>
					<p className="text-gray-700 text-sm mb-2">
						You can claim your rewards once all tasks are completed.
					</p>
					<p className="text-gray-700 text-sm">
						Tasks and rewards are saved (valid) from 12:00 AM to 11:59 PM daily.
						That is, you will not have access to previous day's tasks and
						rewards.
					</p>
				</div>
			)}
		</div>
	);
}

export default InfoButton;
