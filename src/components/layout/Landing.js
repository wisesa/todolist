import React, {Fragment, useState, useEffect} from "react";
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import IncompleteItem from '../collection/IncompleteItem';
import CompleteItem from '../collection/CompleteItem';
import {getCollections, addCollection, deleteCollection, completeCollection, updateCollection} from '../../actions/collection';
import {Button, Modal, Form} from "react-bootstrap"

const Landing = (
    {
        getCollections, collection: {collections, loading}, addCollection, deleteCollection, completeCollection, updateCollection

    }
    ) => {
        const [show, setShow] = useState(false);
        const [title,setTitle] = useState("");
        const [description,setDescription] = useState("")
        const [status,setStatus] = useState(0)
        const [selectedId, setSelectedId] = useState("")
        const [modalType, setModalType] = useState("")
        

    useEffect(()=>{
        getCollections();
    }, [loading, getCollections]);

    const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        const handleSubmit = () => {
            const newData = {title,description,  id: collections.length + 1, status: 0}
            addCollection(newData)
            handleClose()
        }

        const handleComplete = (id) => {
            completeCollection(id)
        }

        const handleAddModal = () => {
            setModalType("Add")
            handleShow()
        }

        const handleEditModal = (id) => {
            setSelectedId(id)
            let editedData=collections.find(collection=>collection.id==id)
            setTitle(editedData.title)
            setDescription(editedData.description)
            setStatus(editedData.status)
            setModalType("Edit")
            handleShow()
            
        }

        const handleUpdate = () => {
            updateCollection(selectedId,{title,description,status})
            handleClose()
        }

        const handleDelete = (id) => {
            deleteCollection(id)
        }

    return <Fragment>
            <main id="transcroller-body" className="aos-all" >

            <section id="skills" className="about">
                <div className='stars'></div>
                
                <div className="container">
                    <div className="row d-flex justify-content-center mt-5">
                        <Button variant="primary" onClick={handleAddModal}>
                            + Add Todo List
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title style={{color:'black'}}>Modal Todo List</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.Title">
                                        <Form.Label style={{color:'black'}}>Title</Form.Label>
                                        <Form.Control type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.Description">
                                        <Form.Label style={{color:'black'}}>Description</Form.Label>
                                        <Form.Control type="text" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={modalType === "Add" ? handleSubmit : handleUpdate}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>

                        <div className="appetizers d-flex align-items-center center mt-2 padding-all-card">
                            <div className="row">
                                <div className="center col-lg-6">
                                    <h3>Incomplete Item</h3>
                                    <div className="row">
                                        {collections.sort(function(a,b){
                                        return new Date(a.createdAt) - new Date(b.createdAt);
                                        }).map((collection) => (
                                            <IncompleteItem key={collection.id} collection={collection} handleDelete={handleDelete} handleUpdate={handleEditModal} handleComplete={handleComplete} />
                                        ))}
                                    </div>
                                </div>
                                <div className="center col-lg-6">
                                    <h3>Complete Item</h3>
                                    <div className="row">
                                        {collections.sort(function(a,b){
                                        return new Date(b.createdAt) - new Date(a.createdAt);
                                        }).map((collection) => (
                                            <CompleteItem key={collection.id} collection={collection} handleDelete={handleDelete} handleUpdate={handleEditModal} handleComplete={handleComplete} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
        

    </Fragment>
}

Landing.propTypes={
    collection: propTypes.object.isRequired
};

const mapStateToProps=state=>({
    collection:state.collection
});

export default connect(mapStateToProps, {getCollections, addCollection, deleteCollection, completeCollection, updateCollection})(Landing);