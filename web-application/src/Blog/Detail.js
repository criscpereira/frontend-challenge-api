import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

import {Container, Row} from 'react-bootstrap'; 
import { useParams } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FaEdit } from 'react-icons/fa';

import Footer from '../Footer/Index'
import Header from '../Header/Index'

import '../App.css'; //CSS GERAL
import './blog.css'; //CSS BLOG PAGE

function Detail() { 
    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);

    const params = useParams();

    const data_comment = {
        "parent_id": null,
    }

    const refresh = () => window.location.reload(true)

    // ADD NEW COMMENT
    const new_comment = useRef(data_comment);
    const [, set_newComment] = useState(undefined);

    const handle_add_comment = (e) => {
        const { name, value } = e.target;
        //console.log('NAME ', name)
        //console.log('VALUE ', value)
        set_newComment(new_comment.current[name] = value)
        set_newComment(new_comment.current.date = new Date())
        console.log('Dados Current:' + JSON.stringify(new_comment))
    }

    const handleSubmit = async e => {
        
        e.preventDefault();

        let yyyy = new_comment.current.date.getFullYear();
        let mm = new_comment.current.date.getMonth() + 1;
        let dd = new_comment.current.date.getDate();
        const today = yyyy + '-' + mm + '-' + dd;

        axios.post("http://localhost:9000/posts/" + params.id + "/comments", {
            "parent_id": null,
            "user": new_comment.current.user,
            "date": today,
            "content": new_comment.current.content
          })
          .then(function (response) {
            console.log(response);
            refresh()
          })
          .catch(function (error) {
            console.error(error);
          });
    }

    // ADD NEW ANSWER
    const new_answer = useRef(data_comment);
    const [, set_newAnswer] = useState(undefined);

    const handle_add_answer = (e) => {
        const { name, value, id } = e.target;
        //console.log('NAME ', id)
        //console.log('VALUE ', value)
        set_newAnswer(new_answer.current[name] = value)
        set_newAnswer(new_answer.current.date = new Date())
        set_newAnswer(new_answer.current.parent_id = id)
        console.log('Dados Current:' + JSON.stringify(new_answer))
    }

    const handleSubmitAnswer = async e => {
        
        e.preventDefault();

        let yyyy = new_answer.current.date.getFullYear();
        let mm = new_answer.current.date.getMonth() + 1;
        let dd = new_answer.current.date.getDate();
        const today = yyyy + '-' + mm + '-' + dd;

        axios.post("http://localhost:9000/posts/" + params.id + "/comments", {
            "parent_id": parseInt(new_answer.current.parent_id),
            "user": new_answer.current.user,
            "date": today,
            "content": new_answer.current.content
          })
          .then(function (response) {
            console.log(response);
            refresh()
          })
          .catch(function (error) {
            console.error(error);
          });
    }

    // UPDATE COMMENT
    const handleUpdateComment = async (e, id_comment) => {
        
        e.preventDefault();
        comments.forEach(v => 
            v.id === id_comment ?
                axios.put("http://localhost:9000/comments/" + id_comment, {
                    ...v,
                    content: new_comment.current.content
                    
                })
                .then(function (response) {
                    console.log(response);
                    refresh()
                })
                .catch(function (error) {
                    console.error(error);
                })
            : ''
    
        )

        
    }

    // GET INFO POSTS
    useEffect(() => {
        const fetchData = () => {
            return axios.get("http://localhost:9000/posts/" + params.id)
                .then((response) => setPost(response.data));
        }
        fetchData();

        const getComments = () => {
            return axios.get("http://localhost:9000/posts/" + params.id + "/comments")
                .then((response) => setComments(response.data));
        }
        getComments()

        const addComment = () => {
            return axios.post("http://localhost:9000/posts/" + params.id + "/comments")
                .then((response) => setComments(response.data));
        }
        addComment()
    },[params])

    const [disable, setDisable] = React.useState(true);
    const [show, setShow] = useState(false);

    const hideButton = () => {
        setShow(true);
    };

    return (
      <>

        <Header link_image = "../header.jpg"/>
 
        <Container className="col-12 col-md-8 offset-md-2 mt-5">
            <h1 className="primary-title my-3 text-center">{post.title}</h1>  
            <h6 className="mt-4">{post.publish_date}</h6>
            <p>{post.description}</p>
            <p className="fw-bold">{post.author}    </p> 
        </Container>
        
        <Container className="col-12 col-md-8 offset-md-2 mt-4">  
            <Row className="col-12 col-md-6 offset-md-0 my-4"> 
                <h4 className="my-3">New comment</h4>
                <form id="form_modal" onSubmit={(e) => handleSubmit(e)}>
                    <label>Name</label>
                    <input type="text" name="user"
                        className="form-control mb-3"
                        placeholder=""
                        value={new_comment.user}
                        onChange={handle_add_comment}
                        required
                    />

                    <label>Comment*</label>
                
                    <textarea
                        style={{ height: "100px", width: "100%" }}
                        id="content"
                        className="form-control"
                        name="content"
                        maxLength="400"
                        value={new_comment.content}
                        onChange={handle_add_comment}
                        required
                    />
                    <div className="w-100">
                        <button type="submit" className="btn btn-primary mt-3 float-end">Send</button>
                    </div>
                    
                </form>
            </Row>
            
            <Row className="justify-content-center mt-5"> 
                <h4 className="my-3">Comments</h4>
                { 
                comments && comments.length > 0 && comments.map((v, index) => {
                    return(
                        <div key={index}>
                            {v.content !== undefined && v.parent_id === null ?
                            
                                    <div className="mt-4 bg-light p-3 pb-5">
                                        <form id="form_modal_answer" onSubmit={(e) => handleUpdateComment(e, v.id)}>
                                            <small className="fw-bold">{v.date}</small>
                                            <input type="text" name="user"
                                                className="form-control mb-3"
                                                placeholder={v.user}
                                                value={new_comment.user}
                                                onChange={handle_add_comment}
                                                required
                                                disabled
                                            />

                                            <textarea
                                                style={{ height: "100px", width: "100%" }}
                                                className="form-control"
                                                name="content"
                                                maxLength="400"
                                                placeholder={v.content}
                                                value={new_comment.content}
                                                onChange={handle_add_comment}
                                                required
                                                disabled={disable}
                                            />
                                            <div className="text-end mt-2">
                                                <Link disabled={disable} onClick={() => {setDisable(false); hideButton();}}>
                                                    <FaEdit />
                                                </Link>
                                                {show &&
                                                    <p><button type="submit" className="btn btn-primary mt-2 float-end">Send</button></p>
                                                }
                                            </div>
                                        </form>
                                        
                                    
                                        <h4 className="mt-3">Answers</h4>
                                        {comments.map((v2, index2) => { 
                                            return(
                                                <div key={index2}>
                                                    {v2.parent_id !== null && v2.content !== undefined ?
                                                        
                                                        v.id === v2.parent_id ? 
                                                            <div className="bg-light p-3">
                                                                <small className="fw-bold">{v2.date}</small>
                                                                <p>{v2.user}</p>
                                                                {v2.content}
                                                            </div>
                                                        : ''
                                                    : ''}
                                                </div>
                                            )}
                                        )}
                                        <form className="p-3" id="form_modal_answer" onSubmit={(e) => handleSubmitAnswer(e)}>
                                            <label>Name</label>
                                            <input type="text" name="user"
                                                className="form-control mb-3"
                                                placeholder=""
                                                value={new_answer.user}
                                                id={v.id}
                                                onChange={handle_add_answer}
                                                required
                                            />

                                            <label>Comment*</label>
                                        
                                            <textarea
                                                style={{ height: "100px", width: "100%" }}
                                                //id="content"
                                                className="form-control"
                                                name="content"
                                                maxLength="400"
                                                value={new_answer.content}
                                                id={v.id}
                                                onChange={handle_add_answer}
                                                required
                                            />
                                            <div className="w-100">
                                                <button type="submit" className="btn btn-primary mt-3 float-end">Send</button>
                                            </div>
                                            
                                        </form>

                                    </div>

                                
                            : ''}
                        </div>
                    )}
                )}
            </Row>
        </Container>

        <Footer />
       
      </>
    );
  }
  
  export default Detail;