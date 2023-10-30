import EmailVerificationToken from "@/app/models/emailVerificationToken";
import UserModel from "@/app/models/userModel";
import { EmailVerifyRequest } from "@/app/types";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { token, userId } = await req.json() as EmailVerifyRequest;
        if (!isValidObjectId(userId) || !token) {
            return NextResponse.json(
                { error: "Invalid request, userId and token are required!" },
                { status: 401 }
            );
        }
    
        const verifyToken =  await EmailVerificationToken.findOne({user:userId})
        if (!verifyToken) {
            return NextResponse.json(
                { error: "Invalid token!" }, 
                { status: 401 }
            );
        }
    
        const isMatched = await verifyToken.compareToken(token)
        if (!isMatched) {
            return NextResponse.json(
                { error: "Invalid token, token doesn't match!" }, 
                { status: 401 }
            );
        }
    
        await UserModel.findByIdAndUpdate(userId, { verified: true });
        await EmailVerificationToken.findByIdAndDelete(verifyToken._id);
    
        return NextResponse.json({message: "Your email has been verified!"})
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong, please try again later!"},
            { status: 500 }
        );
    }
};
