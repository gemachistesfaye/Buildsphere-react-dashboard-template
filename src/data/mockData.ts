export interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  role: string;
}

export const users: User[] = [
  { 
    id: 1, 
    name: "Abebe Bikila", 
    email: "abebe.b@telecom.et", 
    status: "Active", 
    role: "Senior Engineer" 
  },
  { 
    id: 2, 
    name: "Lemlem Hailu", 
    email: "lemlem.h@fintech.et", 
    status: "Active", 
    role: "Product Manager" 
  },
  { 
    id: 3, 
    name: "Dawit Yohannes", 
    email: "dawit.y@startup.et", 
    status: "Inactive", 
    role: "UI Designer" 
  },
  { 
    id: 4, 
    name: "Makeda Gebre", 
    email: "makeda.g@agency.et", 
    status: "Active", 
    role: "Marketing Lead" 
  },
  { 
    id: 5, 
    name: "Yared Tekle", 
    email: "yared.t@ict.et", 
    status: "Inactive", 
    role: "Backend Developer" 
  },
];