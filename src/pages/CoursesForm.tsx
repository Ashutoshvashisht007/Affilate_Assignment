import React, { useEffect, useState } from 'react'
import { Course, CourseData, obj, tags } from '../utils/api_types';
import { Autocomplete, TextField } from '@mui/material';
import "/src/pages/courses.css";

const CoursesForm = () => {

    const [data, setData] = useState<CourseData | null>(null);
    // const [tagsOptions,setTagsOption] = useState<tags | null>();
    const [courseName, setCourseName] = useState<string | null>("");
    const [profName, setProfName] = useState<string | null>("");
    const [tags, setTags] = useState<string[]>([]);
    const [students, setStudents] = useState<obj[]>([]);
    const options: string[] = [];
    // const tagsOptions: string[] = [];
    const [values, setValues] = useState<string[]>([]);
    const [flag, setFlag] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json');
            const resdata: CourseData = await response.json();
            setData(resdata);
            resdata?.courses.map((e) => {
                setStudents(e.students);
            })
            const res = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json');
            const rdata: tags = await res.json();
            setValues(rdata.tags);
        };
        fetchData();
    }, []);

    const onNameChange = (event: React.SyntheticEvent<Element, Event>, values: string | null) => {
        setCourseName(values);
        // console.log(values);
    }
    const onProfChange = (event: React.SyntheticEvent<Element, Event>, values: string | null) => {
        setProfName(values);
    }
    const onTagsChange = (event: React.SyntheticEvent<Element, Event>, values: string[]) => {
        // setProfName(values);
        setTags(values);
    }

    const handleEditClick = (course: Course) => {
        setFlag(true);
        setCourseName(course.courseName);
        setProfName(course.instructorName);
        setStudents(course.students);
        setTags(course.tags);
    }

    const handleClick = () => {
        console.log(courseName);
        console.log(profName);
        console.log(tags);
        console.log(students);
        setFlag(false);
        setCourseName("");
        setProfName("");
        setTags([]);
        setStudents([]);
    }

    return (
        <>
            {data && data?.courses.map((course) => (
                <div key={course.courseId} className='CoursesformContainer'>
                    <div className='CoursesMiddle'>
                        <h1>Edit Course Details</h1>
                        <Autocomplete
                            onChange={onNameChange}
                            className='Input Fields'
                            id="free-solo-demo"
                            freeSolo
                            options={options}
                            value={course.courseName}
                            sx={{ width: "55%", height: "80px", marginBottom: "10px", marginTop: "10px" }}
                            renderInput={(params) => <TextField {...params} label="Name" />}
                        />
                        <Autocomplete
                            onChange={onProfChange}
                            disablePortal
                            id="free-solo-demo"
                            freeSolo
                            options={options}
                            value={course.instructorName}
                            sx={{ width: "55%", height: "80px", marginBottom: "10px" }}
                            renderInput={(params) => <TextField {...params} label="Instructor" />}
                        />
                        <Autocomplete
                            onChange={onTagsChange}
                            className='Multiple'
                            multiple
                            id="tags-outlined"
                            options={values}
                            sx={{ width: "55%", height: "80px", marginBottom: "10px" }}
                            getOptionLabel={(option) => option}
                            defaultValue={course.tags}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Press 'Enter' to add tag"
                                />
                            )}
                        />
                        <div className='TagsDIV'>

                            {
                                course.students.map((ele, idx) => (
                                    <span className='Tags' key={idx}>
                                        {ele.name}
                                        <button className='TagsBTN'>X</button>
                                    </span>
                                ))
                            }

                        </div>
                        <div className='updateDiv'>
                            { flag === false ? <button className='updateDivBtn' onClick={() => handleEditClick(course)}>
                                EDIT COURSE
                            </button> : <button className='updateDivBtn' onClick={handleClick}>
                                UPDATE COURSE
                            </button>
                            }
                            
                        </div>
                    </div>
                </div>
            ))
            }
        </>
    )
}

export default CoursesForm