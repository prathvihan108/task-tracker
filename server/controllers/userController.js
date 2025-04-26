import User from "../models/User.js";

export const createUser = async (req, res) => {
	try {
		const { uid, name, email, photoURL } = req.body;
		console.log("uid: ", uid);

		let user = await User.findOne({ uid });

		if (!user) {
			user = new User({
				uid,
				name,
				email,
				photoURL,
			});

			await user.save();
			//console.log("user in backend and db saved:", user);
			return res
				.status(201)
				.json({ message: "User created successfully", user });
		} else {
			//console.log("user in backend and db saved (else):", user);
			return res.status(200).json({ message: "User already exists", user });
		}
	} catch (error) {
		console.error("Error creating user:", error);
		res.status(500).json({ message: "Error creating or fetching user" });
	}
};

export const getUser = async (req, res) => {
	try {
		const { uid } = req.params;

		const user = await User.findOne({ uid });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).json({ message: "Error fetching user" });
	}
};

export const updateUser = async (req, res) => {
	try {
		const { uid } = req.params;
		const { name, email, photoURL } = req.body;

		const user = await User.findOne({ uid });

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		user.name = name || user.name;
		user.email = email || user.email;
		user.photoURL = photoURL || user.photoURL;

		await user.save();

		res.status(200).json({ message: "User updated successfully", user });
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Error updating user" });
	}
};
