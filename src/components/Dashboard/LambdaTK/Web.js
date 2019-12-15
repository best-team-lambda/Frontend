import React, {useState, useEffect} from "react";
import axiosWithAuth from "../../../utils/axiosWithAuth"

import SearchForm from "./SearchForm"

import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";


const StyledLoader = styled(LoadingOverlay)`
    min-height: 100vh;
    width:100%;
`;


const Web = () => {
    const [loading, setLoading] = useState('');
    const [course, setCourse] = useState(null);

    useEffect(() => {
      setLoading(true);
      axiosWithAuth()
      .get("/courses")
      .then(response => {
        console.log("course data",response)
        setCourse(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log("error retrieving data!!", error);
        setLoading(false);
      })
    }, []);

    if (course === null) {
        return (
            <div>
                 <StyledLoader active={loading} spinner text='Loading...'/>
            </div>
        );
    }
    return (
        <div> 
            <h2>List of all Web Development Course Questions(when endpoint)</h2>
            <div>
                <p>{course.name}</p>
                <p>{course.description}</p>
            </div>
        </div>
    )
}



export default Web;
