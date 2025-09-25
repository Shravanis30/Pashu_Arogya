// src/data/mockReportsData.js

const mockReportsData = {
    central: {
        summary: "National-level data showing State-wise performance metrics and compliance trends. This view reflects aggregated data across all state jurisdictions.",
        dataLabel: "State",
        regions: [
            { name: "Maharashtra", amrScore: 85, compliance: 94.2, pendingVets: 30, totalVets: 1560, inspectionRate: 98, totalCases: 12000, violationCount: 23 },
            { name: "Gujarat", amrScore: 78, compliance: 88.1, pendingVets: 15, totalVets: 1100, inspectionRate: 95, totalCases: 9500, violationCount: 18 },
            { name: "Punjab", amrScore: 91, compliance: 96.5, pendingVets: 5, totalVets: 900, inspectionRate: 99, totalCases: 7000, violationCount: 5 },
            { name: "Karnataka", amrScore: 75, compliance: 85.0, pendingVets: 45, totalVets: 1800, inspectionRate: 90, totalCases: 15000, violationCount: 35 },
        ]
    },
    state: {
        summary: "District-level data within the state jurisdiction, focusing on localized risk and compliance. This view is filtered to show only data relevant to your state.",
        dataLabel: "District",
        regions: [
            { name: "Pune", amrScore: 88, compliance: 95.0, pendingVets: 12, totalVets: 350, inspectionRate: 99, totalCases: 4000, violationCount: 12 },
            { name: "Nashik", amrScore: 72, compliance: 89.2, pendingVets: 8, totalVets: 280, inspectionRate: 90, totalCases: 3500, violationCount: 8 },
            { name: "Kolhapur", amrScore: 95, compliance: 98.1, pendingVets: 3, totalVets: 150, inspectionRate: 98, totalCases: 1500, violationCount: 2 },
            { name: "Satara", amrScore: 65, compliance: 82.0, pendingVets: 15, totalVets: 400, inspectionRate: 85, totalCases: 5000, violationCount: 15 },
        ]
    },
    district: {
        summary: "Local-level data showing village and farm performance metrics for targeted intervention. This provides a granular view for field operations.",
        dataLabel: "Village/City",
        regions: [
            { name: "Talegaon City", amrScore: 70, compliance: 90.0, pendingVets: 1, totalVets: 50, inspectionRate: 95, totalCases: 500, violationCount: 1 },
            { name: "Hinjewadi Area", amrScore: 62, compliance: 78.5, pendingVets: 4, totalVets: 120, inspectionRate: 88, totalCases: 800, violationCount: 4 },
            { name: "Manchar Village", amrScore: 99, compliance: 99.0, pendingVets: 0, totalVets: 20, inspectionRate: 100, totalCases: 100, violationCount: 0 },
            { name: "Shirur Block", amrScore: 81, compliance: 92.5, pendingVets: 2, totalVets: 80, inspectionRate: 90, totalCases: 600, violationCount: 2 },
        ]
    }
};

export const getReportData = (level) => {
    return mockReportsData[level] || mockReportsData.central;
};