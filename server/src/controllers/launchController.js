import fs from "fs-extra";
import path from "path";

import * as LaunchModel from "../models/launchModel.js";

export function getAllLaunches(req, res) {

    try {

        const filters = {

            market: req.query.market,
            status: req.query.status,
            release_date: req.query.release_date,
            search: req.query.search,

            month: req.query.month,
            year: req.query.year
        };

        const launches = LaunchModel.getLaunches(filters, req.user);

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

        if (launch.status === "draft") {

            if (req.user.role === "approver") {
            
                return res.status(403).json({
                
                    success: false,
                    message: "You don't have permission to access this launch."
                
                });
            
            }
        
            if (launch.created_by !== req.user.id) {
            
                return res.status(403).json({
                
                    success: false,
                    message: "You don't have permission to access this launch."
                
                });

    }

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
        
        if (!launch) {

            return res.status(404).json({

                success: false,
                message: "Launch not found"

            });

        }

        if (launch.created_by !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "You can only modify your own launches"

            });

        }  

        if (launch.status !== "draft") {

            return res.status(403).json({

                success: false,
                message: "Only draft launches can be edited."

            });

        }

        const result = LaunchModel.updateLaunch(

            req.params.id,
            req.body

        );

        res.json({

            success: true,
            message: "Launch updated."

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

        if (!launch) {

            return res.status(404).json({

                success: false,
                message: "Launch not found."

            });

        }

        if (launch.created_by !== req.user.id) {

            return res.status(403).json({

                success: false,

                message: "You can only delete your own launches"

            });

        }   

        if (launch.status !== "draft") {

            return res.status(403).json({

                success: false,
                message: "Only draft launches can be deleted."

            });

        }

        const result = LaunchModel.deleteLaunch(req.params.id);

        if(result.changes === 0){

            return res.status(404).json({

                success: false,
                message: "Launch not found."

            });

        }

        const launchFolder = path.join(
            "uploads",
            "launches",
            req.params.id
        );

        fs.remove(launchFolder);

        res.status(200).json({

            success: true,
            message: "Launch deleted successfully."

        });

    }
    catch(error){

        console.error(error);

        res.status(500).json({

            success: false,
            message: "Internal server error."

        });

    }

}


export function updateLaunchStatus(req, res) {

    const validStatuses = [
        "draft",
        "review",
        "approved",
        "published"
    ];
    
    try {

        const launch = LaunchModel.getLaunchById(req.params.id);

        if (!launch) {

            return res.status(404).json({
                success: false,
                message: "Launch not found"
            });

        }

        const { status } = req.body;

        if (!validStatuses.includes(status)) {

            return res.status(400).json({
            
                success: false,
                message: "Invalid status."
            
            });
        
        }

        const transitions = {

            draft: ["review"],
            review: ["approved"],
            approved: ["published"],
            published: []

        };

        if (!transitions[launch.status].includes(status)) {

            return res.status(400).json({

                success: false,
                message: "Invalid status transition"

            });

        }


        if (
            launch.status === "draft" &&
            status === "review"
        ) {
        
            if (req.user.role !== "creator") {
            
                return res.status(403).json({
                    success: false,
                    message: "Only creators can submit launches for review."
                });
            
            }
        
            if (launch.created_by !== req.user.id) {
            
                return res.status(403).json({
                    success: false,
                    message: "You can only submit your own launches."
                });
            
            }
        
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

        LaunchModel.updateLaunchStatusWithHistory(
            {
                launchId: req.params.id,
                previousStatus: launch.status,
                newStatus: status,
                changedBy: req.user.id
            }
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