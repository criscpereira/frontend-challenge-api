import React, { useEffect, useState } from "react";
import axios from "axios";

import {Container, Card, Row} from 'react-bootstrap'; 
import { Link } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';  

import Footer from '../Footer/Index'
import Header from '../Header/Index'
import '../App.css';
import './blog.css';

function Home() { 
    const [posts, setPosts] = useState([]);

    /* GET INFO POSTS */

    const fetchData = () => {
        return axios.get("http://localhost:9000/posts")
              .then((response) => setPosts(response.data));
      }
    
      useEffect(() => {
        fetchData();
    },[])
  
    return (
      <>
        <Header link_image = "../header2.jpg"/>

        <Container className="text-center">
            <h1 className="primary-title my-5">O meu Blog</h1>
        </Container>
        
        <Container>  
            <Row className="justify-content-center">  
                { 
                posts && posts.length > 0 && posts.slice(0).reverse().map((v) => (
                    <Card key={v.id} className="mx-2 my-2 col-3 card-effect">
                        <Card.Body>
                            <Card.Title><h2>{v.title}</h2></Card.Title>
                            <p><small>{v.publish_date}</small></p>
                            <Card.Text>{v.description}</Card.Text>
                            <p><small>{v.author}</small></p>
                  
                            <Container className="w-100">
                                <Link className="btn btn-info float-end" to={`/detail/${v.id}`}>More Detail</Link>
                            </Container>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
        </Container>
            
       <Footer />
      </>
    );
  }
  
  export default Home;