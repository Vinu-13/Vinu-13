import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Test2.css';



const Test2 = () => {

    // Declaration of variable 
    const [userData, getuserData] = useState([]);
    const [gettemp, settemp] = useState([]);
    const [filteruserData, filtergetuserData] = useState({});
    const [isError, setError] = useState("")


    useEffect(() => {

        // axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
        axios.get('data/userdata.json').then((res) => {
            console.log(res['data'])
            getuserData(res['data']);
            settemp(res['data'])
        }).catch((e) => {

        })
    }, []);


    // method to handle input
    const HandleInput = (e) => {
        let value = e.target.value;
        // search based on input name [title]
        let temp = userData.filter((res) => {
            return res.title.toLowerCase().includes(value.toLowerCase())
        })
        getuserData(temp);
        if (value === "") {
            getuserData(gettemp);

        }

        if (value !== temp) {
            return setError("No records found")
        }

    }

    // method to handle selected item in the list 

    const HandleSelection = (id, e) => {
        console.log("id", id);
        let temp = userData.find((resp) => {
            return resp.id === id;
        });
        console.log("tempppp", temp)
        filtergetuserData(temp);
    }



    // method to handle delete operation
    const HandleDelete = (e, id) => {
        e.stopPropagation();
        let temp = userData.filter((res) => {
            return res.id !== id;
        });
        getuserData(temp);

    }


    return (
        <div class="flex-container">
            <div class="flex-left">
                <div class="search">
                    <span class="fa fa-search"></span>
                    <input placeholder="Search..." onChange={HandleInput}/>
                </div>
                {/* <input type="text" onChange={HandleInput} /> */}
                <div className="flex-center">
                    {userData.length > 0 ? (
                        userData?.map((resp, i) => {
                            return (<div key={i} className="contents list" >
                                <div>
                                    <i class="fa fa-trash" style={{ float: 'right' }} onClick={(e) => HandleDelete(e, resp.id)}></i>
                                    {/* <button className="delete" onClick={(e) => HandleDelete(e, resp.id)}>DELETE</button> */}
                                </div>
                                <ul id="menulist">
                                    <li className="menuitems"   onClick={(e) => HandleSelection(resp.id, e)}><a>{resp.title}</a></li>
                                </ul>
                            </div>)
                        })
                    ) : (
                        <div  style={{ fontSize: '12px', fontFamily: 'serif', justifyContent: 'center', alignItems:'center', marginTop: '20px' }}>
                            No results found
                        </div>
                    )}
                </div>
            </div>
            <div class="flex-right right-content">
                {filteruserData?.body}
            </div>
        </div>
    )
}



export default Test2;