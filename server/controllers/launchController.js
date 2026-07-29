import * as LaunchModel from "../models/launchModel.js";

export function getAllLaunches(req, res) {

    try {

        const launches = LaunchModel.getAllLaunches();

        launches.forEach(launch => {

            launch.assets = launch.assets
                ? JSON.parse(launch.assets)
                : [];

        });

        res.status(200).json(launches);

    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message: "Internal server error"
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

        launch.assets = launch.assets
            ? JSON.parse(launch.assets)
            : [];
        
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

            created_by: 1

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