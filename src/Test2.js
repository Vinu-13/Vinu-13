import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Test2.css';



const Test2 = () => {

    // Declaration of variable 
    const [userData, setUserData] = useState([]);
    const [gettemp, settemp] = useState([]);
    const [filteruserData, filtersetuserData] = useState({});

  


    useEffect(() => {
        axios.get('data/userdata.json').then((res) => {
          //  console.log(res['data'])
          setUserData(res['data']);
            settemp(res['data'])
        }).catch((e) => {
            console.log('e', e)
        })
    }, []);


    // method to handle input
    const HandleInput = (e) => {
        let value = e.target.value;
        // search based on input name [title]
        let temp = userData.filter((res) => {
            return res.title.toLowerCase().includes(value.toLowerCase())
        })
        setUserData(temp);
        if (value === "") {
            setUserData(gettemp);

        }

    }

    // method to handle selected item in the list 

    const HandleSelection = (id, e) => {
        console.log("id", id);
        //  changeState({...appState,activeObjects:appState.getuserData[id]})
        //   console.log('changeState',changeState)
        let temp = userData.find((resp) => {
            return resp.id === id;
        });
      //  console.log("tempppp", temp)
        filtersetuserData(temp);
        console.log("filteruserData", filteruserData)
    }



    // method to handle delete operation
    const HandleDelete = (e, id) => {
        e.stopPropagation();
        let temp = userData.filter((res) => {
            return res.id !== id;
        });
        // alert('sure you want to delete')
        filtersetuserData({});
        setUserData(temp);

    }

   

    return (

        <div class="flex-container">
            <div class="flex-left">
                <div class="search">
                    <span class="fa fa-search"></span>
                    <input placeholder="Search..." onChange={HandleInput} />
                </div>
             
                <div className="flex-center">
                    {userData.length > 0 ? (
                        userData?.map((resp, i) => {
                            return (<div key={i} className="contents list" >
                                <div>
                                    <i class="fa fa-trash" style={{ float: 'right' }}
                                        // delete button with js confirm box
                                        onClick={(e) => {
                                            if (window.confirm("Delete the user with id " + resp.id)) {
                                                HandleDelete(e, resp.id)
                                            }
                                        }
                                        }>

                                    </i>
                                </div>
                                <ul id="menulist">
                                    <li className="menuitems" onClick={(e) => HandleSelection(resp.id, e)}><a>{resp.title}</a></li>
                                </ul>
                            </div>)
                        })
                    ) : (
                        <div style={{ fontSize: '12px', fontFamily: 'serif', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                            No results found
                        </div>
                    )}
                </div>
            </div>
           {/* to display user details */}
            <div class="flex-right right-content">
                {
                    Object.entries(filteruserData).map(([key, val]) =>
                        <h2 key={key}>{key}: {val}</h2>
                    )
                }
                
            </div>
        </div>
    )
}



export default Test2;