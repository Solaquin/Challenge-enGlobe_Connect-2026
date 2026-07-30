import * as LaunchModel from "../models/launchModel.js";

export function getAllLaunches(req, res) {

    try {

        const filters = {

            market: req.query.market,
            status: req.query.status,
            release_date: req.query.release_date,
            search: req.query.search

        };

        const launches = LaunchModel.getLaunches(filters);

        res.status(200).json({

            success: true,
            data: launches

        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({

            success:false,
            message:"Internal server error"

        });

    }

}

export function getLaunchById(req, res) {

    try{
        const launch = LaunchModel.getLaunchById(req.params.id);

        if (!launch) {
            return res.status(404).json({
                message: "Launch not found"
            });
        }
        
        res.json(launch);
    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export function createLaunch(req, res) {

    try {

        const launch = 
        {
            ...req.body,

            status: 'draft',

            created_by: req.user.id

        };

        const id = LaunchModel.createLaunch(launch);

        res.status(201).json({
            message: "Launch created successfully",
            id: id
        });
    } catch(error){
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
}

export function updateLaunch(req,res){

    try{

        const launch = LaunchModel.getLaunchById(req.params.id);

        if (launch.created_by !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "You can only modify your own launches"

            });

        }  


        const result = LaunchModel.updateLaunch(

            req.params.id,
            req.body

        );

        if(result.changes === 0){

            return res.status(404).json({

                message:"Launch not found"

            });

        }

        res.json({

            message:"Launch updated"

        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Internal server error"

        });

    }

}

export function deleteLaunch(req,res){

    try{

        const launch = LaunchModel.getLaunchById(req.params.id);

        if (launch.created_by !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "You can only modify your own launches"

            });

        }   


        const result = LaunchModel.deleteLaunch(req.params.id);

        if(result.changes === 0){

            return res.status(404).json({

                message:"Launch not found"

            });

        }

        res.json({

            message:"Launch deleted"

        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({

            message:"Internal server error"

        });

    }

}


export function updateLaunchStatus(req, res) {

    try {

        const launch = LaunchModel.getLaunchById(req.params.id);

        if (!launch) {

            return res.status(404).json({
                success: false,
                message: "Launch not found"
            });

        }

        const { status } = req.body;

        const transitions = {

            draft: ["review"],
            review: ["approved"],
            approved: ["published"],
            published: []

        };

        console.log("Estado actual:", launch.status);
        console.log("Nuevo estado:", status);
        console.log("Transiciones:", transitions[launch.status]);

        if (!transitions[launch.status].includes(status)) {

            return res.status(400).json({

                success: false,
                message: "Invalid status transition"

            });

        }


        if (
            launch.status === "draft" &&
            status === "review" &&
            req.user.role !== "creator"
        ) {
        
            return res.status(403).json({
                success: false,
                message: "Only creators can submit launches for review."
            });
        
        }

        if (
            (
                launch.status === "review" &&
                status === "approved"
            ) ||
            (
                launch.status === "approved" &&
                status === "published"
            )
        ) {
        
            if (req.user.role !== "approver") {
            
                return res.status(403).json({
                    success: false,
                    message: "Only approvers can perform this action."
                });
            
            }
        
        }

        LaunchModel.updateLaunchStatus(

            launch.id,
            status

        );

        res.json({

            success: true,
            message: "Status updated"

        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal server error"

        });

    }

}