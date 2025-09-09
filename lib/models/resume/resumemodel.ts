import mongoose, { Document } from "mongoose";

export interface ResumeProfileBaseModel{
    firstName: string;
    lastName: string;
    about: string;
    experience: {
        id: string;
        companyName: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string;
        isPresent: boolean
    }[];
    skill: {
        id: string;
        name: string;
        skillId:string;
        rate: string;
        rateId: string;
    }[];
    education: {
        id: string;
        schoolName: string;
        degree: string;
        startDate: string;
        endDate: string;
        description: string;
        isPresent: boolean
    }[];
    certificate: {
        id: string;
        name: string;
        organization: string;
        date: string;
        description: string
    }[];
    userId?:string;
}

export interface GetResumeProfileModel extends ResumeProfileBaseModel, Document{
    _id: string;
} 

const resumeProfileSchema = new mongoose.Schema<ResumeProfileBaseModel>({
    userId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    experience: [{
        id: {
            type: String,
        },
        companyName: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
        },
        description: {
            type: String,
            required: true
        },
        isPresent: {
            type: Boolean
        }
    }],
    skill: [{
        id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        skillId: {
            type: String,
            required: true
        },
        rate: {
            type: String,
            required: true
        },
        rateId: {
            type: String,
            required: true
        },
    }],
    education: [{
        id: {
            type: String,
        },
        schoolName: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
        },
        description: {
            type: String,
            required: true
        },
        isPresent: {
            type: Boolean
        }
    }],
    certificate: [{
        id: {
            type: String,
        },
        name: {
            type: String,
        },
        organization: {
            type: String,
        },
        date: {
            type: Date,
        },
        description: {
            type: String,
        },
    }],
})

const Resume = mongoose.models.Resumes || mongoose.model("Resumes", resumeProfileSchema)

export default Resume