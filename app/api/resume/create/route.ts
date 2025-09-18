import { connectToMongoDB } from "@/lib/db";
import Resume, { ResumeProfileBaseModel } from "@/lib/models/resume/resumemodel";
import User from "@/lib/models/users/usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        await connectToMongoDB();

        const data = await req.json()
        const { userId } = data

        const resumeExist = await Resume.findOne({ userId })

        if(resumeExist){
            return new NextResponse(
                JSON.stringify({ message: `Your resume profile is already in existence.` }),
                {
                status: 400,
                }
            );
        }

        const finalData: ResumeProfileBaseModel = {
            ...data,
            experience: data.experience.map(item => ({
                ...item, endDate: item.endDate ? item.endDate : new Date(0)
            })),
            education: data.education.map(item => ({
                ...item, endDate: item.endDate ? item.endDate : new Date(0)
            })),
        }

        await Resume.create(finalData)

        await User.findByIdAndUpdate(userId, { 
            is_resume_created: true, 
            name: {
                first: data.firstName, last: data.lastName
            }
        })

        return new NextResponse(JSON.stringify({
            message: `Your resume has been successfully created.`
        }), { status: 200 })
    } catch (error){
        console.log(error)
        return new NextResponse(JSON.stringify({
            message: "Internal Server Error"
        }), { status: 500 })
    }
}