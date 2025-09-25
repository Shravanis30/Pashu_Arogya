// src/data/mockReportsData.js

// Mock data structured by authority level
const mockReportsData = {
    central: {
        summary: "National-level data showing State-wise performance metrics and compliance trends.",
        dataLabel: "States",
        regions: [
            { name: "Maharashtra", amrScore: 8.5, compliance: 94.2, pendingVets: 30 },
            { name: "Gujarat", amrScore: 7.9, compliance: 88.1, pendingVets: 15 },
            { name: "Punjab", amrScore: 9.1, compliance: 96.5, pendingVets: 5 },
            { name: "Karnataka", amrScore: 7.5, compliance: 85.0, pendingVets: 45 },
        ]
    },
    state: {
        summary: "District-level data within the state jurisdiction, focusing on localized risk and compliance.",
        dataLabel: "Districts",
        regions: [
            { name: "Pune", amrScore: 8.8, compliance: 95.0, pendingVets: 12 },
            { name: "Nashik", amrScore: 7.2, compliance: 89.2, pendingVets: 8 },
            { name: "Kolhapur", amrScore: 9.5, compliance: 98.1, pendingVets: 3 },
            { name: "Satara", amrScore: 6.5, compliance: 82.0, pendingVets: 15 },
        ]
    },
    district: {
        summary: "Local-level data showing village and farm performance metrics for targeted intervention.",
        dataLabel: "Villages/Cities",
        regions: [
            { name: "Talegaon City", amrScore: 7.0, compliance: 90.0, pendingVets: 1 },
            { name: "Hinjewadi Area", amrScore: 6.2, compliance: 78.5, pendingVets: 4 },
            { name: "Manchar Village", amrScore: 9.9, compliance: 99.0, pendingVets: 0 },
            { name: "Shirur Block", amrScore: 8.1, compliance: 92.5, pendingVets: 2 },
        ]
    }
};

// Export a function that filters data based on the authority level
export const getReportData = (level) => {
    return mockReportsData[level] || mockReportsData.central;
};