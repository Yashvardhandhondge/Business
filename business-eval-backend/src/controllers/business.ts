import { Request, Response } from "express";
import httpStatus from "http-status";
import businessService from "../services/business";
import catchAsync from "../utils/catchAsync";

export const createBusiness = catchAsync(async (req: Request, res: Response) => {
    const newBusiness = await businessService.createBusiness(req.body);
    res.status(httpStatus.CREATED).json({newBusiness});
});

export const updateBusiness = catchAsync(async (req: Request, res: Response) => {
    const updatedBusiness = await businessService.updateBusiness(req.params.id, req.body);
    res.status(httpStatus.OK).json({updatedBusiness});
});

export const getBusinessById = catchAsync(async (req: Request, res: Response) => {
    const business = await businessService.getBusinessById(req.params.id);
    res.status(httpStatus.OK).json({business});
});

export const getAllBusiness = catchAsync(async (req: any, res: Response) => {
    const businesses = await businessService.getAllBusinessMetrics(req.user._id);
    res.status(httpStatus.OK).json({businesses});
});

export const deleteBusiness = catchAsync(async (req: Request, res: Response) => {
    const deletedBusiness = await businessService.deleteBusiness(req.params.id);
    res.status(httpStatus.OK).json({deletedBusiness});
});

export const addNewMetric = catchAsync(async (req: Request, res: Response) => {
    const newMetric = await businessService.addNewMetric(req.params.id, req.body);
    res.status(httpStatus.OK).json({newMetric});
});

export const updateMetric = catchAsync(async (req: Request, res: Response) => {
    const updatedMetric = await businessService.updateMetric(req.params.id, req.body);
    res.status(httpStatus.OK).json({updatedMetric});
});
    
export const deleteMetric = catchAsync(async (req: Request, res: Response) => {
    const deletedMetric = await businessService.deleteMetric(req.params.id, req.body);
    res.status(httpStatus.OK).json({deletedMetric});
});