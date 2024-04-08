export type Course = {
    courseId: string;
    instructorName: string;
    courseName: string;
    tags: string[];
    students: {
        name: string;
    }[]
}

export type CourseData = {
    courses: Course[];
};

export type tags = {
    tags: string[];
}

export type obj = {
    name: string;
}