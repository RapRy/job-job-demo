export interface ResumeProfileModel{
    firstName: string;
    lastName: string;
    about: string;
    experience: {
        id: string;
        companyName: string;
        position: string;
        startDate: string;
        endDate: string;
        description: string
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
        description: string
    }[];
    certificate: {
        id: string;
        name: string;
        organization: string;
        date: string;
        description: string
    }[];
}