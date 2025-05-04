import express from 'express';
import Vehicle from "../models/Vehicle.js";
import Customer from "../models/Customer.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { owner, vin, make, model } = req.body;

    if (!owner || !vin || !make || !model) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        const newVehicle = new Vehicle({
            make,
            model,
            vin,
            owner,
        });

        const savedVehicle = await newVehicle.save();

        await Customer.findByIdAndUpdate(
            owner,
            { $push: { vehicles: newVehicle._id } },
        );

        res.status(200).json({ savedVehicle });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating vehicle', error: error.message });
    }
});

export default router;